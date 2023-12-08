import { NextRequest, NextResponse } from "next/server";
import { createIssueValidation } from "../../validations";
import { GptController } from "./controller";

const controller = new GptController();

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const response = await controller.askGpt(body.message);

    return NextResponse.json(response, { status: 201 });
  } catch (e) {
    NextResponse.error();
  }
}
