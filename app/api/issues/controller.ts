import prisma from "@/prisma/client";
import { createIssuePayload } from "./types";

export class IssueController {
  createIssue = async (body: createIssuePayload) => {
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return newIssue;
  };

  getAllIssues = async () => {
    const issues = prisma.issue.findMany({ orderBy: { createdAt: "desc" } });

    return issues;
  };
}
