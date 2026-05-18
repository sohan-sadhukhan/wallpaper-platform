const DESKTOPORIENTATIONS: ("landscape" | "portrait")[] = [
  "portrait",
  "portrait",
  "portrait",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
];
const MOBILEORIENTATIONS: ("landscape" | "portrait")[] = [
  "portrait",
  "portrait",
];

const Bone = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-lg bg-gray-200 dark:bg-neutral-700 ${className}`}
  />
);

// Desktop card skeleton
function DesktopCardSkeleton({
  orientation,
}: {
  orientation: "landscape" | "portrait";
}) {
  return (
    <article className="break-inside-avoid">
      <div
        className={`w-full animate-pulse overflow-hidden rounded-2xl bg-gray-200 dark:bg-neutral-700 ${
          orientation === "landscape" ? "aspect-video" : "aspect-[9/16]"
        }`}
      />
    </article>
  );
}

// Desktop grid skeleton
function DesktopGridSkeleton() {
  return (
    <div className="columns-2 space-y-3 lg:columns-3">
      {DESKTOPORIENTATIONS.map((orientation, i) => (
        <DesktopCardSkeleton
          key={i}
          orientation={orientation}
        />
      ))}
    </div>
  );
}

// Mobile card skeleton
function MobileCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-white/10 dark:bg-neutral-900">
      {/* Header: avatar + name */}
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <Bone className="h-8 w-8 flex-shrink-0 rounded-full" />
        <Bone className="h-3 w-28" />
      </div>

      {/* Image — aspect-[4/3] matches MobileGrid's className */}
      <div className="aspect-[4/3] w-full animate-pulse bg-gray-200 dark:bg-neutral-700" />

      {/* Footer: favourite + download */}
      <div className="flex items-center justify-between px-3 py-2">
        <Bone className="h-8 w-8 rounded-full" />
        <Bone className="h-6 w-24 rounded-lg" />
      </div>
    </article>
  );
}

// Mobile grid skeleton
function MobileGridSkeleton() {
  return (
    <div className="flex flex-col gap-8 py-2">
      {MOBILEORIENTATIONS.map((_, i) => (
        <MobileCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function WallpaperLoadingSkeleton() {
  return (
    <>
      <section className="mx-auto w-full">
        {/* Desktop skeleton */}
        <div className="hidden md:block">
          <DesktopGridSkeleton />
        </div>

        {/* Mobile skeleton */}
        <div className="md:hidden">
          <MobileGridSkeleton />
        </div>
      </section>
    </>
  );
}
