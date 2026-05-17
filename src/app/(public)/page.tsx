import HomePageWallpapers from "@/components/HomePageWallpapers";
import PaginationQuery from "@/components/PaginationQuery";
import { getCachedCount } from "@/lib/data";
import { Metadata } from "next";

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
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Math.floor(Number(page) || 1));

  const pageCount = await getCachedCount();
  const totalPage = Math.ceil(pageCount / PAGE_SIZE);

  return (
    <>
      <section className="mx-auto w-full px-4 py-20 sm:px-6">
        <HomePageWallpapers pageNumber={pageNumber} />
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
