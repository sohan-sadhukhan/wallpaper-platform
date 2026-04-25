import { Search } from "lucide-react";
import { WallpaperCard } from "./WallpaperCard";

type WallpaperGridProps = {
  wallpapers: {
    id: string;
    imageUrl: string;
    orientation: string;
    userId: string;
    favorites: {
      id: string;
    }[];
    user: {
      name: string;
      id: string;
      image: string | null;
    };
  }[];
};

export const WallpaperGrid = ({ wallpapers }: WallpaperGridProps) => {
  if (wallpapers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <Search size={24} />
        </div>
        <p className="text-sm font-medium">No wallpapers found</p>
      </div>
    );
  }

  return (
    <div className="columns-2 gap-3 space-y-3 lg:columns-3">
      {wallpapers.map((w) => (
        <div
          key={w.id}
          className="break-inside-avoid">
          <WallpaperCard
            wallpapers={w}
            isFavorited={w.favorites.length > 0}
          />
        </div>
      ))}
    </div>
  );
};
