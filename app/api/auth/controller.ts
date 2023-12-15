import { getServerSession } from "next-auth";
import { RegisterUserPayload } from "./types";
import prisma from "@/prisma/client";
import { hash } from "bcrypt";

export class AuthController {
  getSession = async () => {
    const session = await getServerSession();

    return session;
  };

  registerUser = async ({ email, password, name }: RegisterUserPayload) => {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw {
        message: "User already Exists",
      };
    }
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return { message: "Signed up Successfully" };
  };
}
