"use server";

import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import authUserServer from "./authUserServer";

const createFavourite = async (wallpaperId: string) => {
  const session = await authUserServer();

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_wallpaperId: {
        userId: session?.user.id,
        wallpaperId,
      },
    },
  });

  if (existingFavorite) {
    await prisma.favorite.delete({
      where: {
        userId_wallpaperId: {
          userId: session?.user.id,
          wallpaperId,
        },
      },
    });

    revalidatePath("/favourite");

    return {
      isFavorited: false,
    };
  }

  await prisma.favorite.create({
    data: {
      userId: session?.user.id,
      wallpaperId,
    },
  });

  revalidatePath("/favourite");

  return {
    isFavorited: true,
  };
};

export default createFavourite;
