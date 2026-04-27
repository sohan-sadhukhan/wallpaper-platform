import AdminWallpaperRow from "@/components/AdminWallpaperRow";
import prisma from "@/lib/database/dbClient";
import { clientEnv } from "@/lib/env/clientEnv";
import authUserServer from "@/server/authUserServer";
import { ArrowBigLeft, LucideFileSliders } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type AllWallpaperPageProps = {
  params: Promise<{ username: string }>;
};

const page = async ({ params }: AllWallpaperPageProps) => {
  const { username } = await params;

  const session = await authUserServer();

  if (session.user.role !== "ADMIN") {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      wallpapers: true,
    },
  });

  if (!user) notFound();
  return (
    <section className="min-h-screen px-4 py-8 sm:px-6">
      {/* Breadcrumb nav */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 sm:mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70">
          <span aria-hidden="true">
            <ArrowBigLeft className="h-5 w-5" />
          </span>
          <span>Back to Users</span>
        </Link>
      </nav>

      {/* Header: user identity */}
      <header className="mb-8 border-b border-white/[0.07] pb-6 sm:mb-10 sm:pb-8">
        <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-[#7c6fff] uppercase sm:text-xs">
          Posts by
        </p>

        {/* User info row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 sm:h-12 sm:w-12">
            <Image
              src={
                user.image ?
                  `/${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${user.image}`
                : "/avatar.png"
              }
              alt={`${user.name ?? "User"}'s avatar`}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
              {user.name}
            </h1>
            <p className="truncate text-xs text-white/40 sm:text-sm">
              {user.email}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-white/30 sm:text-sm">
          {user.wallpapers.length} post{user.wallpapers.length !== 1 ? "s" : ""}
        </p>
      </header>

      {/* Posts list */}
      {user.wallpapers.length === 0 ?
        <section className="flex flex-col items-center justify-center py-28 text-center sm:py-36">
          <div
            className="mb-3 text-5xl opacity-20"
            aria-hidden="true">
            <LucideFileSliders className="h-10 w-10" />
          </div>
          <p className="text-base font-medium text-white/40">No posts yet</p>
        </section>
      : <section aria-label="User post list">
          <ul
            className={`grid gap-3 sm:gap-4 ${user.wallpapers.length > 1 ? "lg:grid-cols-2" : ""}`}>
            {user.wallpapers.map((wallpaper) => (
              <li key={wallpaper.id}>
                <AdminWallpaperRow wallpaper={wallpaper} />
              </li>
            ))}
          </ul>
        </section>
      }
    </section>
  );
};

export default page;
