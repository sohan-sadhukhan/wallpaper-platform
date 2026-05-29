"use client";

import { authClient } from "@/lib/auth-client";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../shadcnui/button";
import DeleteWallpaper from "./DeleteWallpaper";
import FavouriteButton from "./FavouriteButton";
import WallpaperCardDialog from "./WallpaperCardDialog";

type WallpaperCardProps = {
  wallpapers: {
    id: string;
    imageUrl: string;
    orientation: string;
    createdAt: Date;
    user: {
      id: string;
      name: string;
      image: string | null;
      username: string;
    };
  };
  priority?: boolean;
};

export const WallpaperCard = ({
  wallpapers,
  isFavorited,
  priority,
}: WallpaperCardProps & { isFavorited: boolean; priority?: boolean }) => {
  const session = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <article className="group relative">
      <button
        className="cursor-pointer overflow-hidden rounded-2xl"
        onClick={openDialog}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openDialog()}>
        <Image
          alt="Wallpaper"
          width={600}
          priority={priority}
          height={wallpapers.orientation === "landscape" ? 338 : 1067}
          src={`/${wallpapers.imageUrl}`}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>

      <div className="opacity-0 group-hover:opacity-100">
        <div className="absolute top-2 right-2">
          <FavouriteButton
            id={wallpapers.id}
            isFavorited={isFavorited}
          />
        </div>

        {/* Delete button */}
        <div className="absolute top-2 left-2">
          <DeleteWallpaper
            id={wallpapers.id}
            userId={wallpapers.user.id}
            imageUrl={wallpapers.imageUrl}
          />
        </div>
      </div>
      {/* Bottom: User info + Download */}
      <div className="absolute right-0 bottom-0 left-0 flex translate-y-1 items-end justify-between p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Link
          href={`/${session.data?.user.username === wallpapers.user.username ? "profile" : `${wallpapers.user.username}`}`}
          className="flex items-center gap-2">
          <Image
            src={`${wallpapers.user.image !== null ? `/${wallpapers.user.image}` : `/avatar.png`}`}
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
        </Link>

        <Button
          aria-label="Download wallpaper"
          onClick={(e) => e.stopPropagation()}
          className={"h-8 w-8 rounded-full"}>
          <a
            href={`${session.data?.session ? `/api/download?image=${encodeURIComponent(wallpapers.imageUrl)}` : "/signin"}`}
            download={session.data?.session ? true : false}>
            <Download size={14} />
          </a>
        </Button>
      </div>

      <WallpaperCardDialog
        wallpapers={wallpapers}
        isFavorited={isFavorited}
        open={isOpen}
        onClose={closeDialog}
      />
    </article>
  );
};
