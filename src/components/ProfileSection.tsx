import EditProfileDialog from "@/components/EditProfileDialog";
import { Card, CardContent } from "@/components/shadcnui/card";
import { clientEnv } from "@/lib/env/clientEnv";
import Image from "next/image";
import { Suspense } from "react";
import { Bone } from "./Skeletons/ProfileSectionSkeleton";

type ProfileSectionProp = {
  name: string;
  username: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  cover: string | null;
  // interests: string[];
};

const ProfileSection = async ({
  name,
  username,
  email,
  bio,
  avatar,
  cover,
  // interests,
}: ProfileSectionProp) => {
  // const pinnedWallpapers = [
  //   "Forest Morning",
  //   "Mountain Valley",
  //   "River Bridge",
  //   "Emerald Lake",
  // ];

  return (
    <section
      aria-label="Profile content"
      className="grid gap-6 pb-10">
      <article>
        <Card className="overflow-hidden p-0">
          <div className="relative h-36 w-full sm:h-44">
            <Image
              src={`${cover ? `${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${cover}` : `/cover.jpg`}`}
              alt="Profile cover image"
              fill
              className="object-cover"
              priority
            />
          </div>

          <CardContent className="relative space-y-5 p-4 sm:p-6">
            <div className="-mt-16 flex flex-col gap-4 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="bg-background ring-background relative size-24 overflow-hidden rounded-full border shadow-md ring-4 sm:size-28">
                  <Image
                    src={`${avatar ? `${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${avatar}` : `/avatar.png`}`}
                    alt={`${name} avatar`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="pb-1">
                  <h2 className="text-xl leading-tight font-semibold sm:text-2xl">
                    {name}
                  </h2>
                  <p className="text-muted-foreground text-sm">@{username}</p>
                </div>
              </div>
              <Suspense
                fallback={
                  <>
                    <Bone className="hidden h-9 w-28 translate-y-4 self-end rounded-md sm:block" />
                  </>
                }>
                <EditProfileDialog
                  avatarUrl={avatar}
                  coverUrl={cover}
                  bio={bio}
                  name={name}
                  username={username}
                />
              </Suspense>
            </div>

            <section
              aria-label="Profile details"
              className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Bio</h3>
                <p className="text-muted-foreground mt-1 text-sm">{bio}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Contact</h3>
                <p className="text-muted-foreground mt-1 text-sm">{email}</p>
              </div>

              {/* <div>
                <h3 className="text-sm font-medium">Interests</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <li
                      key={interest}
                      className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs">
                      {interest}
                    </li>
                  ))}
                </ul>
              </div> */}
            </section>
          </CardContent>
        </Card>
      </article>

      {/* <aside aria-label="Pinned wallpapers">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pinned</CardTitle>
            <CardDescription>
              Your pinned wallpapers quick access.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {pinnedWallpapers.map((wallpaper, index) => (
              <article
                key={wallpaper}
                className="relative overflow-hidden rounded-lg border">
                <div
                  aria-hidden="true"
                  className="h-20 bg-linear-to-r from-zinc-700 via-zinc-600 to-zinc-700"
                />
                <p className="absolute right-2 bottom-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                  {index + 1}. {wallpaper}
                </p>
              </article>
            ))}
          </CardContent>
        </Card>
      </aside> */}
    </section>
  );
};

export default ProfileSection;
