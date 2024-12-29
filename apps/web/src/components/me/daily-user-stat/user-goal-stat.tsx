import { Medal } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Profile, UserGoal } from "@/lib/queries";

interface UserGoalStatProps {
  userGoal: UserGoal;
  profile: Profile;
}

export function UserGoalStat({ userGoal, profile }: UserGoalStatProps) {
  const isUserGoalDataSufficient = userGoal.weightKg;

  const isUserGoalDataPerfect =
    isUserGoalDataSufficient &&
    userGoal.goalDescription &&
    userGoal.bodyFatMassKg &&
    userGoal.skeletalMuscleMassKg;

  // conditionally render button
  let ConditionalIcon;
  let conditionalTooltipMessage;

  if (isUserGoalDataPerfect) {
    ConditionalIcon = <Medal size={20} className="text-yellow-500" />;
    conditionalTooltipMessage =
      profile.language === "ko"
        ? "최적화된 조언을 받을 수 있어요"
        : "You can get optimized advice.";
  } else {
    ConditionalIcon = <Medal size={20} className="text-gray-500" />;
    conditionalTooltipMessage =
      profile.language === "ko"
        ? "목표를 자세히 작성해보세요 최적화된 조언을 받을 수 있어요."
        : "Please write your goal in detail. You can get optimized advice.";
  }

  return (
    <Tooltip delayDuration={0} disableHoverableContent={true}>
      <TooltipTrigger>{ConditionalIcon}</TooltipTrigger>
      <TooltipContent className="bg-muted-foreground text-sm">
        {conditionalTooltipMessage}
      </TooltipContent>
    </Tooltip>
  );
}
