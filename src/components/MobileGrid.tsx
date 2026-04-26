import { Download, Heart } from "lucide-react";
import Image from "next/image";
import DeleteWallpaper from "./DeleteWallpaper";
import { Button } from "./shadcnui/button";

type MobileGridProps = {
  wallpapers: {
    id: string;
    imageUrl: string;
    orientation: string;
    userId: string;
    user: {
      name: string;
      id: string;
      image: string | null;
    };
  }[];
};

export const MobileGrid = ({ wallpapers }: MobileGridProps) => {
  if (wallpapers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-sm font-medium">No wallpapers found</p>
      </div>
    );
  }

  return (
    <div className="columns-2 gap-3 space-y-3">
      {wallpapers.map((w) => (
        <article
          key={w.id}
          className="group relative break-inside-avoid overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={`/${w.imageUrl}`}
            width={400}
            height={w.orientation === "landscape" ? 225 : 711}
            alt={`Wallpaper by ${w.user.name}`}
            className="w-full object-cover"
          />

          {/* Heart button */}
          <button
            aria-label="Favourite"
            className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
            <Heart size={12} />
          </button>

          {/* Delete button */}
          <DeleteWallpaper
            id={w.id}
            userId={w.userId}
            imageUrl={w.imageUrl}
          />

          {/* User info + download */}
          <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between p-2">
            <div className="flex items-center gap-1.5">
              <Image
                src={`/${w.user.image ?? ""}`}
                alt={w.user.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full border border-white/50 object-cover"
              />
              <p className="max-w-[60px] truncate text-[10px] leading-none font-medium text-white">
                {w.user.name}
              </p>
            </div>
            <Button
              variant={"ghost"}
              aria-label="Download"
              className="h-6 w-6 rounded-full">
              <a
                href={w.imageUrl}
                download>
                <Download size={14} />
              </a>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
};
