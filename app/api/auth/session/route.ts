import { NextRequest, NextResponse } from "next/server";
import { AuthController } from "../controller";

const controller = new AuthController();

export async function GET(req: NextRequest) {
  const response = await controller.getSession();
  if (!response) {
    NextResponse.json("UnAuthorized", { status: 401 });
  }
  return NextResponse.json(response, { status: 200 });
}
