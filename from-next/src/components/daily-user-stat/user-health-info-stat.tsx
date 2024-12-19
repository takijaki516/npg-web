"use client";

import * as React from "react";
import { CircleAlert, CircleMinus, Smile, Frown } from "lucide-react";
import { DateTime } from "luxon";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";
import type { Database } from "../../lib/types/database.types";

interface UserHealthInfoStatProps {
  healthInfo: Database["public"]["Tables"]["health_info"]["Row"] | null;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function UserHealthInfoStat({
  healthInfo,
  profile,
}: UserHealthInfoStatProps) {
  if (!healthInfo) {
    return (
      <Tooltip delayDuration={0} disableHoverableContent={true}>
        <TooltipTrigger>
          <Frown size={22} className="animate-pulse text-red-500" />
        </TooltipTrigger>

        <TooltipContent className="bg-muted-foreground text-sm">
          {profile.language === "ko"
            ? "내 건강정보가 없어요. 건강정보를 입력해주세요."
            : "Your health information is missing. Please enter your health information."}
        </TooltipContent>
      </Tooltip>
    );
  }

  let healthInfoFreshness: "outdated" | "moderate" | "fresh" = "outdated";

  const healthInfoDateUTC = DateTime.fromFormat(
    healthInfo.measured_date,
    "yyyy-MM-dd",
    { zone: "utc" },
  ).toMillis();

  const currentUTCDateTime = DateTime.now().toUTC().toMillis();

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

  // conditionally render button
  let ConditionalIcon;
  let conditionalTooltipMessage;

  if (healthInfoFreshness === "fresh") {
    ConditionalIcon = <Smile size={20} className="text-green-500" />;
    conditionalTooltipMessage =
      profile.language === "ko"
        ? "최적화된 조언을 받을 수 있어요"
        : "You can get optimized advice.";
  } else if (healthInfoFreshness === "moderate") {
    ConditionalIcon = <CircleMinus size={20} className="text-yellow-500" />;
    conditionalTooltipMessage =
      profile.language === "ko"
        ? "건강정보를 수정해보세요. 최적화된 조언을 받을 수 있어요."
        : "Please update your health information. You can get optimized advice.";
  } else {
    ConditionalIcon = (
      <CircleAlert size={20} className="animate-pulse text-red-500" />
    );
    conditionalTooltipMessage =
      profile.language === "ko"
        ? "내 건강정보를 수정한지 2주가 지났어요. 건강정보를 수정해주세요. 최적화된 조언을 받을 수 있어요."
        : "Your health information has been updated more than 2 weeks ago. Please update your health information. You can get optimized advice.";
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
