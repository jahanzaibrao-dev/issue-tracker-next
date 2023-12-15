"use client";
import { Button, Card, TextField } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import { getChatThread } from "../services/asisstant";
import { askChatGPT } from "../services/auth";
import { IoMdSend } from "react-icons/io";
import MessageCard from "./MessageCard";
import { gptMessageValidation } from "../validations";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ErrorCallout from "../components/ErrorCallout";

interface assistantThread {
  role: string;
  content: string;
}

export type ChatAssistantForm = z.infer<typeof gptMessageValidation>;

const ChatBox = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<assistantThread[]>([]);
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<ChatAssistantForm>({
    resolver: zodResolver(gptMessageValidation),
  });

  useEffect(() => {
    getThread();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 2000);
    }
  }, [error]);

  const getThread = async () => {
    setLoader(true);
    const response = await getChatThread();
    setMessages(response.data.reverse());
    if (ref.current) {
      const offsetBottom = ref.current.offsetTop + ref.current.offsetHeight;
      window.scrollTo({ top: offsetBottom });
    }
    setLoader(false);
  };

  const askGPT = async (data: ChatAssistantForm) => {
    setLoader(true);
    try {
      resetField("message");
      const response = await askChatGPT(data.message);
      setMessages(response.data.response?.reverse());
      if (ref.current) {
        const offsetBottom = ref.current.offsetTop + ref.current.offsetHeight;
        window.scrollTo({ top: offsetBottom });
      }
      setLoader(false);
    } catch (err: any) {
      console.log(err);
      const errMessage = err.response.data.message;
      setLoader(false);
      setError(errMessage);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        ref={ref}
        className="mt-14 space-y-3 p-5 overflow-y-scroll h-full max-w-3xl m-auto mb-16"
      >
        {messages.length > 0 &&
          messages.map((message) => (
            <MessageCard
              role={message.role === "user" ? "You: " : "TrackMate: "}
              message={message.content}
            />
          ))}
        <div className="fixed w-5/12 justify-center bg-white bottom-8 z-20">
          {error && <ErrorCallout error={error} />}
          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => askGPT(data))}
          >
            <TextField.Root>
              <TextField.Input
                size="3"
                placeholder="Hi there, How may i help you?"
                radius="medium"
                {...register("message")}
              />
              <TextField.Slot>
                <Button>
                  <IoMdSend />
                </Button>
              </TextField.Slot>
            </TextField.Root>
            {errors.message && (
              <ErrorMessage>{errors.message.message}</ErrorMessage>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
