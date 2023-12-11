"use client";
import React, { useEffect, useState } from "react";
import { Button, Callout, Card, TextField } from "@radix-ui/themes";
import { registerUserValidation } from "../validations";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { registerUser } from "../services/auth";
import { useRouter } from "next/navigation";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ErrorCallout from "../components/ErrorCallout";

export type RegisterUserForm = z.infer<typeof registerUserValidation>;

const RegisterForm = () => {
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserValidation),
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 2000);
    }
  }, [error]);

  const submitRegister = async (data: RegisterUserForm) => {
    setLoader(true);
    try {
      const response = await registerUser(data);
      setLoader(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signed Up Successfully!",
        showConfirmButton: true,
        confirmButtonText: "Login",
        confirmButtonColor: "purple",
      }).then((result) => {
        router.push("/login");
      });
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

      {error && <ErrorCallout error={error} />}

      <form
        className="space-y-5"
        onSubmit={handleSubmit((data) => submitRegister(data))}
      >
        <div>
          <label>Name:</label>
          <TextField.Root>
            <TextField.Input
              size="3"
              placeholder="John Snow"
              {...register("name")}
            ></TextField.Input>
          </TextField.Root>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div>
          <label>Email:</label>
          <TextField.Root>
            <TextField.Input
              size="3"
              placeholder="johnsnow@gmail.com"
              {...register("email")}
            ></TextField.Input>
          </TextField.Root>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
        <Button size="3">Register</Button>
      </form>
    </>
  );
};

export default RegisterForm;
