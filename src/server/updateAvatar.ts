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
      user: { image },
    } = await authUserServer();

    if (!imgFile || !imgFile.type.startsWith("image/")) {
      return {
        isSuccess: false,
        message: "Please select a valid image file.",
      };
    }

    // remove old custom avatar file
    if (image && image !== "avatar.png") {
      await rm(`./public/${image}`);
    }

    const imgArrayBuffer = await imgFile.arrayBuffer();
    const imageName = `${nanoid()}.jpeg`;

    await sharp(imgArrayBuffer)
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

    await auth.api.updateUser({
      body: {
        image: imageName,
      },
      headers: await headers(),
    });

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
