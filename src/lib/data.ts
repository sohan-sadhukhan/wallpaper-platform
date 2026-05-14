import { unstable_cache } from "next/cache";
import prisma from "./database/dbClient";

const PAGE_SIZE = 6;

const _getWallpapers = async (pageNumber: number) => {
  return prisma.wallpaper.findMany({
    select: {
      id: true,
      imageUrl: true,
      createdAt: true,
      orientation: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: PAGE_SIZE,
    skip: (pageNumber - 1) * PAGE_SIZE,
  });
};

export const getCachedWallpapers = unstable_cache(
  _getWallpapers,
  ["wallpapers"],
  {
    revalidate: 60,
    tags: ["wallpapers"],
  },
);

export const getCachedCount = unstable_cache(
  () => prisma.wallpaper.count(),
  ["wallpapers-count"],
  { revalidate: 60, tags: ["wallpapers"] },
);

export const getUserFavorites = (userId: string, wallpaperIds: string[]) =>
  prisma.favorite.findMany({
    where: { userId, wallpaperId: { in: wallpaperIds } },
    select: { wallpaperId: true },
  });
