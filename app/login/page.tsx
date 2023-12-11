import { Card, Heading } from "@radix-ui/themes";
import React from "react";
import LoginForm from "./form";

const LoginPage = () => {
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
