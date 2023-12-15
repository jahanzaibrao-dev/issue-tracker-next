"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { loginValidation } from "../validations";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../components/Loader";
import { Button, TextField } from "@radix-ui/themes";
import ErrorMessage from "../components/ErrorMessage";
import ErrorCallout from "../components/ErrorCallout";
import { signIn } from "next-auth/react";
import { Card, Heading } from "@radix-ui/themes";

export type LoginUserForm = z.infer<typeof loginValidation>;

const LoginForm = () => {
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserForm>({
    resolver: zodResolver(loginValidation),
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 2000);
    }
  }, [error]);
  const submitLogin = async (data: LoginUserForm) => {
    setLoader(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      setLoader(false);
      console.log(response);
      if (response?.error) {
        setError("Invalid Credentials");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      console.log(err);
      const errMessage = err.response.data.message;
      setLoader(false);
      setError(errMessage);
    }
  };
  return (
    <>
      {isLoading && <Loader />}

      <Card className="shadow-lg space-y-5 p-5 max-w-lg m-auto  mt-32">
        <Heading color="purple" className="mb-11" align="center" size="8">
          Login
        </Heading>

        {error && <ErrorCallout error={error} />}

        <form
          className="space-y-5"
          onSubmit={handleSubmit((data) => submitLogin(data))}
        >
          <div>
            <label>Email:</label>
            <TextField.Root>
              <TextField.Input
                size="3"
                placeholder="johnsnow@gmail.com"
                {...register("email")}
              ></TextField.Input>
            </TextField.Root>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div>
            <label>Password:</label>
            <TextField.Root>
              <TextField.Input
                size="3"
                placeholder=""
                {...register("password")}
                type="password"
              ></TextField.Input>
            </TextField.Root>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <Button size="3">Login</Button>
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
