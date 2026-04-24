"use server";

import { auth } from "@/lib/auth";
import { ChangePasswordType } from "@/lib/types";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";

const BETTER_AUTH_CHANGE_PASSWORD_ERROR_MESSAGES: { [key: string]: string } = {
  invalid_password: "Current password is incorrect.",
  invalid_credentials: "Current password is incorrect.",
  weak_password: "New password is too weak. Please choose a stronger password.",
  same_password:
    "New password cannot be the same as your current password.",
  unauthorized: "You need to sign in again before changing your password.",
  session_not_found: "Your session expired. Please sign in again.",
  user_not_found: "User not found.",
  internal_server_error: "Auth server error. Please try again.",
};

const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordType) => {
  try {
    // Call auth API to update the user's password
    await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
      },
      headers: await headers(),
    });

    // Success response
    return {
      isSuccess: true,
      message: "Password successfully changed.",
    };
  } catch (error) {
    // Handle Better Auth specific errors with safe user-friendly messages
    if (isAPIError(error)) {
      const code = error.body?.code?.toLowerCase();
      if (code && BETTER_AUTH_CHANGE_PASSWORD_ERROR_MESSAGES[code]) {
        return {
          isSuccess: false,
          message: BETTER_AUTH_CHANGE_PASSWORD_ERROR_MESSAGES[code],
        };
      }
    }

    // Fallback for unknown failures
    return {
      isSuccess: false,
      message: "Failed to change password. Please try again.",
    };
  }
};

export default changePassword;
