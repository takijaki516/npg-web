import type { Database } from "@/lib/types/database.types";

interface GoalPopupProps {
  userGoal: Database["public"]["Tables"]["user_goals"]["Row"];
}

export function GoalPopup({ userGoal }: GoalPopupProps) {
  return (
    <div>
      <div>{userGoal.pledge}</div>
    </div>
  );
}
