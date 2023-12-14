import { NextRequest, NextResponse } from "next/server";
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
    return NextResponse.json(e, { status: 403 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json("UnAuthorized", { status: 401 });
  }
  try {
    const response = await controller.retrieveUserThread(session);

    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 403 });
  }
}
