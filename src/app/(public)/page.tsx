import PaginationQuery from "@/components/PaginationQuery";
import WallpaperHome from "@/components/WallpaperHome";
import { auth } from "@/lib/auth";
import {
  getCachedCount,
  getCachedWallpapers,
  getUserFavorites,
} from "@/lib/data";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Home | Wallpaper App",
  description: "Browse, upload, and discover stunning wallpapers.",
  openGraph: {
    title: "Wallpaper App",
    description: "Browse stunning wallpapers",
    url: "https://wallpapers.sohansadhukhan.dev/",
    siteName: "Wallpaper App",
    images: [
      {
        url: "https://wallpapers.sohansadhukhan.dev/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Wallpaper App Preview",
      },
    ],
  },
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const PAGE_SIZE = 6;

const page = async ({ searchParams }: PageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { page } = await searchParams;
  const pageNumber = Math.max(1, Math.floor(Number(page) || 1));

  const [allWallpapers, pageCount] = await Promise.all([
    getCachedWallpapers(pageNumber),
    getCachedCount(),
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

  const totalPage = Math.ceil(pageCount / PAGE_SIZE);

  return (
    <>
      <section className="mx-auto w-full px-4 py-20 sm:px-6">
        <WallpaperHome wallpapers={wallpapersWithFavorites} />
      </section>
      {/* Pagination */}
      <PaginationQuery
        pageNumber={pageNumber}
        totalPage={totalPage}
      />
    </>
  );
};

export default page;
