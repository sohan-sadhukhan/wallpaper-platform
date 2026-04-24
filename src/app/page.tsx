import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Wallpaper App",
  description: "Browse, upload, and discover stunning wallpapers.",
};

const page = () => {
  return <section className="grid h-dvh place-items-center">Home</section>;
};

export default page;
