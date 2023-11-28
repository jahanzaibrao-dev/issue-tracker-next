"use client";
import {
  Button,
  Callout,
  Card,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueValidation } from "@/app/validations";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueValidation>;

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

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 2000);
    }
  }, [error]);

  const submitIssue = async (data: IssueForm) => {
    try {
      const response = await axios.post("/api/issues", data);
      alert("issue submitted successfully");
    } catch (err: any) {
      const errMessage = err.response.data[0].message;
      setError(errMessage);
    }
  };

  return (
    <Card className="shadow-lg p-5 max-w-xl">
      {error && (
        <Callout.Root className="mb-3">
          <Callout.Icon>
            <AiOutlineInfoCircle color="red" />
          </Callout.Icon>
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
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
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe the issue here..." {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button size="3">Submit New Issue</Button>
      </form>
    </Card>
  );
};

export default NewIssuePage;
