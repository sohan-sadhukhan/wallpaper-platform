"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { SignUp } from "@/lib/types";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";

// Better Auth error code
const BETTER_AUTH_SIGNUP_ERROR_MESSAGES: {
  [key: string]: string;
} = {
  signup_disabled: "Sign up is currently disabled.",
  email_already_exists: "An account with this email already exists.",
  user_already_exists: "An account with this email already exists.",
  unable_to_create_user: "Unable to create account. Please try again.",
  unable_to_create_session:
    "Account created but sign-in failed. Please sign in.",
  internal_server_error: "Auth server error. Please try again.",
};

const userSignUp = async ({ name, username, email, password }: SignUp) => {
  try {
    const data = await auth.api.signUpEmail({
      body: {
        name,
        username,
        displayUsername: username,
        email,
        password,
      },
      headers: await headers(),
    });

    await prisma.user.update({
      where: { id: data.user.id },
      data: {
        bio: "Hey there! I'm new here and excited to explore amazing wallpapers.",
        // interests: {
        //   create: [
        //     { name: "Nature" },
        //     { name: "Minimal" },
        //     { name: "Abstract" },
        //     { name: "Dark Mode" },
        //   ],
        // },
      },
    });

    return {
      isSuccess: true,
      message: "User signed up successfully",
    };
  } catch (error) {
    // Handle Better Auth specific errors
    if (isAPIError(error)) {
      const code = error.body?.code?.toLowerCase();

      if (code && BETTER_AUTH_SIGNUP_ERROR_MESSAGES[code]) {
        return {
          isSuccess: false,
          message: BETTER_AUTH_SIGNUP_ERROR_MESSAGES[code],
        };
      }
    }

    return {
      isSuccess: false,
      message: "Failed to sign up user",
    };
  }
};

export default userSignUp;
