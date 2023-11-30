import React from "react";
import { editIssueValidation } from "../validations";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge, Button, Flex, Select, TextField } from "@radix-ui/themes";
import ErrorMessage from "./ErrorMessage";
import dynamic from "next/dynamic";
import { getBadgeColor } from "./utils";
import { editIssuePayload } from "../api/issues/types";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export type IssueEditForm = z.infer<typeof editIssueValidation>;

const EditIssueForm = ({ item }: { item: editIssuePayload }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueEditForm>({
    resolver: zodResolver(editIssueValidation),
  });
  const statuses = ["Open", "In_Progress", "Resolved"];

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((data) => console.log("data: ", data))}
    >
      <Flex gap="6" justify="start">
        <div>
          <TextField.Root>
            <TextField.Input
              size="3"
              placeholder="Title of the issue"
              value={item.title}
              {...register("title")}
            ></TextField.Input>
          </TextField.Root>
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>
        <Select.Root defaultValue={item.status} size="3">
          <Select.Trigger />
          <Select.Content color="gray" variant="soft">
            <Select.Group>
              {statuses.map((status) => (
                <Select.Item value={status}>
                  <Badge size="1" color={getBadgeColor(status)}>
                    {status}
                  </Badge>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE
            value={item.description}
            placeholder="Describe the issue here..."
          />
        )}
      />
      {errors.description && (
        <ErrorMessage>{errors.description.message}</ErrorMessage>
      )}
    </form>
  );
};

export default EditIssueForm;
