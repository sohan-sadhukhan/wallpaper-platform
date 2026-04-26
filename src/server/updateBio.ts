"use server";

import prisma from "@/lib/database/dbClient";
import { ProfileBioType } from "@/lib/types";
import { profileBioSchema } from "@/lib/zodSchema";
import { revalidatePath } from "next/cache";
import authUserServer from "./authUserServer";

const updateBio = async ({ bio }: ProfileBioType) => {
  const parsed = profileBioSchema.safeParse({ bio });

  if (!parsed.success) {
    return {
      isSuccess: false,
      message: parsed.error.issues[0]?.message ?? "Invalid bio.",
    };
  }

  try {
    const session = await authUserServer();
    const nextBio = parsed.data.bio?.trim();

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { bio: true },
    });

    if ((currentUser?.bio ?? "") === nextBio) {
      return {
        isSuccess: true,
        message: "No changes to update.",
      };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        bio: nextBio,
      },
    });

    revalidatePath("/profile");

    return {
      isSuccess: true,
      message: "Bio successfully updated.",
    };
  } catch {
    return {
      isSuccess: false,
      message: "Failed to update bio. Please try again.",
    };
  }
};

export default updateBio;
