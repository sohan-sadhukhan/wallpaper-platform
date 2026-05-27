"use client";

import { clientEnv } from "@/lib/env/clientEnv";
import banUser from "@/server/banUser";
import deleteUser from "@/server/deleteUser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { Prisma } from "../../../generated/prisma/browser";
import { Button } from "../shadcnui/button";

type UserCardProps = {
  user: Prisma.UserGetPayload<{
    include: {
      wallpapers: true;
    };
  }>;
};

export function UserCard({
  user: { wallpapers, banned, image, name, email, username, id },
}: UserCardProps) {
  const [isBanned, setIsBanned] = useState(banned ?? false);
  const [loading, setLoading] = useState<"ban" | "delete" | null>(null);

  // Handle  Ban / Unban
  const handleBan = async () => {
    setLoading("ban");

    const { message, success } = await banUser(id);

    // Display error toast if update failed
    if (!success) {
      toast.error(message);
    }

    // Display success toast if update succeeded
    if (success) {
      setIsBanned((b) => !b);
      toast.success(message);
    }

    setLoading(null);
  };

  // Handle Delete
  const handleDelete = async () => {
    setLoading("delete");

    const { message, success } = await deleteUser(id);

    // Display error toast if update failed
    if (!success) {
      toast.error(message);
    }

    // Display success toast if update succeeded
    if (success) {
      toast.success(message);
    }
    setLoading(null);
  };

  return (
    <article
      className={`xs:flex-row xs:items-center relative flex flex-col gap-3 rounded-2xl border px-4 py-4 transition-all duration-300 sm:px-5 ${
        isBanned ?
          "border-red-500/25 bg-red-950/15"
        : "border-white/[0.07] bg-white/3 hover:border-[#7c6fff]/35 hover:bg-white/5"
      }`}>
      {/* Banned badge absolute positioned top-right */}
      {isBanned && (
        <span
          aria-label="User is banned"
          className="absolute top-3 right-3 rounded-full bg-red-500/20 px-2 py-0.5 font-mono text-[9px] font-semibold tracking-widest text-red-400 uppercase sm:text-[10px]">
          Banned
        </span>
      )}

      {/* Top row: avatar + info */}
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 sm:h-12 sm:w-12">
          <Image
            src={
              image ?
                `/${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${image}`
              : "/avatar.png"
            }
            alt={`${name ?? "User"}'s avatar`}
            fill
            className="object-cover"
          />
        </div>

        {/* Name / email / post count */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm leading-snug font-semibold text-white">
            {name}
          </p>
          <p className="truncate text-xs text-white/40">{email}</p>
          <p className="mt-0.5 text-[10px] text-white/25 sm:text-xs">
            {wallpapers.length} post{wallpapers.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid w-full grid-cols-3 gap-2">
        {/* Ban / Unban */}
        <Button
          onClick={handleBan}
          disabled={loading !== null}
          aria-label={isBanned ? "Unban this user" : "Ban this user"}
          className={`cursor-pointer text-xs font-medium ${
            isBanned ?
              "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
            : "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25"
          }`}>
          {loading === "ban" ?
            "Banning…"
          : isBanned ?
            "Unban"
          : "Ban"}
        </Button>

        {/* Delete */}
        <Button
          onClick={handleDelete}
          disabled={loading !== null}
          aria-label="Delete this user permanently"
          className="cursor-pointer bg-red-500/15 text-xs font-medium text-red-400 transition-all hover:bg-red-500/25">
          {loading === "delete" ? "Deleting…" : "Delete"}
        </Button>

        {/* View Wallpapers */}
        <Link
          href={`/admin/users/${username}`}
          aria-label={`View posts by ${name}`}
          className="w-full bg-[#7c6fff]/15 py-2 text-center text-xs font-medium text-[#7c6fff] transition-all hover:bg-[#7c6fff]/25">
          Posts
        </Link>
      </div>
    </article>
  );
}
