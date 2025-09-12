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

export const RegisterFormSchema = z
  .object({
    email: z.string()
      .email({ message: "Please enter a valid email address." })
      .trim()
      .toLowerCase(),
    password: z.string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .trim(),
    confirmPassword: z.string() 
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
