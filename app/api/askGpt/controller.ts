import { IssueController } from "../issues/controller";
import { IssueStatus } from "../issues/types";
import { DemoChat } from "../utils/customGpt";

export class GptController {
  issueController = new IssueController();

  askGpt = async (message: string) => {
    const response = await DemoChat(message);

    if (!response.tool_calls?.length)
      return {
        gptResponse: response.content,
      };

    const functionProps = response.tool_calls[0].function;

    if (functionProps.name === "get_x_type_of_issues") {
      const status = JSON.parse(
        response.tool_calls[0].function.arguments
      ).status;
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
    }

    return {
      gptResponse: "Wrong Function Name",
    };
  };
}
