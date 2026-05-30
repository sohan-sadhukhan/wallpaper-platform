import PaginationQuery from "@/components/PaginationQuery";
import ProfileSection from "@/components/Profile/ProfileSection";
import WallpaperHome from "@/components/Wallpaper/WallpaperHome";
import { auth } from "@/lib/auth";
import { publicProfileInfo } from "@/lib/data";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userInfo = await publicProfileInfo(username);
  if (!userInfo) {
    return {
      title: "User Not Found | Wallpaper App",
      description: "The requested user profile could not be found.",
    };
  }

  return {
    title: `${userInfo.name} (@${userInfo.username}) | Wallpaper App`,
    description:
      userInfo.bio ||
      `Browse wallpapers uploaded by ${userInfo.name} on Wallpaper App.`,

    openGraph: {
      title: `${userInfo.name} (@${userInfo.username})  | Wallpaper App`,
      description:
        userInfo.bio ||
        `Browse wallpapers uploaded by ${userInfo.name} on Wallpaper App.`,
      url: `https://wallpapers.sohansadhukhan.dev/${username}`,
      siteName: "Wallpaper App",
      type: "profile",
      images:
        userInfo.image ?
          [
            {
              url: `/${userInfo.image}`,
              width: 1200,
              height: 630,
              alt: `${userInfo.name} avatar image`,
            },
          ]
        : [
            {
              url: "https://wallpapers.sohansadhukhan.dev/opengraph-image.png",
              width: 1200,
              height: 630,
              alt: `${userInfo.name} avatar image`,
            },
          ],
    },
  };
}

type PageProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ page?: string }>;
};

// Number of wallpapers per page
const PAGE_SIZE = 10;

const page = async ({ params, searchParams }: PageProps) => {
  // Extract username from route parameters
  const { username } = await params;

  // Get current page from query
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Math.floor(Number(page) || 1));

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [userInfo, allWallpapers, pageCount] = await Promise.all([
    publicProfileInfo(username),

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

    prisma.wallpaper.count({
      where: { user: { username: username } },
    }),
  ]);

  const totalPage = Math.ceil(pageCount / PAGE_SIZE);

  if (!userInfo) {
    redirect("/signin");
  }

  return (
    <>
      <section className="mx-auto w-full px-4 py-20 sm:px-6">
        {/* User Profile Section */}
        <ProfileSection
          name={userInfo.name}
          username={userInfo.username}
          email={userInfo.email}
          bio={userInfo.bio ?? null}
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
