import { Badge, Box, Card, Text } from "@radix-ui/themes";
import React from "react";

interface IssueCardItem {
  item: {
    title: string;
    id: number;
    description: string;
    status: "Open" | "In_Progress" | "Resolved";
    createdAt: String;
    updatedAt: string;
  };
}

const IssueCard = ({ item }: IssueCardItem) => {
  const getBadgeColor = (status: string) => {
    return status === "In_Progress"
      ? "orange"
      : status === "Resolved"
      ? "green"
      : "blue";
  };

  return (
    <Card className="shadow-lg hover:shadow-xl hover:cursor-pointer p-5 max-w-3xl m-auto">
      <Box className="space-y-3">
        <Text as="div" size="5" color="purple" weight="bold">
          {item.title}
        </Text>
        <Text as="div" size="3" color="gray">
          {item.description}
        </Text>
        <Badge size="2" color={getBadgeColor(item.status)}>
          {item.status}
        </Badge>
      </Box>
    </Card>
  );
};

export default IssueCard;
