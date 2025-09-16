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

import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    name: z.string()
      .min(1, { message: "Name is required" })
      .trim(),
    email: z.string()
      .email({ message: "Please enter a valid email address." })
      .trim()
      .toLowerCase(),
    password: z.string()
    .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must be less than 100 characters" }) 
      .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .refine(password => !/password|123456|qwerty|admin|welcome/i.test(password), {
        message: "Password is too common",
      })
      .trim(),
    confirmPassword: z.string()
      .min(1, { message: "Please confirm your password" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });