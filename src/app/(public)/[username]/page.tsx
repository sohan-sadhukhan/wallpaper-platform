import PaginationQuery from "@/components/PaginationQuery";
import ProfileSection from "@/components/ProfileSection";
import WallpaperHome from "@/components/WallpaperHome";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "User Wallpapers | Wallpaper App",
  description:
    "Explore wallpapers uploaded by a user. Browse high quality HD and 4K wallpapers.",
};

type PageProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string }>;
};

// Number of wallpapers per page
const PAGE_SIZE = 10;

const page = async ({ params, searchParams }: PageProps) => {
  // Extract username from route parameters
  const { username } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Get current page from query
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Math.floor(Number(page) || 1));

  const [allWallpapers, userInfo, pageCount] = await Promise.all([
    prisma.wallpaper.findMany({
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
        // Check if current logged-in user has favorited this wallpaper
        favorites: {
          where:
            session?.user?.id ?
              {
                userId: session.user.id,
              }
            : {
                userId: "__no_user__",
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
    prisma.user.findFirst({
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
    }),
    prisma.wallpaper.count({
      where: { user: { username: username } },
    }),
  ]);

  const totalPage = Math.ceil(pageCount / PAGE_SIZE);

  // If user does not exist → show 404 page
  if (!userInfo) {
    notFound();
  }

  return (
    <>
      <section className="mx-auto w-full px-4 py-20 sm:px-6">
        {/* User Profile Section */}
        <ProfileSection
          name={userInfo.name}
          username={userInfo.username}
          email={userInfo.email}
          bio={userInfo.bio ?? ""}
          avatar={userInfo.image ?? null}
          cover={userInfo.coverImage ?? null}
          // interests={interestNames}
        />

        {/* Wallpapers Grid */}
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
