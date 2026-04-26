"use server";

import { auth } from "@/lib/auth";
import { ProfileNameType } from "@/lib/types";
import { profileNameSchema } from "@/lib/zodSchema";
import { isAPIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import authUserServer from "./authUserServer";

const BETTER_AUTH_UPDATE_NAME_ERROR_MESSAGES: { [key: string]: string } = {
  invalid_name: "Please enter a valid name.",
  unauthorized: "You need to sign in again before updating your name.",
  session_not_found: "Your session expired. Please sign in again.",
  user_not_found: "User not found.",
  internal_server_error: "Auth server error. Please try again.",
};

const updateName = async ({ name }: ProfileNameType) => {
  const parsed = profileNameSchema.safeParse({ name });

  if (!parsed.success) {
    return {
      isSuccess: false,
      message: parsed.error.issues[0]?.message ?? "Invalid name.",
    };
  }

  try {
    const session = await authUserServer();
    const nextName = parsed.data.name;

    if (nextName === session.user.name) {
      return {
        isSuccess: true,
        message: "No changes to update.",
      };
    }

    await auth.api.updateUser({
      body: {
        name: nextName,
      },
      headers: await headers(),
    });

    revalidatePath("/profile");

    return {
      isSuccess: true,
      message: "Name successfully updated.",
    };
  } catch (error) {
    if (isAPIError(error)) {
      const code = error.body?.code?.toLowerCase();
      if (code && BETTER_AUTH_UPDATE_NAME_ERROR_MESSAGES[code]) {
        return {
          isSuccess: false,
          message: BETTER_AUTH_UPDATE_NAME_ERROR_MESSAGES[code],
        };
      }
    }

    return {
      isSuccess: false,
      message: "Failed to update name. Please try again.",
    };
  }
};

export default updateName;
