import z from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, { error: "DATABASE_URL is required" }),
  BETTER_AUTH_SECRET: z.string({
    error: "BETTER_AUTH_SECRET Key Not Found",
  }),
});

const serverEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
};

export const serverEnv = serverEnvSchema.parse(serverEnvVars);
