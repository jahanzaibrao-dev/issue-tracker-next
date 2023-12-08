import OpenAI from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/index.mjs";

const openai = new OpenAI();

const tools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_x_type_of_issues",
      description: "Get Issues with status of type x",
      parameters: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description:
              "The current status of an issue which can be of four types i.e. all, Open, In_Progress and Resolved. If user doesn't provide any of these ask for clarification",
          },
        },
        required: ["status"],
      },
    },
  },
];

export async function DemoChat(message: string) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "Don't make assumptions about what values to plug into functions and functions arguments. Ask for clarification if a user request is ambiguous or no argument argument is provided which is required.",
    },
  ];

  messages.push({ role: "user", content: message });
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
    tools: tools,
  });

  return completion.choices[0].message;
}
