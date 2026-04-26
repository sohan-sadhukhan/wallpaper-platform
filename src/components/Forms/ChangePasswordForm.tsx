"use client";

import { ChangePasswordType } from "@/lib/types";
import { changePasswordSchema } from "@/lib/zodSchema";
import changePassword from "@/server/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const ChangePasswordForm = () => {
  // Initialize react-hook-form with Zod validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "all",
  });

  // Handle password change submission
  const changePasswordHandler = async (password: ChangePasswordType) => {
    const { isSuccess, message } = await changePassword(password);
    if (!isSuccess) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      reset();
    }
  };

  return (
    <form
      id="change-password-form"
      onSubmit={handleSubmit(changePasswordHandler)}>
      {/*  Current Password Field  */}
      <Controller
        name="currentPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your current password"
              autoComplete="current-password"
              type="password"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/*  New Password Field  */}
        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your new password"
                autoComplete="new-password"
                type="password"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/*  Confirm New Password Field  */}
        <Controller
          name="confirmNewPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter confirm password"
                autoComplete="new-password"
                type="password"
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
              <Loader2 className="animate-spin" /> Updating..
            </>
          : <>
              <EditIcon />
              Update Password
            </>
          }
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
