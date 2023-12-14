"use client";
import { Button, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { getChatThread } from "../services/asisstant";
import { askChatGPT } from "../services/auth";
import { IoMdSend } from "react-icons/io";

const ChatBox = () => {
  const [userMessage, setUserMessage] = useState("");

  const getThread = async () => {
    const response = await getChatThread();
    console.log(response);
  };

  useEffect(() => {
    getThread();
  }, []);

  const askGPT = async () => {
    const response = await askChatGPT(userMessage);

    console.log(response);
  };

  return (
    <div className="space-y-3">
      <TextField.Root>
        <TextField.Input
          className="w-3/4"
          size="3"
          placeholder="Hi there, How may i help you?"
          value={userMessage}
          onChange={(text) => setUserMessage(text.target.value)}
        />
      </TextField.Root>
      <Button onClick={askGPT}>
        Send
        <IoMdSend />
      </Button>
    </div>
  );
};

export default ChatBox;
