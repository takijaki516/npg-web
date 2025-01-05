import { Medal } from "lucide-react";

import type { Profile, UserGoal } from "@/lib/queries";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserGoalStatProps {
  userGoal: UserGoal;
  profile: Profile;
}

export function UserGoalStat({ userGoal }: UserGoalStatProps) {
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
    conditionalTooltipMessage = "최적화된 조언을 받을 수 있어요";
  } else {
    ConditionalIcon = <Medal size={20} className="text-gray-500" />;
    conditionalTooltipMessage =
      "목표를 자세히 작성해보세요 최적화된 조언을 받을 수 있어요.";
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
