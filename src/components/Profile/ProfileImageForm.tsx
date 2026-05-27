"use client";

import { clientEnv } from "@/lib/env/clientEnv";
import updateAvatar from "@/server/updateAvatar";
import { Camera } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Button } from "../shadcnui/button";

type ProfileImageFormProp = {
  currentAvatar: string | null;
  name: string;
};

const ProfileImageForm = ({ currentAvatar, name }: ProfileImageFormProp) => {
  const [isFile, setIsFile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { openFilePicker, filesContent, plainFiles, clear, errors } =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
      validators: [
        new FileSizeValidator({
          maxFileSize: 5 * 1024 * 1024,
        }),
      ],
      onFilesSuccessfullySelected: () => setIsFile(true),
    });

  const nameArray = name.split(" ");

  const charactersArray = nameArray.map((n) => {
    return n.charAt(0);
  });

  const profileImageHandler = async () => {
    const selectedFile = plainFiles[0];
    if (!selectedFile) {
      toast.error("Please select an image first.");
      return;
    }

    setIsUploading(true);
    const { isSuccess, message } = await updateAvatar(selectedFile);
    setIsUploading(false);

    if (!isSuccess) {
      toast.error(message);
      return;
    }

    toast.success(message);
    setIsFile(false);
    clear();
  };
  return (
    <div
      aria-label="Profile picture"
      className="grid place-items-center gap-2">
      {/* avatar + caption */}
      <figure className="relative m-0">
        <Avatar
          className="h-40 w-40 shadow-lg ring-2 ring-white dark:ring-zinc-800"
          aria-label="Current profile picture">
          <AvatarImage
            src={`${filesContent[0]?.content ? filesContent[0]?.content : `${currentAvatar ? `${clientEnv.NEXT_PUBLIC_SPACES_CDN_ENDPOINT}/${currentAvatar}` : `/avatar.png`}`}`}
            className="object-cover"
            alt={`${name}'s profile picture`}
          />
          <AvatarFallback className="bg-linear-to-br from-blue-400 to-indigo-600 text-2xl font-bold text-white">
            {charactersArray.join("")}
          </AvatarFallback>
        </Avatar>

        {/* button to open file picker */}
        <Button
          size="icon"
          type="button"
          onClick={openFilePicker}
          className="absolute top-32 right-4 cursor-pointer rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
          aria-label="Select new profile picture">
          <Camera
            className="h-5 w-5"
            aria-hidden="true"
          />
        </Button>
      </figure>

      {/* Error message for file validation */}
      {errors[0] && (
        <p className="text-destructive text-center text-sm">
          File is too large (5 MB)
        </p>
      )}

      {/* Action buttons shown only when file selected */}
      {isFile && (
        <div className="mt-2 flex items-center gap-3">
          {/* Change Button  */}
          <Button
            onClick={openFilePicker}
            type="button"
            className="cursor-pointer rounded-xl border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 transition hover:bg-gray-100">
            Change Photo
          </Button>

          {/* Update Button */}
          <Button
            disabled={isUploading}
            onClick={() => profileImageHandler()}
            type="submit"
            className="cursor-pointer rounded-xl bg-blue-600 px-6 py-2 font-medium text-white shadow-sm hover:bg-blue-700">
            Update Photo
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileImageForm;
