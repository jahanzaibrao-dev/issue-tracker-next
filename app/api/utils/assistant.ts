import OpenAI from "openai";
import {
  MessageContentText,
  RequiredActionFunctionToolCall,
  RunSubmitToolOutputsParams,
} from "openai/resources/beta/threads/index.mjs";

import { IssueController } from "../issues/controller";

const openAi = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function createThread() {
  const thread = await openAi.beta.threads.create();

  return thread;
}

export async function addMessageToThread(threadId: string, message: string) {
  const response = await openAi.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });

  return response;
}

export async function runAssistant(threadId: string) {
  const response = await openAi.beta.threads.runs.create(threadId, {
    assistant_id: process.env.OPEN_AI_ASSISTANT_ID || "",
  });

  return response;
}

export async function cancelRun(threadId: string, runId: string) {
  const response = await openAi.beta.threads.runs.cancel(threadId, runId);

  return response;
}

export async function call_required_function(
  toolCalls: RequiredActionFunctionToolCall[],
  threadId: string,
  runId: string
) {
  const controller = new IssueController();
  const outputs: RunSubmitToolOutputsParams.ToolOutput[] = [];

  for (const toolCall of toolCalls) {
    const functionName = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);

    let output;

    switch (functionName) {
      case "get_x_type_of_issues":
        output = await controller.get_x_type_of_issues(args);
        break;

      case "create_issue":
        output = await controller.createIssue(args);
        break;

      case "update_issue":
        output = await controller.updateIssue(args.id, {
          title: args.title,
          description: args.description,
          status: args.status,
        });
        break;

      case "delete_issue":
        output = await controller.deleteIssue(args.id);

        break;

      default:
        throw {
          message: "Unknown Function",
        };
        break;
    }

    outputs.push({
      tool_call_id: toolCall.id,
      output: JSON.stringify(output),
    });
  }

  await openAi.beta.threads.runs.submitToolOutputs(threadId, runId, {
    tool_outputs: outputs,
  });
}

export async function waitForRunCompletion(runId: string, threadId: string) {
  let isRunCompleted = false;
  while (!isRunCompleted) {
    const response = await openAi.beta.threads.runs.retrieve(threadId, runId);
    if (response.status === "completed") {
      isRunCompleted = true;
      const messages = await processThreadMessages(threadId);
      return messages;
    } else if (response.status === "requires_action") {
      if (!response.required_action) {
        isRunCompleted = true;
        return;
      }
      await call_required_function(
        response.required_action?.submit_tool_outputs.tool_calls,
        threadId,
        runId
      );
    }
  }
}

export async function retrieveThread(id: string) {
  const thread = await openAi.beta.threads.messages.list(id);

  return thread;
}

export async function processThreadMessages(threadId: string) {
  const response = await openAi.beta.threads.messages.list(threadId);

  const messages = response.data.map((data) => {
    return {
      role: data.role,
      content: (data.content[0] as MessageContentText).text.value,
    };
  });

  return messages;
}
