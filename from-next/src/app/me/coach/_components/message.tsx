"use client";

import { Bot, User2 } from "lucide-react";
import { type Message } from "ai/react";

import { cn } from "../../../../lib/utils";

interface MessageProps {
  message: Message;
}

export function Message({ message }: MessageProps) {
  const { content, id, role, toolInvocations } = message;

  const isUser = role === "user";

  const icon = isUser ? <User2 /> : <Bot />;

  return (
    <div
      className={cn(
        "flex flex-col",
        !isUser && "items-start",
        isUser && "items-end",
      )}
    >
      {icon}
      <p>{content}</p>
    </div>
  );
}

// <div>
//         {message.toolInvocations?.map((toolInvocation) => {
//           console.log(
//             "🚀 ~ file: chat-input.tsx:34 ~ {message.toolInvocations?.map ~ toolInvocation:",
//             toolInvocation,
//           );

//           const { toolName, toolCallId, state } = toolInvocation;

//           if (toolName === "gen_workout") {
//             if (state === "result") {
//               const { result } = toolInvocation;
//               // TODO: create a component for workout plan
//               return (
//                 <div key={toolCallId}>
//                   <div>운동 계획</div>
//                   {result.workout_plans.map((workoutPlan) => {
//                     return (
//                       <div key={workoutPlan.id}>{workoutPlan.name}</div>
//                     );
//                   })}
//                 </div>
//               );
//             } else {
//               return <div key={toolCallId}>loading...</div>;
//             }
//           }
//         })}
//       </div>
