import PaginationQuery from "@/components/PaginationQuery";
import WallpaperHome from "@/components/WallpaperHome";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Favourite | Wallpaper App",
  description: "View and manage your favourite wallpapers.",
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

      <PaginationQuery
        pageNumber={pageNumber}
        totalPage={totalPage}
      />
    </>
  );
};

export default page;
