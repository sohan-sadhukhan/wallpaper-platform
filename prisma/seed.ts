import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { serverEnv } from "@/lib/env/serverEnv";
import { Role } from "../generated/prisma/client";

async function main() {
  try {
    const adminEmail = serverEnv.ADMIN_EMAIL;
    const adminPassword = serverEnv.ADMIN_PASSWORD;

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const data = await auth.api.signUpEmail({
      body: {
        name: "Super Admin",
        username: "admin23",
        displayUsername: "admin23",
        email: adminEmail,
        password: adminPassword,
      },
    });

    await prisma.user.update({
      where: {
        id: data.user.id,
      },
      data: {
        role: Role.ADMIN,
        emailVerified: true,
      },
    });

    console.log("✅ Admin created successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
