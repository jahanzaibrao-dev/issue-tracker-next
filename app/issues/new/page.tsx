"use client";
import { Button, Card, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <Card className="shadow-lg p-5 max-w-xl justify-self-center">
      <div className="space-y-5">
        <TextField.Root>
          <TextField.Input placeholder="Title of the issue"></TextField.Input>
        </TextField.Root>

        <TextArea placeholder="Describe the issue here..." />
        <Button size="3">Submit</Button>
      </div>
    </Card>
  );
};

export default NewIssuePage;
