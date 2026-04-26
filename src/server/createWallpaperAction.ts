"use server";

import prisma from "@/lib/database/dbClient";
import { nanoid } from "nanoid";
import sharp from "sharp";
import authUserServer from "./authUserServer";

const PORTRAIT_CONFIG = { width: 720, height: 1280 } as const;
const LANDSCAPE_CONFIG = { width: 1280, height: 720 } as const;

type createWallpaperActionProp = {
  file: File;
  orientation: string;
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

    await sharp(imgArrayBuffer)
      .resize(width, height, { fit: "cover", position: "center" })
      .webp({ quality: 88 })
      .toFile(`./public/${imageName}`);

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
