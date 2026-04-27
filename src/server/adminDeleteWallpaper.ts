"use server";

import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import authUserServer from "./authUserServer";

const adminDeleteWallpaper = async (wallpaperId: string) => {
  const session = await authUserServer();

  if (session.user.role !== "ADMIN") {
    redirect("/signin");
  }
  try {
    await prisma.wallpaper.delete({
      where: { id: wallpaperId },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete post",
    };
  }
};

export default adminDeleteWallpaper;
