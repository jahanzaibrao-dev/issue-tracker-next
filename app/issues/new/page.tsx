"use client";
import { Button, Callout, Card, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueValidation } from "@/app/validations";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";
import { createIssue } from "@/app/services/issue";
import dynamic from "next/dynamic";
import ErrorCallout from "@/app/components/ErrorCallout";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export type IssueForm = z.infer<typeof createIssueValidation>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueValidation),
  });
  const [error, setError] = useState("");
  const [isLoading, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 2000);
    }
  }, [error]);

  const submitIssue = async (data: IssueForm) => {
    setLoader(true);
    try {
      const response = await createIssue(data);
      setLoader(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Issue added Successfully!",
        showConfirmButton: true,
        confirmButtonText: "Go to Issues",
        confirmButtonColor: "purple",
      }).then((result) => {
        router.push("/issues");
      });
    } catch (err: any) {
      const errMessage = err.response.data[0].message;
      setLoader(false);
      setError(errMessage);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Card className="shadow-lg p-5 max-w-xl m-auto">
        {error && <ErrorCallout error={error} />}
        <form
          className="space-y-5"
          onSubmit={handleSubmit((data) => submitIssue(data))}
        >
          <TextField.Root>
            <TextField.Input
              size="3"
              placeholder="Title of the issue"
              {...register("title")}
            ></TextField.Input>
          </TextField.Root>
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Describe the issue here..." {...field} />
            )}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
          <Button size="3">Submit New Issue</Button>
        </form>
      </Card>
    </div>
  );
};

export default NewIssuePage;
