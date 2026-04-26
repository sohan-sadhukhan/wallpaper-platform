import PaginationQuery from "@/components/PaginationQuery";
import WallpaperHome from "@/components/WallpaperHome";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Wallpaper App",
  description: "Browse, upload, and discover stunning wallpapers.",
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const PAGE_SIZE = 6;

const page = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Math.floor(Number(page) || 1));

  const [allWallpapers, pageCount] = await Promise.all([
    prisma.wallpaper.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        favorites: {
          select: {
            id: true,
          },
        },
      },

      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (pageNumber - 1) * PAGE_SIZE,
    }),
    prisma.wallpaper.count(),
  ]);

  const totalPage = Math.ceil(pageCount / PAGE_SIZE);
  return (
    <>
      <section className="mx-auto w-full px-4 py-20 sm:px-6">
        <WallpaperHome wallpapers={allWallpapers} />
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
