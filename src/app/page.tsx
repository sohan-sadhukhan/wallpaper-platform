import WallpaperHome from "@/components/WallpaperHome";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Wallpaper App",
  description: "Browse, upload, and discover stunning wallpapers.",
};

const page = async () => {
  const wallpapers = await prisma.wallpaper.findMany({
    include: {
      user: {
        select: {
          name: true,
          id: true,
          image: true,
        },
      },
    },
  });
  return (
    <section className="mx-auto w-full px-4 py-20 sm:px-6">
      <WallpaperHome wallpapers={wallpapers} />
    </section>
  );
};

export default page;
