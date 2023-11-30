import { NextRequest, NextResponse } from "next/server";
import { IssueController } from "../controller";
import { IssueIdValidation, editIssueValidation } from "@/app/validations";

const controller = new IssueController();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    return NextResponse.json({ id: params.id }, { status: 200 });
  } catch (e) {
    NextResponse.json(e, { status: 403 });
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
    NextResponse.json(e, { status: 403 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const idValidation = IssueIdValidation.safeParse({ id });
    if (!idValidation.success)
      return NextResponse.json(idValidation.error.errors, { status: 400 });

    const body = await req.json();
    const validation = editIssueValidation.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const response = await controller.updateIssue(id, body);
    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    NextResponse.json(e, { status: 403 });
  }
}
