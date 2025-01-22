import { ExternalLink, Medal } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import type { UserGoal } from "@/lib/queries";

interface UserGoalStatProps {
  userGoal: UserGoal;
  className?: string;
}

export function UserGoalStat({ userGoal, className }: UserGoalStatProps) {
  const userGoalFreshness = goalFullness({ userGoal });
  // conditionally render button
  let ConditionalIcon;
  let conditionalMessage;

  if (userGoalFreshness === "high") {
    ConditionalIcon = (
      <Medal size={18} className={cn("text-yellow-500", className)} />
    );
    conditionalMessage =
      "목표를 자세히 작성하였어요. 최적화된 조언을 받을 수 있어요!";
  } else if (userGoalFreshness === "mid") {
    ConditionalIcon = (
      <Medal size={18} className={cn("text-gray-500", className)} />
    );
    conditionalMessage =
      "목표를 좀 더 자세히 작성하면 최적화된 조언을 받을 수 있어요!";
  } else {
    ConditionalIcon = (
      <Medal size={18} className={cn("text-[#655e54ed]", className)} />
    );
    conditionalMessage = "목표를 작성해보세요. 최적화된 조언을 받을 수 있어요!";
  }

  return (
    <div className="flex items-start gap-2">
      <Link to="/goal" preload={false}>
        <button className="relative rounded-md border border-border p-1 transition-colors hover:bg-muted">
          <ExternalLink
            className="absolute -right-[3px] -top-[3px] -z-10 text-border"
            size={12}
          />
          {ConditionalIcon}
        </button>
      </Link>

      <span className="text-base">{conditionalMessage}</span>
    </div>
  );
}

interface UserGoalFreshnessProps {
  userGoal: UserGoal;
}

function goalFullness({
  userGoal,
}: UserGoalFreshnessProps): "high" | "mid" | "low" {
  const isUserGoalDataSufficient = userGoal.weightKg;

  const isUserGoalDataPerfect =
    isUserGoalDataSufficient &&
    userGoal.bodyFatMassKg &&
    userGoal.skeletalMuscleMassKg;

  if (isUserGoalDataPerfect) {
    return "high";
  } else if (isUserGoalDataSufficient) {
    return "mid";
  } else {
    return "low";
  }
}
