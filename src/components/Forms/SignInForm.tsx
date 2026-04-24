"use client";

import { SignIn } from "@/lib/types";
import { signInSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const SignInForm = () => {
  const { push } = useRouter();

  // React Hook Form configuration
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    mode: "all",
  });

  //  Handles form submission
  const signInHandeler = async (lData: SignIn) => {
    console.log(lData);
  };

  return (
    <form
      onSubmit={handleSubmit(signInHandeler)}
      className="grid gap-6"
      noValidate>
      {/* Email Field */}
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

      {/* Password Field */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Remember Me Checkbox */}
      <Controller
        name="rememberMe"
        control={control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            orientation={"horizontal"}>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="cursor-pointer"
            />
            <FieldLabel htmlFor={field.name}>Keep me signed in</FieldLabel>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Submit Button */}
      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={isSubmitting}>
        {isSubmitting ?
          <>
            <Loader2Icon className="animate-spin" /> Signing in...
          </>
        : <>
            <LockIcon /> Sign In
          </>
        }
      </Button>
    </form>
  );
};

export default SignInForm;
