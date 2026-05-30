"use client";

import { authClient } from "@/lib/auth-client";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteWallpaper from "./DeleteWallpaper";
import FavouriteButton from "./FavouriteButton";

type MobileGridProps = {
  wallpapers: {
    id: string;
    imageUrl: string;
    orientation: string;
    favorites: {
      id: string;
    }[];
    user: {
      name: string;
      id: string;
      image: string | null;
      username: string;
    };
  }[];
};

export const MobileGrid = ({ wallpapers }: MobileGridProps) => {
  const session = authClient.useSession();

  if (wallpapers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-sm font-medium">No wallpapers found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 gap-8 py-2">
      {wallpapers.map((w) => (
        <article
          key={w.id}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-white/10 dark:bg-neutral-900">
          <div className="flex items-center justify-between px-3 py-2.5">
            {/* Top: user info */}
            <Link
              href={`/${w.user.username}`}
              className="flex items-center gap-2.5">
              <Image
                src={w.user.image ? `/${w.user.image}` : `/avatar.png`}
                alt={w.user.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-[13px] leading-tight font-medium text-gray-900 dark:text-white">
                  {w.user.name}
                </p>
              </div>
            </Link>
            {/* Delete (shown for owner) */}
            <DeleteWallpaper
              id={w.id}
              userId={w.user.id}
              imageUrl={w.imageUrl}
            />
          </div>

          {/* Image */}
          <div className="relative w-full">
            <Image
              src={`/${w.imageUrl}`}
              width={800}
              height={w.orientation === "landscape" ? 450 : 1067}
              alt={`Wallpaper by ${w.user.name}`}
              className="aspect-[4/3] w-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between px-3 py-2">
            {/* Favourite */}
            <FavouriteButton
              id={w.id}
              isFavorited={w.favorites.length > 0}
            />

            {/* Download */}
            <a
              href={`${session.data?.session ? `/api/download?image=${encodeURIComponent(w.imageUrl)}` : "/signin"}`}
              download={session.data?.session ? true : false}
              className="flex h-6 items-center gap-1.5 rounded-lg bg-gray-900 px-3 text-[12px] font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-gray-900">
              <Download size={12} />
              Download
            </a>
          </div>
        </article>
      ))}
    </div>
  );
};
