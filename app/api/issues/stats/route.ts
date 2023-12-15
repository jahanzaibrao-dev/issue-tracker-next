import { NextResponse } from "next/server";
import { IssueController } from "../controller";
import { getServerSession } from "next-auth";

const controller = new IssueController();

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    NextResponse.json("UnAuthorized", { status: 401 });
  }
  try {
    const response = await controller.getStats();

    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    NextResponse.error();
  }
}
