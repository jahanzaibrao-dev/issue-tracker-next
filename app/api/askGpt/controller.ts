import { Session } from "next-auth";
import { IssueController } from "../issues/controller";
import { IssueStatus } from "../issues/types";
import { DemoChat, createThread } from "../utils/customGpt";
import prisma from "@/prisma/client";

export class GptController {
  issueController = new IssueController();

  askGpt = async (message: string, session: Session) => {
    if (!session.user?.email) {
      throw {
        message: "Invalid Session",
      };
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user?.threadId) {
      const threadId = await createThread(message);
      await prisma.user.update({
        where: { email: session.user.email },
        data: { threadId },
      });
    }

    const response = await DemoChat(message);

    if (!response.tool_calls?.length)
      return {
        gptResponse: response.content,
      };

    const functionName = response.tool_calls[0].function.name;
    const args = JSON.parse(response.tool_calls[0].function.arguments);
    if (functionName === "get_x_type_of_issues") {
      const customResponse = await this.get_x_type_of_issues(args);

      return customResponse;
    }

    return {
      gptResponse: "Wrong Function Name",
    };
  };

  get_x_type_of_issues = async ({ status }: { status: any }) => {
    console.log("inside type issue function");
    if (status !== "all" && !Object.values(IssueStatus).includes(status)) {
      return {
        gptResponse: `${status} is not a valid issue status. Valid issue statuses are Open, Resolved and In_progress`,
      };
    }

    const issues =
      status === "all"
        ? await this.issueController.getAllIssues()
        : await this.issueController.getIssuesOfSpecificStatus(status);
    return {
      gptResponse:
        status === "all"
          ? "Here are all Issues"
          : `Here are the Issues with status ${status}`,
      issues: issues,
    };
  };
}
