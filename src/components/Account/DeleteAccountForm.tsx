"use client";

import { DeleteAccountType } from "@/lib/types";
import { deleteAccountSchema } from "@/lib/zodSchema";
import deleteAccount from "@/server/deleteAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcnui/dialog";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const DeleteAccountForm = () => {
  const { replace } = useRouter();
  // Controls dialog open/close state
  const [open, setOpen] = useState(false);

  // Initialize react-hook-form with Zod validation
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<DeleteAccountType>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
    mode: "all",
  });

  // Handle account deletion submission
  const deleteAccountHandler = async (password: DeleteAccountType) => {
    const { isSuccess, message } = await deleteAccount(password);
    if (!isSuccess) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      replace("/");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      {/* Trigger button to open delete confirmation dialog */}
      <DialogTrigger
        className="inline-flex w-fit"
        render={
          <Button
            size={"lg"}
            variant="destructive"
            type="button"
            className="inline-flex w-fit cursor-pointer items-center gap-2"
          />
        }>
        <Trash2Icon size={18} />
        Delete Account
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <AlertTriangleIcon size={22} />
            Delete Account
          </DialogTitle>

          <DialogDescription>
            Are you absolutely sure? This action is irreversible and will
            permanently remove your account.
          </DialogDescription>
        </DialogHeader>

        <form
          id="delete-account-form"
          onSubmit={handleSubmit(deleteAccountHandler)}
          className="mt-2 grid w-full gap-4">
          {/*  Password Confirmation Field  */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your current Password"
                  autoComplete="current-password"
                  type="password"
                  className="mt-1"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex items-center justify-end gap-2">
            {/*  Action Buttons  */}
            <DialogClose
              render={
                <Button
                  variant="outline"
                  type="button"
                  className="h-9 min-w-24 cursor-pointer"
                />
              }
              disabled={isSubmitting}
              type="button">
              Cancel
            </DialogClose>

            {/* Confirm delete button */}
            <Button
              type="submit"
              variant="destructive"
              disabled={isSubmitting || !isDirty}
              className="h-9 min-w-24 cursor-pointer items-center gap-2">
              {isSubmitting ?
                <>
                  <Loader2Icon className="animate-spin" />
                  Deleting...
                </>
              : <>
                  <Trash2Icon size={18} />
                  Delete
                </>
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountForm;
