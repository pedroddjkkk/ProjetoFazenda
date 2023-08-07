import { z } from "zod";

export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8).max(100);
export const usernameSchema = z.string().min(3).max(100);
