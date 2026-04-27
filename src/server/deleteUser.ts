"use server";

import { auth } from "@/lib/auth";
import { isAPIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import authUserServer from "./authUserServer";

// Better Auth delete user error messages
const BETTER_AUTH_DELETE_USER_ERROR_MESSAGES: Record<string, string> = {
  user_not_found: "User not found.",
  unauthorized: "You are not authorized to delete this user.",
  forbidden: "You do not have permission to perform this action.",
  internal_server_error: "Auth server error. Please try again.",
};

const deleteUser = async (userId: string) => {
  const session = await authUserServer();

  if (session.user.role !== "ADMIN") {
    redirect("/signin");
  }
  try {
    const deletedUser = await auth.api.removeUser({
      body: {
        userId,
      },
      headers: await headers(),
    });

    // check if user actually deleted
    if (!deletedUser) {
      return {
        success: false,
        message: "Failed to delete user",
      };
    }

    revalidatePath("/admin");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    // Better Auth specific errors
    if (isAPIError(error)) {
      const code = error.body?.code?.toLowerCase();

      if (code && BETTER_AUTH_DELETE_USER_ERROR_MESSAGES[code]) {
        return {
          success: false,
          message: BETTER_AUTH_DELETE_USER_ERROR_MESSAGES[code],
        };
      }
    }

    return {
      success: false,
      message: "Something went wrong while deleting user.",
    };
  }
};

export default deleteUser;
