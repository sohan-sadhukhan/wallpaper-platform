"use server";

import prisma from "@/lib/database/dbClient";
import { serverEnv } from "@/lib/env/serverEnv";
import s3Client from "@/lib/s3Client";
import { nanoid } from "nanoid";
import sharp from "sharp";
import authUserServer from "./authUserServer";

const PORTRAIT_CONFIG = { width: 720, height: 1280 } as const;
const LANDSCAPE_CONFIG = { width: 1280, height: 720 } as const;

type createWallpaperActionProp = {
  file: File;
  orientation: "portrait" | "landscape";
};

//  Server Action
const createWallpaperAction = async ({
  file,
  orientation,
}: createWallpaperActionProp) => {
  try {
    /* 1. Auth check */
    const session = await authUserServer();
    if (!session?.user?.id) {
      return { isSuccess: false, message: "You must be logged in to upload." };
    }
    const userId = session.user.id;

    const imgArrayBuffer = await file.arrayBuffer();
    const imageName = `${nanoid()}.jpeg`;

    // 4. Determine output dimensions
    const { width, height } =
      orientation === "portrait" ? PORTRAIT_CONFIG : LANDSCAPE_CONFIG;

    const optimizedImageFile = await sharp(imgArrayBuffer)
      .resize(width, height, { fit: "cover", position: "center" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
    // .toFile(`./public/${imageName}`);

    await s3Client.putObject({
      Bucket: serverEnv.SPACES_BUCKET_NAME,
      Key: imageName,
      Body: optimizedImageFile,
      ContentType: "image/jpeg",
      ACL: "public-read",
    });

    await prisma.wallpaper.create({
      data: {
        imageUrl: `${imageName}`,
        orientation: orientation,
        userId,
      },
    });

    return { isSuccess: true, message: "Wallpaper uploaded successfully!" };
  } catch (error) {
    console.error("[createWallpaperAction]", error);
    return {
      isSuccess: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export default createWallpaperAction;
