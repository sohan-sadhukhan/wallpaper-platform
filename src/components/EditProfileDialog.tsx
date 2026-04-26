import { PencilIcon } from "lucide-react";
import BioForm from "./Forms/BioForm";
import CoverImageForm from "./Forms/CoverImageForm";
import NameForm from "./Forms/NameForm";
import ProfileImageForm from "./Forms/ProfileImageForm";
import { Button } from "./shadcnui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcnui/dialog";
import { Separator } from "./shadcnui/separator";
import UsernameField from "./UsernameField";

type EditProfileDialogProps = {
  name: string;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
};

const EditProfileDialog = ({
  avatarUrl,
  bio,
  coverUrl,
  name,
  username,
}: EditProfileDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            className={
              "flex cursor-pointer gap-2 rounded-full bg-blue-600 px-6 py-1 font-semibold text-white shadow-md hover:bg-blue-700"
            }
            aria-label="Edit profile"
          />
        }>
        Edit
        <PencilIcon
          size={14}
          aria-hidden="true"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold text-zinc-900 md:text-2xl dark:text-zinc-100">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <Separator className="bg-primary" />

        <section
          className="no-scrollbar max-h-[70vh] divide-zinc-100 overflow-y-auto dark:divide-zinc-800"
          aria-label="Edit profile form sections">
          {/* Form 1: Profile Picture */}
          <section className="space-y-1 py-5">
            <h2 className="text-sm font-semibold md:text-lg">
              Profile Picture
            </h2>
            <ProfileImageForm
              currentAvatar={avatarUrl}
              name={name}
            />
          </section>

          {/* Form 2: Cover Picture */}
          <section className="space-y-1 py-5">
            <h2 className="text-sm font-semibold md:text-lg">Cover Picture</h2>
            <CoverImageForm currentCover={coverUrl} />
          </section>

          {/* Form 3: Bio + Name + Username */}
          <section className="space-y-5 py-5">
            <h2 className="text-sm font-semibold md:text-lg">Profile Info</h2>

            <BioForm currentBio={bio} />

            <Separator className="bg-zinc-100 dark:bg-zinc-800" />

            <NameForm currentName={name} />

            <Separator className="bg-zinc-100 dark:bg-zinc-800" />

            <UsernameField username={username} />
          </section>
        </section>

        <DialogFooter className="sm:justify-center">
          <DialogClose
            render={
              <Button
                size={"lg"}
                type="button"
                className="cursor-pointer"
              />
            }>
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
