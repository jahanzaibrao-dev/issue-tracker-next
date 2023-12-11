import React from "react";

import { Card, Heading } from "@radix-ui/themes";
import RegisterForm from "./form";

const RegisterPage = () => {
  return (
    <Card className="shadow-lg space-y-5 p-5 max-w-lg m-auto">
      <Heading color="purple" className="mb-11" align="center" size="8">
        Sign Up
      </Heading>
      <RegisterForm />
    </Card>
  );
};

export default RegisterPage;
