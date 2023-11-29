import { NextRequest, NextResponse } from "next/server";
import { IssueController } from "../controller";
import { IssueIdValidation } from "@/app/validations";

const controller = new IssueController();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    return NextResponse.json({ id: params.id }, { status: 200 });
  } catch (e) {
    NextResponse.error();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const validation = IssueIdValidation.safeParse({ id });
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    const response = await controller.deleteIssue(id);
    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    NextResponse.error();
  }
}
