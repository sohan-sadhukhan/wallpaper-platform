"use server";

import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { rm } from "node:fs/promises";
import authUserServer from "./authUserServer";

const deleteWallpaper = async ({
  id,
  userId,
  imageUrl,
}: {
  id: string;
  userId: string;
  imageUrl: string;
}) => {
  const session = await authUserServer();
  if (session.session.userId !== userId) {
    redirect("/signin");
  }
  try {
    await rm(`./public/${imageUrl}`);
    // await s3Client.deleteObject({
    //   Bucket: serverEnv.SPACES_BUCKET_NAME,
    //   Key: imageUrl,
    // });

    await prisma.wallpaper.delete({
      where: {
        id,
        userId,
      },
    });

    revalidatePath("/profile");

    return { isSuccess: true, message: "Wallpaper deleted successfully" };
  } catch {
    return { isSuccess: false, message: "Failed to delete wallpaper" };
  }
};

export default deleteWallpaper;
