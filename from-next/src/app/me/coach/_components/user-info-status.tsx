"use client";

import * as React from "react";
import { CircleAlert, CircleCheck, CircleMinus, Smile } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";
import { Button } from "../../../../components/ui/button";
import type { Database } from "../../../../lib/types/database.types";

interface UserInfoStatusButtonProps {
  userGoal: Database["public"]["Tables"]["user_goals"]["Row"];
  latestHealthInfo: Database["public"]["Tables"]["health_info"]["Row"];
}

export function UserInfoStatusButton({
  userGoal,
  latestHealthInfo,
}: UserInfoStatusButtonProps) {
  // health info check
  const healthInfoDate = latestHealthInfo.measured_date; // utc date which postgres stores
  let healthInfoFreshness: "outdated" | "moderate" | "fresh" = "outdated";

  const healthInfoDateUTC = new Date(healthInfoDate).getTime();
  const currentUTCDateTime = new Date().getTime();

  if (healthInfoDateUTC < currentUTCDateTime - 1000 * 60 * 60 * 24 * 14) {
    // older than 2 weeks
    healthInfoFreshness = "outdated";
  } else if (
    // between 2 weeks and 1 week
    healthInfoDateUTC <=
    currentUTCDateTime - 1000 * 60 * 60 * 24 * 7
  ) {
    healthInfoFreshness = "moderate";
  } else {
    // less than 1 week
    healthInfoFreshness = "fresh";
  }

  // user goal check
  const isUserGoalDataSufficient = userGoal.weight && userGoal.height;
  const isUserGoalDataPerfect =
    isUserGoalDataSufficient &&
    userGoal.pledge &&
    userGoal.body_fat_mass &&
    userGoal.skeletal_muscle_mass;

  // conditionally render button
  let ConditionalIcon;
  let conditionalTooltipMessage;

  if (healthInfoFreshness === "fresh") {
    if (isUserGoalDataPerfect) {
      ConditionalIcon = <Smile size={14} className="text-green-500" />;
      conditionalTooltipMessage = "최적화된 조언을 받을 수 있어요";
    } else {
      ConditionalIcon = <CircleCheck size={14} className="text-green-500" />;
      conditionalTooltipMessage =
        "건강정보가 1주내에 수정되었어요. 더 최적화된 조언을 원한다면 목표를 더 자세히 설정해보세요F";
    }
  } else if (healthInfoFreshness === "moderate") {
    ConditionalIcon = <CircleMinus size={14} className="text-yellow-500" />;
    conditionalTooltipMessage =
      "건강정보를 수정해보세요. 최적화된 조언을 받을 수 있어요.";
  } else {
    ConditionalIcon = <CircleAlert size={14} className="text-red-500" />;
    conditionalTooltipMessage =
      "내 건강정보를 수정한지 2주가 지났어요. 건강정보를 수정해주세요. 최적화된 조언을 받을 수 있어요.";
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="h-fit rounded-full border p-1.5 dark:border-zinc-600">
          {ConditionalIcon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{conditionalTooltipMessage}</TooltipContent>
    </Tooltip>
  );
}
