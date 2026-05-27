import { auth } from "@/lib/auth";
import {
  CachedPublicProfileWallpapers,
  PublicProfilWallpapersFavorites,
} from "@/lib/data";
import { headers } from "next/headers";
import WallpaperHome from "./WallpaperHome";

type PublicProfileWallpapersProp = {
  username: string;
  pageNumber: number;
};

const PublicProfileWallpapers = async ({
  pageNumber,
  username,
}: PublicProfileWallpapersProp) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const [allWallpapers] = await Promise.all([
    await CachedPublicProfileWallpapers(username, pageNumber),
  ]);

  const favoritedIds =
    session?.user?.id ?
      new Set(
        (
          await PublicProfilWallpapersFavorites(
            session.user.id,
            allWallpapers.map((w) => w.id),
          )
        ).map((f) => f.wallpaperId),
      )
    : new Set<string>();

  const wallpapersWithFavorites = allWallpapers.map((wallpaper) => ({
    ...wallpaper,
    favorites: favoritedIds.has(wallpaper.id) ? [{ id: wallpaper.id }] : [],
  }));
  return <WallpaperHome wallpapers={wallpapersWithFavorites} />;
};

export default PublicProfileWallpapers;
