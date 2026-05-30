"use server";

import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";
import sharp from "sharp";
import authUserServer from "./authUserServer";

// Updates the authenticated user's avatar image
const updateAvatar = async (imgFile: File) => {
  try {
    const {
      user: { image, username },
    } = await authUserServer();

    const imgArrayBuffer = await imgFile.arrayBuffer();
    const imageName = `${nanoid()}.jpeg`;

    const optimizedImageFile = await sharp(imgArrayBuffer)
      .resize({
        width: 240,
        height: 240,
        fit: "cover",
      })
      .jpeg({
        quality: 87,
        mozjpeg: true,
      })
      .toFile(`./public/${imageName}`);
    // .toBuffer();

    // await s3Client.putObject({
    //   Bucket: serverEnv.SPACES_BUCKET_NAME,
    //   Key: imageName,
    //   Body: optimizedImageFile,
    //   ContentType: "image/jpeg",
    //   ACL: "public-read",
    // });

    await auth.api.updateUser({
      body: {
        image: imageName,
      },
      headers: await headers(),
    });

    if (image) {
      await rm(`./public/${image}`);
      // await s3Client.deleteObject({
      //   Bucket: serverEnv.SPACES_BUCKET_NAME,
      //   Key: image,
      // });
    }

    revalidatePath("/profile");

    return {
      isSuccess: true,
      message: "Image uploaded successfully.",
    };
  } catch {
    return {
      isSuccess: false,
      message: "Image upload failed. Please try again.",
    };
  }
};

export default updateAvatar;
