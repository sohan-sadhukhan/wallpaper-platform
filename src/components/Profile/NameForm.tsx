"use client";

import { ProfileNameType } from "@/lib/types";
import { profileNameSchema } from "@/lib/zodSchema";
import updateName from "@/server/updateName";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PencilLineIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

type NameFormProps = {
  currentName: string;
};

const NameForm = ({ currentName }: NameFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<ProfileNameType>({
    resolver: zodResolver(profileNameSchema),
    defaultValues: {
      name: currentName,
    },
    mode: "all",
  });

  const nameHandler = async ({ name }: ProfileNameType) => {
    const { isSuccess, message } = await updateName({ name });

    if (!isSuccess) {
      toast.error(message);
      return;
    }

    toast.success(message);
  };

  return (
    <form
      onSubmit={handleSubmit(nameHandler)}
      className="grid gap-6"
      noValidate
      aria-label="Update profile name">
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            {/* Name input */}
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your name"
              autoComplete="name"
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

export default NameForm;
