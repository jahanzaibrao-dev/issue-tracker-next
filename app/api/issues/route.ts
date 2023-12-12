import { NextRequest, NextResponse } from "next/server";
import { createIssueValidation } from "../../validations";
import { IssueController } from "./controller";
import { getServerSession } from "next-auth";

const controller = new IssueController();

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    NextResponse.json("UnAuthorized", { status: 401 });
  }
  const body = await req.json();
  const validation = createIssueValidation.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  try {
    const response = await controller.createIssue(body);

    return NextResponse.json(response, { status: 201 });
  } catch (e) {
    NextResponse.error();
  }
}

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    NextResponse.json("UnAuthorized", { status: 401 });
  }
  try {
    const response = await controller.getAllIssues();

    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    NextResponse.error();
  }
}
