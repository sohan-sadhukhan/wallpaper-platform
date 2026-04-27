import CreateWallpaper from "@/components/Forms/CreateWallpaper";
import authUserServer from "@/server/authUserServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Wallpaper | Wallpaper App",
  description: "Upload and share stunning wallpapers with the community.",
};

const page = async () => {
  await authUserServer();
  return (
    <section className="mx-auto w-full px-4 py-20 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-primary mb-2 text-4xl font-bold tracking-tight">
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
