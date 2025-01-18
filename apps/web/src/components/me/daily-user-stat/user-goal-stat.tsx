import * as React from "react";
import { Medal } from "lucide-react";

import { cn } from "@/lib/utils";
import type { UserGoal } from "@/lib/queries";
import { AddGoalDialog } from "@/components/goal/add-goal-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserGoalStatProps {
  userGoal: UserGoal;
  forChat?: boolean;
  className?: string;
}

export function UserGoalStat({
  userGoal,
  forChat,
  className,
}: UserGoalStatProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const userGoalFreshness = goalFullness({ userGoal });
  // conditionally render button
  let ConditionalIcon;
  let conditionalMessage;

  if (userGoalFreshness === "high") {
    ConditionalIcon = (
      <Medal size={20} className={cn("text-yellow-500", className)} />
    );
    conditionalMessage =
      "목표를 자세히 작성하였어요. 최적화된 조언을 받을 수 있어요!";
  } else if (userGoalFreshness === "mid") {
    ConditionalIcon = (
      <Medal size={20} className={cn("text-gray-500", className)} />
    );
    conditionalMessage =
      "목표를 좀 더 자세히 작성하면 최적화된 조언을 받을 수 있어요!";
  } else {
    ConditionalIcon = (
      <Medal size={20} className={cn("text-[#655e54ed]", className)} />
    );
    conditionalMessage = "목표를 작성해보세요. 최적화된 조언을 받을 수 있어요!";
  }

  if (forChat) {
    return (
      <>
        <div
          className={cn(
            "flex items-start gap-2 rounded-md border border-border p-2",
          )}
          onClick={() => setIsOpen(true)}
        >
          <div className="pt-1">{ConditionalIcon}</div>
          <div className="w-full max-w-[200px]"> {conditionalMessage}</div>
        </div>

        <AddGoalDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    );
  }

  return (
    <>
      <Tooltip delayDuration={0} disableHoverableContent={true}>
        <TooltipTrigger onClick={() => setIsOpen(true)}>
          {ConditionalIcon}
        </TooltipTrigger>
        <TooltipContent className="bg-muted-foreground text-sm">
          {conditionalMessage}
        </TooltipContent>
      </Tooltip>

      <AddGoalDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
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
