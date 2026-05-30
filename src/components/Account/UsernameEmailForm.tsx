"use client";

import { UsernameEmailType } from "@/lib/types";
import { usernameEmailSchema } from "@/lib/zodSchema";
import updateUsernameEmail from "@/server/updateUsernameEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

// Props for UsernameEmailForm component
type UsernameEmailFormprop = {
  username: string;
  email: string;
};

const UsernameEmailForm = ({ username, email }: UsernameEmailFormprop) => {
  // Initialize react-hook-form with Zod validation
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<UsernameEmailType>({
    resolver: zodResolver(usernameEmailSchema),
    defaultValues: {
      username: username,
      email: email,
    },
    mode: "all",
  });

  //  Handles form submission
  const updateAccountHandler = async (userData: UsernameEmailType) => {
    const { isSuccess, message } = await updateUsernameEmail(userData);
    if (!isSuccess) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateAccountHandler)}
      className="grid gap-4 sm:grid-cols-2">
      {/*  Username Field  */}
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Username</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your username"
              autoComplete="username"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/*  Email Field  */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="email"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/*  Submit Button  */}
      <Button
        className="flex cursor-pointer"
        type="submit"
        disabled={isSubmitting || !isDirty}>
        {isSubmitting ?
          <>
            <Loader2 className="animate-spin" /> Updating...
          </>
        : <>
            <EditIcon />
            Update
          </>
        }
      </Button>
    </form>
  );
};

export default UsernameEmailForm;
