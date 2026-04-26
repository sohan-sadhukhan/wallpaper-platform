import CreateWallpaper from "@/components/Forms/CreateWallpaper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Wallpaper | Wallpaper App",
  description: "Upload and share stunning wallpapers with the community.",
};

const page = async () => {
  return (
    <section className="mx-auto w-full px-4 py-20 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">
          Upload Wallpaper
        </h1>
        <p className="text-sm text-zinc-500">
          Add a new wallpaper to the collection
        </p>
      </header>

      <CreateWallpaper />
    </section>
  );
};

export default page;
