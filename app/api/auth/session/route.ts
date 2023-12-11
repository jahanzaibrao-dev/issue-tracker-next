import { NextRequest, NextResponse } from "next/server";
import { AuthController } from "../controller";

const controller = new AuthController();

export async function GET(req: NextRequest) {
  const response = await controller.getSession();
  return NextResponse.json(response, { status: 200 });
}
