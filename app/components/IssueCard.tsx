import { Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DialogButton from "./DialogButton";
import EditIssueForm from "./EditIssueForm";
import { IssueStatus } from "../api/issues/types";
import { getBadgeColor } from "./utils";

interface IssueCardItem {
  item: {
    title: string;
    id: number;
    description: string;
    status: IssueStatus;
    createdAt: String;
    updatedAt: string;
  };
  onDeleteItem: CallableFunction;
}

const IssueCard = ({ item, onDeleteItem }: IssueCardItem) => {
  return (
    <Card className="shadow-lg hover:shadow-lg hover:shadow-purple-400 p-5 max-w-3xl m-auto">
      <Box className="space-y-3">
        <Flex justify="between">
          <Text as="div" size="5" color="purple" weight="bold">
            {item.title}
          </Text>
          <Badge size="2" color={getBadgeColor(item.status)}>
            {item.status}
          </Badge>
        </Flex>
        <ReactMarkdown
          className="text-gray-600"
          remarkPlugins={[remarkBreaks, remarkGfm]}
        >
          {item.description}
        </ReactMarkdown>
        <Flex justify="end" className="space-x-3">
          <DialogButton
            title="Edit Issue"
            description="Make changes you want"
            buttonContent={<FaEdit size={22} />}
            cancelButtonText="Cancel"
            confirmButtonText="Save Changes"
            onConfirm={() => console.log("save button clicked")}
            dialogMaxWidth={500}
          >
            <EditIssueForm item={item} />
          </DialogButton>
          <DialogButton
            title="Delete Issue"
            description="Are you sure that you want to delete This issue?"
            buttonContent={<MdDelete size={22} />}
            cancelButtonText="No"
            confirmButtonText="Yes"
            onConfirm={() => onDeleteItem(item.id)}
          />
        </Flex>
      </Box>
    </Card>
  );
};

export default IssueCard;
