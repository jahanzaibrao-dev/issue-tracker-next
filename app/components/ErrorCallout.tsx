import { Callout } from "@radix-ui/themes";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface Props {
  error: string;
}

const ErrorCallout = ({ error }: Props) => {
  return (
    <Callout.Root className="mb-3">
      <Callout.Icon>
        <AiOutlineInfoCircle color="red" />
      </Callout.Icon>
      <Callout.Text color="red">{error}</Callout.Text>
    </Callout.Root>
  );
};

export default ErrorCallout;
