import PaginationQuery from "@/components/PaginationQuery";
import PublicProfile from "@/components/PublicProfile";
import PublicProfileWallpapers from "@/components/PublicProfileWallpapers";
import { ProfileSection } from "@/components/Skeletons/ProfileSectionSkeleton";
import WallpaperLoadingSkeleton from "@/components/Skeletons/WallpaperLoadingSkeleton";
import {
  CachedPublicProfileInfo,
  CachedPublicProfileWallpapersCount,
} from "@/lib/data";
import { clientEnv } from "@/lib/env/clientEnv";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userInfo = await CachedPublicProfileInfo(username);
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
    images:
      userInfo.image ?
        [
          {
            url: `${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${userInfo.image}`,
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
  const pageCount = await CachedPublicProfileWallpapersCount(username);
  const totalPage = Math.ceil(pageCount / PAGE_SIZE);

  return (
    <>
      <section className="mx-auto w-full px-4 py-20 sm:px-6">
        {/* User Profile Section */}
        <Suspense fallback={<ProfileSection />}>
          <PublicProfile username={username} />
        </Suspense>

        {/* Wallpapers Grid */}
        <Suspense fallback={<WallpaperLoadingSkeleton />}>
          <PublicProfileWallpapers
            username={username}
            pageNumber={pageNumber}
          />
        </Suspense>
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
