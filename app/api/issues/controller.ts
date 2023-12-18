import prisma from "@/prisma/client";
import { IssueStatus, createIssuePayload, editIssuePayload } from "./types";

export class IssueController {
  createIssue = async (body: createIssuePayload) => {
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return {
      title: newIssue.title,
      description: newIssue.description,
      id: newIssue.id,
      status: newIssue.status,
    };
  };

  getAllIssues = async () => {
    const issues = await prisma.issue.findMany({
      orderBy: { createdAt: "desc" },
    });

    return issues;
  };

  get_x_type_of_issues = async ({ status }: { status: any }) => {
    if (status !== "all" && !Object.values(IssueStatus).includes(status)) {
      return {
        gptResponse: `${status} is not a valid issue status. Valid issue statuses are Open, Resolved and In_progress`,
      };
    }

    const issues =
      status === "all"
        ? await this.getAllIssues()
        : await this.getIssuesOfSpecificStatus(status);

    return {
      issues: issues.map((issue) => {
        return {
          title: issue.title,
          description: issue.description,
          id: issue.id,
          status: issue.status,
        };
      }),
    };
  };

  getSingleIssue = async (id: number) => {
    const issue = await prisma.issue.findUnique({ where: { id } });

    if (!issue) {
      throw {
        message: "Issue with this id not found",
      };
    }

    return issue;
  };

  getIssuesOfSpecificStatus = async (status: IssueStatus) => {
    const issues = await prisma.issue.findMany({ where: { status } });

    return issues;
  };

  deleteIssue = async (id: number) => {
    const issue = await this.getSingleIssue(id);

    await prisma.issue.delete({ where: { id } });

    return {
      message: `Issue with title ${issue.title} deleted successfully!`,
    };
  };

  updateIssue = async (id: number, payload: editIssuePayload) => {
    const issue = await this.getSingleIssue(id);

    const updatedIssue = await prisma.issue.update({
      where: { id },
      data: payload,
    });

    return {
      message: "Issue updated successfully!",
      issue: {
        title: updatedIssue.title,
        description: updatedIssue.description,
        id: updatedIssue.id,
        status: updatedIssue.status,
        updatedAt: updatedIssue.updatedAt,
      },
    };
  };

  getStats = async () => {
    const openIssues = await prisma.issue.count({
      where: { status: IssueStatus.Open },
    });
    const resolvedIssues = await prisma.issue.count({
      where: { status: IssueStatus.Resolved },
    });
    const inProgressIssues = await prisma.issue.count({
      where: { status: IssueStatus.In_Progress },
    });

    return {
      open: openIssues,
      resolved: resolvedIssues,
      inProgress: inProgressIssues,
    };
  };
}
