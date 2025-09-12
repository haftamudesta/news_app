import { z } from "zod";

export const LoginFormSchema = z
  .object({
    email: z.string()
      .email({ message: "Please enter a valid email address." })
      .trim()
      .toLowerCase(),
    password: z.string()
      .min(1, { message: "Password is required" })
  })