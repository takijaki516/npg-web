"use client";

import * as React from "react";
import { useChat } from "ai/react";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ChatInput() {
  const { messages, input, setInput, handleSubmit } = useChat({
    api: "/api/coach/chat",
  });

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-background">
      {messages.map((message) => {
        // data that LLM is based on
        if (message.role === "system") {
        }

        return (
          <div key={message.id}>
            <div>{message.role}</div>
            <div>{message.content}</div>

            <div>
              {message.toolInvocations?.map((toolInvocation) => {
                console.log(
                  "🚀 ~ file: chat-input.tsx:34 ~ {message.toolInvocations?.map ~ toolInvocation:",
                  toolInvocation,
                );

                const { toolName, toolCallId, state } = toolInvocation;

                if (toolName === "gen_workout") {
                  if (state === "result") {
                    const { result } = toolInvocation;
                    // TODO: create a component for workout plan
                    return (
                      <div key={toolCallId}>
                        <div>운동 계획</div>
                        {result.workout_plans.map((workoutPlan) => {
                          return (
                            <div key={workoutPlan.id}>{workoutPlan.name}</div>
                          );
                        })}
                      </div>
                    );
                  } else {
                    return <div key={toolCallId}>loading...</div>;
                  }
                }
              })}
            </div>
          </div>
        );
      })}

      <div className="flex flex-col">
        <div
          id="sub-input"
          className="mx-4 flex items-center gap-4 rounded-t-xl border border-b-0 px-4 py-[2px]"
        >
          <button className="rounded-md px-2 hover:bg-muted">
            <span>운동 루틴 생성</span>
          </button>
        </div>

        <form
          id="main-input"
          className="flex items-end gap-4 rounded-lg border p-4"
          onSubmit={handleSubmit}
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="안녕하세요"
            className="resize-none"
            rows={1}
          />

          <Button type="submit" size="icon" disabled={!input.trim()}>
            <SendHorizontal className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
