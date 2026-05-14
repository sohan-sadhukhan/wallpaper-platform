import WallpaperLoadingSkeleton from "./WallpaperLoadingSkeleton";

const Bone = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-lg bg-gray-200 dark:bg-neutral-700 ${className}`}
  />
);

// Profile skeleton
export function ProfileSection() {
  return (
    <section
      aria-label="Profile content loading"
      className="grid gap-6 pb-10">
      <article>
        {/* Card shell — same overflow-hidden, no padding on Card itself */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white dark:border-white/10 dark:bg-neutral-900">
          {/* Cover image — h-36 sm:h-44 */}
          <div className="h-36 w-full animate-pulse bg-gray-200 sm:h-44 dark:bg-neutral-700" />

          {/* CardContent — p-4 sm:p-6 */}
          <div className="relative space-y-5 p-4 sm:p-6">
            {/* Avatar row — -mt-16 sm:-mt-20 */}
            <div className="-mt-16 flex flex-col gap-4 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                {/* Avatar — size-24 sm:size-28, ring-4 */}
                <div className="relative size-24 flex-shrink-0 animate-pulse overflow-hidden rounded-full border bg-gray-200 shadow-md ring-4 ring-white sm:size-28 dark:bg-neutral-700 dark:ring-neutral-900" />

                {/* Name + username */}
                <div className="flex translate-y-4 flex-col gap-2">
                  <Bone className="h-6 w-36 sm:h-7 sm:w-44" />
                  <Bone className="h-3.5 w-24" />
                </div>
              </div>

              {/* Edit button placeholder */}
              <Bone className="hidden h-9 w-28 translate-y-4 self-end rounded-md sm:block" />
            </div>

            {/* Bio + Contact */}
            <div className="space-y-4 pt-4">
              {/* Bio */}
              <div className="space-y-2">
                <Bone className="h-3.5 w-8" />
                <Bone className="h-3 w-3/4" />
                <Bone className="h-3 w-3/4" />
                <Bone className="h-3 w-1/2" />
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Bone className="h-3.5 w-14" />
                <Bone className="h-3 w-48" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

const ProfileSectionSkeleton = () => {
  return (
    <>
      <section className="mx-auto w-full px-4 pt-20 pb-10 sm:px-6">
        {/* Profile card */}
        <ProfileSection />

        <WallpaperLoadingSkeleton />
      </section>
    </>
  );
};

export default ProfileSectionSkeleton;
