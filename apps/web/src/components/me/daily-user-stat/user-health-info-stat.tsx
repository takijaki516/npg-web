import { CircleAlert, CircleMinus, Smile, Frown } from "lucide-react";
import { DateTime } from "luxon";

import type { HealthInfo, Profile } from "@/lib/queries";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserHealthInfoStatProps {
  healthInfo?: HealthInfo | null | undefined;
  profile: Profile;
}

// TODO:
export function UserHealthInfoStat({ healthInfo }: UserHealthInfoStatProps) {
  console.log(
    "🚀 ~ file: user-health-info-stat.tsx:17 ~ UserHealthInfoStat ~ healthInfo:",
    healthInfo,
  );

  if (!healthInfo) {
    return (
      <Tooltip delayDuration={0} disableHoverableContent={true}>
        <TooltipTrigger>
          <Frown size={22} className="animate-pulse text-red-500" />
        </TooltipTrigger>

        <TooltipContent className="bg-muted-foreground text-sm">
          "내 건강정보가 없어요. 건강정보를 입력해주세요."
        </TooltipContent>
      </Tooltip>
    );
  }

  let healthInfoFreshness: "outdated" | "moderate" | "fresh" = "outdated";

  const healthInfoDateUTC = DateTime.fromFormat(
    healthInfo.measuredData,
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
    conditionalTooltipMessage = "최적화된 조언을 받을 수 있어요";
  } else if (healthInfoFreshness === "moderate") {
    ConditionalIcon = <CircleMinus size={20} className="text-yellow-500" />;
    conditionalTooltipMessage =
      "건강정보를 수정해보세요. 최적화된 조언을 받을 수 있어요.";
  } else {
    ConditionalIcon = (
      <CircleAlert size={20} className="animate-pulse text-red-500" />
    );
    conditionalTooltipMessage =
      "내 건강정보를 수정한지 2주가 지났어요. 건강정보를 수정해주세요. 최적화된 조언을 받을 수 있어요.";
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
