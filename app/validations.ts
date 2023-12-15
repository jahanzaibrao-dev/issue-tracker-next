import { z } from "zod";

export const createIssueValidation = z.object({
  title: z.string().max(255).min(1, "title is required"),
  description: z.string().min(1, "description is required"),
});

export const editIssueValidation = z.object({
  title: z.string().max(255).min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  status: z.enum(["Open", "In_Progress", "Resolved"]),
});

export const registerUserValidation = z.object({
  name: z.string().max(255).min(1, "name is required"),
  email: z.string().email("Invalid email format").min(1, "email is required"),
  password: z.string().min(1, "password is required"),
});

export const loginValidation = z.object({
  email: z.string().email("Invalid email format").min(1, "email is required"),
  password: z.string().min(1, "password is required"),
});

export const gptMessageValidation = z.object({
  message: z.string().min(1, "Please enter something"),
});

export const IssueIdValidation = z.object({
  id: z.number().min(1, "Invalid issue id"),
});
