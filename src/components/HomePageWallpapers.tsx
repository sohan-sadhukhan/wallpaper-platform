import { auth } from "@/lib/auth";
import { getCachedWallpapers, getUserFavorites } from "@/lib/data";
import { headers } from "next/headers";
import WallpaperHome from "./WallpaperHome";

const HomePageWallpapers = async ({ pageNumber }: { pageNumber: number }) => {
  const [session, allWallpapers] = await Promise.all([
    await auth.api.getSession({
      headers: await headers(),
    }),
    getCachedWallpapers(pageNumber),
  ]);

  const favoritedIds =
    session?.user?.id ?
      new Set(
        (
          await getUserFavorites(
            session.user.id,
            allWallpapers.map((w) => w.id),
          )
        ).map((f) => f.wallpaperId),
      )
    : new Set<string>();

  const wallpapersWithFavorites = allWallpapers.map((w) => ({
    ...w,
    favorites: favoritedIds.has(w.id) ? [{ id: w.id }] : [],
  }));
  return <WallpaperHome wallpapers={wallpapersWithFavorites} />;
};

export default HomePageWallpapers;
