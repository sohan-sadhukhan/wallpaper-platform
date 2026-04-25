"use server";

import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";

const createFavourite = async (wallpaperId: string, userId: string) => {
  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_wallpaperId: {
        userId,
        wallpaperId,
      },
    },
  });

  if (existingFavorite) {
    await prisma.favorite.delete({
      where: {
        userId_wallpaperId: {
          userId,
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
      userId,
      wallpaperId,
    },
  });

  revalidatePath("/favourite");

  return {
    isFavorited: true,
  };
};

export default createFavourite;
