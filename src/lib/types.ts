import z from "zod";
import {
  changePasswordSchema,
  deleteAccountSchema,
  signInSchema,
  signUpSchema,
  usernameEmailSchema,
} from "./zodSchema";

// Sign-up form data type
export type SignUp = z.infer<typeof signUpSchema>;

// Sign-in form data type
export type SignIn = z.infer<typeof signInSchema>;

// Username + email type
export type UsernameEmailType = z.infer<typeof usernameEmailSchema>;

// Change password type
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

// Delete account type
export type DeleteAccountType = z.infer<typeof deleteAccountSchema>;
