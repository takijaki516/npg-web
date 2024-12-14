"use client";

import { type Message } from "ai";
import { useChat } from "ai/react";
import { Message as MessageComponent } from "./message";

interface MessagesProps extends Partial<ReturnType<typeof useChat>> {
  chatId?: string;
  messages: Message[];
}

export function Messages({ messages }: MessagesProps) {
  if (messages?.length === 0) {
    return <div>한번 시도해 보세요</div>;
  }

  return (
    <div>
      {messages.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}
