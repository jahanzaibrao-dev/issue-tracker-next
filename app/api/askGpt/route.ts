import { NextRequest, NextResponse } from "next/server";
import { createIssueValidation } from "../../validations";
import { GptController } from "./controller";
import { getServerSession } from "next-auth";

const controller = new GptController();

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json("UnAuthorized", { status: 401 });
  }
  const body = await req.json();
  try {
    const response = await controller.askGpt(body.message, session);

    return NextResponse.json(response, { status: 201 });
  } catch (e) {
    NextResponse.error();
  }
}
