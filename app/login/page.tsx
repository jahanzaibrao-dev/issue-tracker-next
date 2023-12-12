import { Card, Heading } from "@radix-ui/themes";
import React from "react";
import LoginForm from "./form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return (
    <Card className="shadow-lg space-y-5 p-5 max-w-lg m-auto">
      <Heading color="purple" className="mb-11" align="center" size="8">
        Login
      </Heading>
      <LoginForm />
    </Card>
  );
};

export default LoginPage;
