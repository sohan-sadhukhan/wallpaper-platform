"use client";

import { MobileGrid } from "./MobileGrid";
import { WallpaperGrid } from "./WallpaperGrid";

type WallpaperHomeProps = {
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

export default function WallpaperHome({ wallpapers }: WallpaperHomeProps) {
  return (
    <div className={`transition-colors duration-300`}>
      {/* Desktop */}
      <div className="hidden md:block">
        <WallpaperGrid wallpapers={wallpapers} />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileGrid wallpapers={wallpapers} />
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="h-20 md:hidden" />
    </div>
  );
}
