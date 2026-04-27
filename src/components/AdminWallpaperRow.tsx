import { clientEnv } from "@/lib/env/clientEnv";
import Image from "next/image";
import { Prisma } from "../../generated/prisma/browser";
import PostDeleteButton from "./AdminWallpaperDeleteButton";
import { Card } from "./shadcnui/card";

type AdminWallpaperRowProp = {
  wallpaper: Prisma.WallpaperGetPayload<{}>;
};

const AdminWallpaperRow = ({ wallpaper }: AdminWallpaperRowProp) => {
  return (
    <Card className="flex flex-col gap-3 bg-white/3 p-4 transition-colors hover:bg-white/5.5 sm:flex-row sm:items-center sm:gap-4">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white/5 sm:aspect-auto sm:h-16 sm:w-24 lg:h-[4.5rem] lg:w-28">
        <Image
          src={`${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${wallpaper.imageUrl}`}
          alt={"wallpaper"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 96px, 112px"
          className="object-cover"
        />
      </div>

      {/* Delete */}
      <div className="w-full sm:w-auto sm:shrink-0">
        <PostDeleteButton wallpaperId={wallpaper.id} />
      </div>
    </Card>
  );
};

export default AdminWallpaperRow;
