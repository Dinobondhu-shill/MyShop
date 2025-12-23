import { z } from "zod";

/**
 * User Registration Validation
 */
export const registerSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters"),

  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .optional(),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number is too short")
    .max(20, "Phone number is too long"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  marketing_preference: z
    .boolean()
    .optional(),
});

/**
 * User Login Validation
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});
