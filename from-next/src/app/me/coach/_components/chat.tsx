"use client";

import { useChat, type Message } from "ai/react";
import type { Database } from "../../../../lib/types/database.types";

import { ChatInput } from "./chat-input";
import { Messages } from "./messages";

interface CoachChatProps {
  chatId: string;
  initialMessages: Message[];
  userGoal: Database["public"]["Tables"]["user_goals"]["Row"];
  latestHealthInfo: Database["public"]["Tables"]["health_info"]["Row"];
}

export function CoachChat({
  chatId,
  initialMessages,
  userGoal,
  latestHealthInfo,
}: CoachChatProps) {
  const { messages, input, setInput, handleSubmit, isLoading, setMessages } =
    useChat({
      id: chatId,
      body: { id: chatId },
      api: "/api/coach/chat",
      initialMessages: initialMessages,
    });

  return (
    <main className="relative flex h-full w-full flex-col items-center">
      <div className="my-4 flex flex-1 flex-col overflow-y-auto">
        <Messages messages={messages} chatId={chatId} />
      </div>

      <ChatInput
        messages={messages}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        chatId={chatId}
        isLoading={isLoading}
        setMessages={setMessages}
        userGoal={userGoal}
        latestHealthInfo={latestHealthInfo}
      />
    </main>
  );
}
