"use client";

import * as React from "react";
import { ArrowUpIcon, StopCircle } from "lucide-react";
import { useChat } from "ai/react";
import { Message, type ChatRequestOptions } from "ai";
import { toast } from "sonner";
import type { Database } from "../../../../lib/types/database.types";

import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { UserInfoStatusButton } from "./user-info-status";

interface ChatInputProps extends Partial<ReturnType<typeof useChat>> {
  chatId?: string;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  messages: Message[];
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[]),
  ) => void;

  userGoal: Database["public"]["Tables"]["user_goals"]["Row"];
  latestHealthInfo: Database["public"]["Tables"]["health_info"]["Row"];
}

export function ChatInput({
  messages,
  input,
  setInput,
  handleSubmit,
  isLoading,
  chatId,
  setMessages,
  userGoal,
  latestHealthInfo,
}: ChatInputProps) {
  function submitForm() {
    window.history.replaceState(null, "", `/me/coach/${chatId}`);
    handleSubmit();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-xl bg-muted px-2 py-2">
      <Textarea
        id="main-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="안녕하세요"
        className="max-h-[calc(75dvh)] min-h-[80px] resize-none border-0 !text-base focus:ring-0 focus-visible:ring-0"
        rows={1}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else {
              submitForm();
            }
          }
        }}
      />

      <div className="relative flex items-center gap-2 self-end">
        <UserInfoStatusButton
          userGoal={userGoal}
          latestHealthInfo={latestHealthInfo}
        />

        {isLoading ? (
          <StopButton stop={stop} setMessages={setMessages} />
        ) : (
          <SendButton input={input} submitForm={submitForm} />
        )}
      </div>
    </div>
  );
}
function PureStopButton({
  stop,
  setMessages,
}: {
  stop: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Array<Message>>>;
}) {
  return (
    <Button
      className="h-fit rounded-full border p-1.5 dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages((messages) => messages);
      }}
    >
      <StopCircle size={14} />
    </Button>
  );
}

const StopButton = React.memo(PureStopButton);

function PureSendButton({
  submitForm,
  input,
}: {
  submitForm: () => void;
  input: string;
}) {
  return (
    <Button
      className="h-fit rounded-full border p-1.5 dark:border-zinc-600"
      onClick={(event) => {
        event.preventDefault();
        submitForm();
      }}
      disabled={input.length === 0}
    >
      <ArrowUpIcon size={14} />
    </Button>
  );
}

const SendButton = React.memo(PureSendButton, (prevProps, nextProps) => {
  // if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length)
  //   return false;
  if (!prevProps.input !== !nextProps.input) return false;
  return true;
});
