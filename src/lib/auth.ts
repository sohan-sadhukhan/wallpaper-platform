import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, username } from "better-auth/plugins";
import { hashPasswordFunction, verifyPasswordFunction } from "./argon2";
import { customAc, superAdmin, user } from "./authPermissions";
import prisma from "./database/dbClient";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    password: {
      hash: hashPasswordFunction,
      verify: verifyPasswordFunction,
    },
  },
  plugins: [
    nextCookies(),
    username(),
    admin({
      ac: customAc,
      adminRoles: ["ADMIN"],
      defaultRole: "USER",
      roles: { ADMIN: superAdmin, USER: user },
    }),
  ],

  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
});
