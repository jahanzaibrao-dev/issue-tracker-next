import { NextRequest, NextResponse } from "next/server";
import { AuthController } from "../controller";
import { registerUserValidation } from "@/app/validations";

const controller = new AuthController();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerUserValidation.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    const response = await controller.registerUser(body);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 403 });
  }
}
