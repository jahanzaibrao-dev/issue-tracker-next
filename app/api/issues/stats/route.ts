import { NextResponse } from "next/server";
import { IssueController } from "../controller";

const controller = new IssueController();

export async function GET() {
  try {
    const response = await controller.getStats();

    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    NextResponse.error();
  }
}
