"use client";
import { Button, Card, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import React, { useState } from "react";

const NewIssuePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Card className="shadow-lg p-5 max-w-xl">
      <div className="space-y-5">
        <TextField.Root>
          <TextField.Input
            size="3"
            value={title}
            placeholder="Title of the issue"
          ></TextField.Input>
        </TextField.Root>
        <SimpleMDE
          value={description}
          placeholder="Describe the issue here..."
          onChange={(value) => setDescription(value)}
        />
        <Button size="3">Submit New Issue</Button>
      </div>
    </Card>
  );
};

export default NewIssuePage;
