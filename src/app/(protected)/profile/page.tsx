import PaginationQuery from "@/components/PaginationQuery";
import ProfileSection from "@/components/ProfileSection";
import WallpaperHome from "@/components/WallpaperHome";
import prisma from "@/lib/database/dbClient";
import authUserServer from "@/server/authUserServer";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | Wallpaper App",
  description: "View and manage your public profile in Wallpaper App.",
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

  const [userInfo, wallpapers, pageCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        bio: true,
        interests: {
          select: { name: true },
        },
        name: true,
        username: true,
        email: true,
        image: true,
        coverImage: true,
      },
    }),

    prisma.wallpaper.findMany({
      where: {
        userId: session.user.id,
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

      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (pageNumber - 1) * PAGE_SIZE,
    }),

    prisma.wallpaper.count({
      where: {
        userId: session.user.id,
      },
    }),
  ]);

  const totalPage = Math.ceil(pageCount / PAGE_SIZE);

  if (!userInfo) {
    redirect("/signin");
  }

  // const interestNames =
  //   userInfo?.interests.map((interest) => interest.name) ?? [];

  return (
    <>
      <section className="mx-auto w-full px-4 py-20 sm:px-6">
        <ProfileSection
          name={userInfo.name}
          username={userInfo.username}
          email={userInfo.email}
          bio={userInfo.bio ?? null}
          avatar={userInfo.image ?? null}
          cover={userInfo.coverImage ?? null}
          // interests={interestNames}
        />

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
