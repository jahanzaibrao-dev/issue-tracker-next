import React from "react";
import { editIssueValidation } from "../validations";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Badge,
  Button,
  Dialog,
  Flex,
  Select,
  TextField,
} from "@radix-ui/themes";
import ErrorMessage from "./ErrorMessage";
import dynamic from "next/dynamic";
import { getBadgeColor } from "./utils";
import { IssueStatus, editIssuePayload } from "../api/issues/types";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export type IssueEditForm = z.infer<typeof editIssueValidation>;

const EditIssueForm = ({
  item,
  onSubmit,
  setItemStatus,
}: {
  item: editIssuePayload;
  onSubmit: CallableFunction;
  setItemStatus: CallableFunction;
}) => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueEditForm>({
    resolver: zodResolver(editIssueValidation),
    values: {
      title: item.title,
      status: item.status,
      description: item.description,
    },
  });
  const statuses = ["Open", "In_Progress", "Resolved"];

  return (
    <form className="space-y-5">
      <Flex justify="between">
        <div>
          <TextField.Root>
            <TextField.Input
              size="3"
              placeholder="Title of the issue"
              {...register("title")}
            ></TextField.Input>
          </TextField.Root>
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>
        <Select.Root
          value={item.status}
          onValueChange={(value) => {
            console.log(value);
            setItemStatus(value);
            setValue("status", value as IssueStatus);
          }}
          size="3"
        >
          <Select.Trigger {...register("status")} />
          <Select.Content color="gray" variant="soft">
            <Select.Group>
              {statuses.map((status, index) => (
                <Select.Item key={index} value={status}>
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
          <SimpleMDE placeholder="Describe the issue here..." {...field} />
        )}
      />
      {errors.description && (
        <ErrorMessage>{errors.description.message}</ErrorMessage>
      )}
      <Button onClick={handleSubmit((data) => onSubmit(data))}>
        Save Changes
      </Button>
    </form>
  );
};

export default EditIssueForm;
