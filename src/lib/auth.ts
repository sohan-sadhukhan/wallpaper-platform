import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { hashPasswordFunction, verifyPasswordFunction } from "./argon2";
import prisma from "./database/dbClient";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
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
  plugins: [nextCookies(), username()],
});
