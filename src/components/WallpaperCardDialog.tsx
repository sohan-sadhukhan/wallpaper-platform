"use client";

import { clientEnv } from "@/lib/env/clientEnv";
import { DownloadIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeleteWallpaper from "./DeleteWallpaper";
import FavouriteButton from "./FavouriteButton";
import { Dialog, DialogContent, DialogTitle } from "./shadcnui/dialog";

type Wallpaper = {
  id: string;
  imageUrl: string;
  orientation: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
};

type WallpaperCardDialogProps = {
  wallpapers: Wallpaper;
  isFavorited: boolean;
  open: boolean;
  onClose: () => void;
};

const SAMPLE_TAGS = [
  "Wallpaper",
  "Nature",
  "Water",
  "Forest",
  "Trees",
  "Animals",
  "Desktop",
];

const WallpaperCardDialog = ({
  wallpapers: { createdAt, id, imageUrl, orientation, user },
  onClose,
  open,
  isFavorited,
}: WallpaperCardDialogProps) => {
  const [favorited, setFavorited] = useState(isFavorited);
  const isLandscape = orientation === "landscape";

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="border-border bg-background !max-w-6xl rounded-lg border p-0 shadow-lg"
        showCloseButton={false}
        aria-describedby={undefined}>
        {/* Visually hidden title for a11y */}
        <DialogTitle className="sr-only">Wallpaper by {user.name}</DialogTitle>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="Close dialog">
          <X size={16} />
        </button>

        {/* ── Header: user + actions ── */}
        <header className="border-border flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/profile`}
              className="shrink-0">
              <Image
                src={`${user.image !== null ? `${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${user.image}` : `/avatar.png`}`}
                alt={user.name}
                width={44}
                height={44}
                className="border-border h-11 w-11 rounded-full border object-cover"
              />
            </Link>
            <div className="min-w-0">
              <Link
                href={`/profile`}
                onClick={(e) => e.stopPropagation()}
                className="text-foreground block truncate text-sm font-semibold hover:underline">
                {user.name}
              </Link>
            </div>
          </div>

          {/*Delete + Favourite +  Download */}
          <div className="flex items-center gap-2 pe-10">
            <DeleteWallpaper
              id={id}
              userId={user.id}
              imageUrl={imageUrl}
            />

            <FavouriteButton
              id={id}
              isFavorited={isFavorited}
            />

            <button
              className="border-border bg-background hover:bg-muted flex h-9 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors"
              onClick={(e) => e.stopPropagation()}>
              <a
                href={`/api/download?image=${encodeURIComponent(imageUrl)}`}
                download
                className="flex items-center gap-2">
                <DownloadIcon size={15} />
                Download
              </a>
            </button>
          </div>
        </header>

        {/* ── Main content ── */}
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {/* Wallpaper image */}
          <figure className="relative -mx-6 rounded-xl">
            <Image
              alt={`Wallpaper by ${user.name}`}
              width={800}
              height={isLandscape ? 450 : 1200}
              src={`${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${imageUrl}`}
              className={`w-full object-contain transition-transform duration-500 ${isLandscape ? "max-h-[450px]" : "max-h-[60vh]"}`}
              priority
            />
          </figure>

          {/* Date */}
          <p className="text-muted-foreground text-xs">
            Published on {createdAt.toLocaleDateString()}
          </p>

          {/* Tags */}
          {/* <ul className="flex flex-wrap gap-2">
            {SAMPLE_TAGS.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/?tag=${encodeURIComponent(tag)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="border-border text-foreground hover:bg-muted inline-block rounded-md border px-3 py-1 text-xs font-medium transition-colors">
                  {tag}
                </Link>
              </li>
            ))}
          </ul> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WallpaperCardDialog;
