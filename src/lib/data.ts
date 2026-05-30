import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "./database/dbClient";

const PAGE_SIZE = 6;
// Home page
const getWallpapers = async (pageNumber: number) => {
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
  getWallpapers,
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

export const publicProfileInfo = cache(async (username: string) => {
  const res = await prisma.user.findFirst({
    where: { username: username },
    select: {
      id: true,
      name: true,
      image: true,
      username: true,
      bio: true,
      coverImage: true,
      email: true,
    },
  });
  return res;
});
