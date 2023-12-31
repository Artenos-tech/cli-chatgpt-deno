#!/usr/bin/env -S deno run --allow-env --allow-net="api.openai.com"

import { OpenAI } from "https://deno.land/x/openai@v4.16.1/mod.ts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"), // Ensure you have set OPENAI_API_KEY in your environment variables
});


function truncateMessageHistory(messageHistory: Message[], charLimit = 1000): Message[] {
  const newMessageHistory: Message[] = [];
  let totalChars = 0;

  for (const message of [...messageHistory].reverse()) {
    totalChars += message.content.length;
    if (totalChars > charLimit) {
      break;
    }
    newMessageHistory.unshift(message); // unshift adds an element to the beginning of the array
  }

  return newMessageHistory;
}

async function* streamChat(prompt: string, prevConversation: Message[]): AsyncGenerator<string> {
  prevConversation = truncateMessageHistory(prevConversation, 10000);
  const chatStream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      ...prevConversation,
      { role: "user", content: prompt },
    ],
    stream: true,
  })
  for await (const message of chatStream) {
    if (message.choices[0].finish_reason !== null) {
      break;
    }
    yield message.choices[0].delta?.content || "";
  }
}

function printWithoutNewline(message: string) {
  Deno.stdout.writeSync(new TextEncoder().encode(message));
}

async function main() {
  console.log("This is a simple GPT-powered chat interface.");
  console.log("Starting a chat with GPT.");
  console.log("Type 'quit' to end the conversation.")
  console.log("You can also type 'restart' to start a new conversation.")

  let messageHistory: Message[] = [];

  while (true) {
    const userPrompt = prompt("\n\nYou:");
    if (!userPrompt) {
      continue
    } else if (userPrompt.toLowerCase() === "quit") {
      console.log("Exiting the chat interface.");
      break;
    } else if (userPrompt.toLowerCase() === "restart") {
      messageHistory = []
      console.log("Restarting the conversation.");
    }
    else {
      let botMessage = "";
      printWithoutNewline("\nChatGPT: ")
      for await (const msgChunk of streamChat(userPrompt, messageHistory)) {
        printWithoutNewline(msgChunk)
        botMessage += msgChunk;
      }
      printWithoutNewline("\n")
      messageHistory.push({ role: "user", content: userPrompt! });
      messageHistory.push({ role: "assistant", content: botMessage });
    }
  }
}

if (import.meta.main) {
  await main();
}
