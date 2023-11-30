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

export const IssueIdValidation = z.object({
  id: z.number().min(1, "Invalid issue id"),
});
