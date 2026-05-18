import PaginationQuery from "@/components/PaginationQuery";
import WallpaperHome from "@/components/WallpaperHome";
import prisma from "@/lib/database/dbClient";
import authUserServer from "@/server/authUserServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favourite | Wallpaper App",
  description: "View and manage your favourite wallpapers.",
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const PAGE_SIZE = 10;

const page = async ({ searchParams }: PageProps) => {
  const session = await authUserServer();

  const { page } = await searchParams;
  const pageNumber = Math.max(1, Math.floor(Number(page) || 1));

  const [wallpapers, pageCount] = await Promise.all([
    prisma.wallpaper.findMany({
      where: {
        favorites: {
          some: {
            userId: session?.user.id,
          },
        },
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },

        favorites: {
          where: {
            userId: session?.user.id,
          },
          select: {
            id: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: PAGE_SIZE,
      skip: (pageNumber - 1) * PAGE_SIZE,
    }),

    prisma.wallpaper.count({
      where: {
        favorites: {
          some: {
            userId: session?.user.id,
          },
        },
      },
    }),
  ]);

  const totalPage = Math.ceil(pageCount / PAGE_SIZE);

  return (
    <>
      <section className="mx-auto w-full px-4 py-20 sm:px-6">
        <WallpaperHome wallpapers={wallpapers} />
      </section>

      {totalPage > 1 && (
        <PaginationQuery
          pageNumber={pageNumber}
          totalPage={totalPage}
        />
      )}
    </>
  );
};

export default page;
