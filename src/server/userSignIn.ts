"use server";

import { auth } from "@/lib/auth";
import { SignIn } from "@/lib/types";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";

// Better Auth error code
const BETTER_AUTH_SIGNIN_ERROR_MESSAGES: {
  [key: string]: string;
} = {
  email_not_found: "No account found with this email.",
  invalid_email_or_password: "Invalid email or password.",
  invalid_password: "Invalid email or password.",
  invalid_credentials: "Invalid email or password.",
  account_not_linked: "This account is not linked. Try another sign-in method.",
  internal_server_error: "Auth server error. Please try again.",
  banned_user:
    "You have been banned from this application. Please contact support if you believe this is an error.",
};

const userSignIn = async ({ email, password, rememberMe }: SignIn) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
      headers: await headers(),
    });

    return { isSuccess: true, message: "Signed in successfully." };
  } catch (error) {
    // Handle Better Auth specific errors
    if (isAPIError(error)) {
      const code = error.body?.code?.toLowerCase();

      if (code && BETTER_AUTH_SIGNIN_ERROR_MESSAGES[code]) {
        return {
          isSuccess: false,
          message: BETTER_AUTH_SIGNIN_ERROR_MESSAGES[code],
        };
      }
    }

    return { isSuccess: false, message: "Failed to sign in." };
  }
};

export default userSignIn;
