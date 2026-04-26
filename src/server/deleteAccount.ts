"use server";

import { auth } from "@/lib/auth";
import { DeleteAccountType } from "@/lib/types";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";

const BETTER_AUTH_DELETE_ACCOUNT_ERROR_MESSAGES: { [key: string]: string } = {
  invalid_password: "Incorrect password. Please try again.",
  invalid_credentials: "Incorrect password. Please try again.",
  user_not_found: "User not found.",
  unauthorized: "You need to sign in again before deleting your account.",
  session_not_found: "Your session expired. Please sign in again.",
  internal_server_error: "Auth server error. Please try again.",
};

const deleteAccount = async ({ password }: DeleteAccountType) => {
  try {
    // Call auth API to delete the user account
    await auth.api.deleteUser({
      body: {
        password,
      },
      headers: await headers(),
    });

    // Success response
    return {
      isSuccess: true,
      message: "Account successfully deleted 👍",
    };
  } catch (error) {
    // Handle Better Auth specific errors with safe user-friendly messages
    if (isAPIError(error)) {
      const code = error.body?.code?.toLowerCase();
      if (code && BETTER_AUTH_DELETE_ACCOUNT_ERROR_MESSAGES[code]) {
        return {
          isSuccess: false,
          message: BETTER_AUTH_DELETE_ACCOUNT_ERROR_MESSAGES[code],
        };
      }
    }

    // Fallback for unknown failures
    return {
      isSuccess: false,
      message: "Failed to delete account. Please try again.",
    };
  }
};

export default deleteAccount;
