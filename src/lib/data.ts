import { unstable_cache } from "next/cache";
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

// Public Profile page
const PublicProfileInfo = (username: string) => {
  const userInfo = prisma.user.findFirst({
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
  return userInfo;
};

export const CachedPublicProfileInfo = (username: string) =>
  unstable_cache(
    async () => {
      return PublicProfileInfo(username);
    },
    ["public-profile", username],
    {
      revalidate: 60,
      tags: [`user-${username}`],
    },
  )();

const PublicProfileWallpapers = async (
  username: string,
  pageNumber: number,
) => {
  const wallpapers = prisma.wallpaper.findMany({
    where: { user: { username: username } },

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

  return wallpapers;
};

export const CachedPublicProfileWallpapers = (
  username: string,
  pageNumber: number,
) =>
  unstable_cache(
    async () => {
      return PublicProfileWallpapers(username, pageNumber);
    },

    ["user-wallpapers", username, String(pageNumber)],

    {
      revalidate: 60,
      tags: [`user-wallpapers-${username}`],
    },
  )();

export const CachedPublicProfileWallpapersCount = (username: string) =>
  unstable_cache(
    async () => {
      return prisma.wallpaper.count({
        where: {
          user: {
            username,
          },
        },
      });
    },

    ["user-wallpaper-count", username],

    {
      revalidate: 60,
      tags: [`user-wallpapers-${username}`],
    },
  )();

export const PublicProfilWallpapersFavorites = async (
  userId: string,
  wallpaperIds: string[],
) => {
  return prisma.favorite.findMany({
    where: {
      userId,
      wallpaperId: {
        in: wallpaperIds,
      },
    },

    select: {
      wallpaperId: true,
    },
  });
};
