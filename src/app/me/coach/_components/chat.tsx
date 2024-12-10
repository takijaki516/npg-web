import type { Database } from "@/lib/types/database.types";
import { ChatInput } from "./chat-input";
import { GoalPopup } from "./goal-popup";

interface CoachChatProps {
  userGoal: Database["public"]["Tables"]["user_goals"]["Row"];
}

export function CoachChat({ userGoal }: CoachChatProps) {
  return (
    <main className="relative flex h-full w-full flex-col items-center">
      <GoalPopup userGoal={userGoal} />
      <ChatInput />
    </main>
  );
}
