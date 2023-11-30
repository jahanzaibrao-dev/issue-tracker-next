import prisma from "@/prisma/client";
import { createIssuePayload, editIssuePayload } from "./types";

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
    const issues = await prisma.issue.findMany({
      orderBy: { createdAt: "desc" },
    });

    return issues;
  };

  deleteIssue = async (id: number) => {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) {
      throw {
        message: "Issue with this id not found",
      };
    }

    await prisma.issue.delete({ where: { id } });

    return {
      message: "Issue deleted successfully!",
    };
  };

  updateIssue = async (id: number, payload: editIssuePayload) => {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) {
      throw {
        message: "Issue with this id not found",
      };
    }

    const updatedIssue = await prisma.issue.update({
      where: { id },
      data: payload,
    });

    return {
      message: "Issue updated successfully!",
      issue: updatedIssue,
    };
  };
}
