"use client";

import { ProfileBioType } from "@/lib/types";
import { profileBioSchema } from "@/lib/zodSchema";
import updateBio from "@/server/updateBio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PencilLineIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Textarea } from "../shadcnui/textarea";

type BioFormProps = {
  currentBio: string | null;
};

const BioForm = ({ currentBio }: BioFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<ProfileBioType>({
    resolver: zodResolver(profileBioSchema),
    defaultValues: {
      bio: currentBio ?? "",
    },
    mode: "all",
  });

  const bioHandler = async ({ bio }: ProfileBioType) => {
    const { isSuccess, message } = await updateBio({ bio });

    if (!isSuccess) {
      toast.error(message);
      return;
    }

    toast.success(message);
  };
  return (
    <form
      onSubmit={handleSubmit(bioHandler)}
      className="grid gap-6"
      noValidate
      aria-label="Update profile bio">
      <Controller
        name="bio"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Bio</FieldLabel>

            {/* Bio input field */}
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Write something about yourself..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Submit button */}
      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={!isDirty || isSubmitting}>
        {isSubmitting ?
          <>
            <Loader2Icon
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
            Updating...
          </>
        : <>
            <PencilLineIcon
              className="mr-2 h-4 w-4"
              aria-hidden="true"
            />
            Update
          </>
        }
      </Button>
    </form>
  );
};

export default BioForm;
