"use client";

import updateCoverImage from "@/server/updateCoverImage";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Button } from "../shadcnui/button";

type CoverImageFormProps = {
  currentCover: string | null;
};

const CoverImageForm = ({ currentCover }: CoverImageFormProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const { openFilePicker, filesContent, plainFiles, clear, errors } =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
      validators: [new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 })],
    });

  const isDirty = filesContent[0]?.content;

  const coverImageHandler = async () => {
    setIsUploading(true);
    const { isSuccess, message } = await updateCoverImage(plainFiles[0]);
    setIsUploading(false);

    if (!isSuccess) {
      toast.error(message);
      return;
    }

    toast.success(message);
    clear();
  };
  return (
    <div
      aria-label="Cover picture"
      className="grid place-items-center gap-2">
      {/* image + caption */}
      <figure className="m-0 w-full">
        {/* Cover Image */}
        <Image
          height={300}
          width={700}
          src={`${filesContent[0]?.content ? filesContent[0]?.content : `${currentCover ? `/${currentCover}` : `/cover.jpg`}`}`}
          alt="Cover picture"
          className="h-36 w-full rounded-xl object-cover"
        />

        {/* Filename caption */}
        {plainFiles.map((file, ind) => (
          <figcaption
            key={ind}
            className="mt-1 text-center text-xs text-zinc-400">
            {file.name}
          </figcaption>
        ))}
      </figure>

      {/* Error message */}
      {errors[0] && (
        <p
          role="alert"
          className="text-destructive text-center text-sm">
          File is too large. Maximum size is 5 MB.
        </p>
      )}

      {/* Actions buttons */}
      <div
        className="mt-2 flex items-center gap-3"
        aria-label="Cover image actions">
        {/* Change button  */}
        <Button
          type="button"
          onClick={openFilePicker}
          className="cursor-pointer rounded-xl border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 hover:bg-gray-100">
          Change
        </Button>

        {/* Update button only visible when new file selected */}
        {isDirty && (
          <Button
            disabled={isUploading || !isDirty}
            onClick={() => coverImageHandler()}
            className="cursor-pointer rounded-xl bg-blue-600 px-6 py-2 font-medium text-white shadow-sm hover:bg-blue-700">
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default CoverImageForm;
