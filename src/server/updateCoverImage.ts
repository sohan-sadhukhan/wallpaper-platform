"use server";

import prisma from "@/lib/database/dbClient";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";
import sharp from "sharp";
import authUserServer from "./authUserServer";

// Updates the authenticated user's cover image
const updateCoverImage = async (imgFile: File) => {
  try {
    const session = await authUserServer();

    if (!imgFile || !imgFile.type.startsWith("image/")) {
      return {
        isSuccess: false,
        message: "Please select a valid image file.",
      };
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { coverImage: true },
    });

    const imgArrayBuffer = await imgFile.arrayBuffer();
    const imageName = `${nanoid()}.jpeg`;

    await sharp(imgArrayBuffer)
      .resize({
        width: 1200,
        height: 320,
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

    await prisma.user.update({
      where: { id: session.user.id },
      data: { coverImage: imageName },
    });

    if (currentUser?.coverImage) {
      await rm(`./public/${currentUser?.coverImage}`);
    }

    revalidatePath("/profile");

    return {
      isSuccess: true,
      message: "Cover image uploaded successfully.",
    };
  } catch {
    return {
      isSuccess: false,
      message: "Cover image upload failed. Please try again.",
    };
  }
};

export default updateCoverImage;
