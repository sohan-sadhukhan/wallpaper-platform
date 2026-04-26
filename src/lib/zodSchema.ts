import z from "zod";

// Reusable name schema
const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters long")
  .max(50, "Name must be at most 50 characters long");

// Reusable username schema
const userNameSchema = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters long")
  .max(50, "Username must be at most 50 characters long");

// Reusable email schema
const emailSchema = z
  .email("Invalid email address")
  .trim()
  .min(5, "Email is too short")
  .max(55, "Email is too long");

// Reusable password schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(64, "Password must be at most 64 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

// Sign-up form validation schema
export const signUpSchema = z
  .object({
    name: nameSchema,
    username: userNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Sign-in form validation schema
export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean(),
});

// Username + email schema
export const usernameEmailSchema = z.object({
  username: userNameSchema,
  email: emailSchema,
});

// Change password schema
export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: "Password didn't match",
    path: ["confirmNewPassword"],
  });

// Delete account Schema
export const deleteAccountSchema = z.object({
  password: passwordSchema,
});

// Name Schema
export const profileNameSchema = z.object({
  name: nameSchema,
});

// Bio Schema
export const profileBioSchema = z.object({
  bio: z.string().max(160, "Bio must be 160 characters or fewer").optional(),
});
