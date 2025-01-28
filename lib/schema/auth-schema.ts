import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6).max(16),
});

export const SignupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    phone: z.string(),
    password: z.string().min(6).max(16),
});
