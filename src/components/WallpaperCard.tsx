import { clientEnv } from "@/lib/env/clientEnv";
import { Download } from "lucide-react";
import Image from "next/image";
import DeleteWallpaper from "./DeleteWallpaper";
import FavouriteButton from "./FavouriteButton";
import { Button } from "./shadcnui/button";

type WallpaperCardProps = {
  wallpapers: {
    id: string;
    imageUrl: string;
    orientation: string;
    userId: string;
    user: {
      name: string;
      image: string | null;
    };
  };
};

export const WallpaperCard = ({
  wallpapers,
  isFavorited,
}: WallpaperCardProps & { isFavorited: boolean }) => {
  return (
    <article className="group relative cursor-pointer overflow-hidden rounded-2xl">
      <Image
        alt="Wallpaper"
        width={600}
        height={wallpapers.orientation === "landscape" ? 338 : 1067}
        src={`${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${wallpapers.imageUrl}`}
        className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="opacity-0 group-hover:opacity-100">
        <FavouriteButton
          id={wallpapers.id}
          isFavorited={isFavorited}
        />
        {/* Delete button */}
        <DeleteWallpaper
          id={wallpapers.id}
          userId={wallpapers.userId}
          imageUrl={wallpapers.imageUrl}
        />
      </div>
      {/* Bottom: User info + Download */}
      <div className="absolute right-0 bottom-0 left-0 flex translate-y-1 items-end justify-between p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center gap-2">
          <Image
            src={`${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${wallpapers.user.image}`}
            alt={wallpapers.user.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border-2 border-white/50 object-cover"
          />
          <div className="leading-tight">
            <p className="text-xs leading-none font-semibold text-white">
              {wallpapers.user.name}
            </p>
          </div>
        </div>

        <Button
          aria-label="Download wallpaper"
          onClick={(e) => e.stopPropagation()}
          className={"h-8 w-8 rounded-full"}>
          <a
            href={wallpapers.imageUrl}
            download>
            <Download size={14} />
          </a>
        </Button>
      </div>
    </article>
  );
};
