import z from "zod";
import { signInSchema, signUpSchema } from "./zodSchema";

// Sign-up form data type
export type SignUp = z.infer<typeof signUpSchema>;

// Sign-in form data type
export type SignIn = z.infer<typeof signInSchema>;
