"use server";

import { auth } from "@/lib/auth";
import { UsernameEmailType } from "@/lib/types";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";
import authUserServer from "./authUserServer";

const BETTER_AUTH_UPDATE_PROFILE_ERROR_MESSAGES: { [key: string]: string } = {
  invalid_email: "Please enter a valid email address.",
  email_already_exists: "This email is already in use.",
  user_already_exists: "This email is already in use.",
  username_already_exists: "This username is already taken.",
  invalid_username: "Please choose a valid username.",
  unauthorized: "You need to sign in again before updating your profile.",
  session_not_found: "Your session expired. Please sign in again.",
  user_not_found: "User not found.",
  internal_server_error: "Auth server error. Please try again.",
};

const updateUsernameEmail = async ({ username, email }: UsernameEmailType) => {
  try {
    // Fetch the currently authenticated user session
    const session = await authUserServer();

    // Update username only if it has changed
    if (username !== session.user.username) {
      await auth.api.updateUser({
        body: {
          username,
        },
        headers: await headers(),
      });
    }

    // Update email only if it has changed
    if (email !== session.user.email) {
      await auth.api.changeEmail({
        body: {
          newEmail: email,
        },
        headers: await headers(),
      });
    }

    // Return a contextual success message based on what was updated
    if (username !== session.user.username && email !== session.user.email) {
      return {
        isSuccess: true,
        message: "Username & Email Successfully Changed.",
      };
    } else if (email !== session.user.email) {
      return {
        isSuccess: true,
        message: "Email Successfully Changed.",
      };
    } else {
      return {
        isSuccess: true,
        message: "Username Successfully Changed.",
      };
    }
  } catch (error) {
    // Handle Better Auth specific errors with safe user-friendly messages
    if (isAPIError(error)) {
      const code = error.body?.code?.toLowerCase();
      if (code && BETTER_AUTH_UPDATE_PROFILE_ERROR_MESSAGES[code]) {
        return {
          isSuccess: false,
          message: BETTER_AUTH_UPDATE_PROFILE_ERROR_MESSAGES[code],
        };
      }
    }

    // Fallback for unknown failures
    return {
      isSuccess: false,
      message: "Failed to update. Please try again.",
    };
  }
};

export default updateUsernameEmail;
