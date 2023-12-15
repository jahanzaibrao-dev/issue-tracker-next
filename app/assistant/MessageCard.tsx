import { Card, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import React from "react";

interface Props {
  role: string;
  message: string;
}

const MessageCard = ({ role, message }: Props) => {
  return (
    <>
      <Heading size="2">{role}</Heading>
      <Card>
        <ReactMarkdown
          className="text-gray-600 pl-8"
          remarkPlugins={[remarkBreaks, remarkGfm]}
        >
          {message}
        </ReactMarkdown>
      </Card>
    </>
  );
};

export default MessageCard;
