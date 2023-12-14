import { Card } from "@radix-ui/themes";
import React from "react";
import ChatBox from "./ChatBox";

const AssistantPage = () => {
  return (
    <Card className="shadow-lg space-y-5 p-5 max-w-lg m-auto">
      <ChatBox />
    </Card>
  );
};

export default AssistantPage;
