import { Session } from "next-auth";
import { IssueController } from "../issues/controller";
import { IssueStatus } from "../issues/types";
import {
  addMessageToThread,
  createThread,
  processThreadMessages,
  retrieveThread,
  runAssistant,
  waitForRunCompletion,
} from "../utils/assistant";
import prisma from "@/prisma/client";

export class GptController {
  issueController = new IssueController();

  retrieveUserThread = async (session: Session) => {
    if (!session.user?.email) {
      throw {
        message: "Invalid Session",
      };
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user?.threadId) {
      return [];
    }

    const thread = await processThreadMessages(user.threadId);

    return thread;
  };

  askGpt = async (message: string, session: Session) => {
    if (!session.user?.email) {
      throw {
        message: "Invalid Session",
      };
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw {
        message: "User not found",
      };
    }

    if (!user.threadId) {
      const thread = await createThread();
      await prisma.user.update({
        where: { email: session.user.email },
        data: { threadId: thread.id },
      });
      user.threadId = thread.id;
    }

    await addMessageToThread(user.threadId, message);

    const run = await runAssistant(user.threadId);

    const response = await waitForRunCompletion(run.id, user.threadId);

    return {
      response,
    };
  };
}
