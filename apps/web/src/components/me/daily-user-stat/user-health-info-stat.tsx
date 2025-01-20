import { CircleAlert, CircleMinus, Smile, Frown } from "lucide-react";
import { DateTime } from "luxon";

import type { HealthInfo } from "@/lib/queries";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserHealthInfoStatProps {
  healthInfo?: HealthInfo | null | undefined;
  className?: string;
}

export function UserHealthInfoStat({ healthInfo }: UserHealthInfoStatProps) {
  const userHealthInfoFreshness = healthInfoFreshness({ healthInfo });
  // conditionally render button
  let ConditionalIcon;
  let conditionalMessage;

  if (userHealthInfoFreshness === "fresh") {
    ConditionalIcon = <Smile size={20} className="text-green-500" />;
    conditionalMessage =
      "건강정보를 1주일 이내에 업데이트 하였어요. 최적화된 조언을 받을 수 있어요";
  } else if (userHealthInfoFreshness === "moderate") {
    ConditionalIcon = <CircleMinus size={20} className="text-yellow-500" />;
    conditionalMessage =
      "건강정보가 업데이트 된지 1주일이 지났어요. 건강정보를 수정해보세요. 최적화된 조언을 받을 수 있어요.";
  } else if (userHealthInfoFreshness === "outdated") {
    ConditionalIcon = (
      <CircleAlert size={20} className="animate-pulse text-red-500" />
    );
    conditionalMessage =
      "건강정보가 업데이트 된지 2주가 지났어요. 건강정보를 수정해주세요. 최적화된 조언을 받을 수 있어요.";
  } else {
    ConditionalIcon = (
      <Frown size={22} className="animate-pulse text-red-500" />
    );
    conditionalMessage = "내 건강정보가 없어요. 건강정보를 입력해주세요";
  }

  return (
    <Tooltip delayDuration={0} disableHoverableContent={true}>
      <TooltipTrigger>{ConditionalIcon}</TooltipTrigger>
      <TooltipContent className="bg-muted-foreground text-sm">
        {conditionalMessage}
      </TooltipContent>
    </Tooltip>
  );
}

interface UserHealthInfoFreshnessProps {
  healthInfo?: HealthInfo | null | undefined;
}

function healthInfoFreshness({
  healthInfo,
}: UserHealthInfoFreshnessProps): "outdated" | "moderate" | "fresh" | "none" {
  if (!healthInfo) {
    return "none";
  }

  const healthInfoDateUTC = DateTime.fromFormat(
    healthInfo.measuredDate,
    "yyyy-MM-dd HH:mm:ss",
    { zone: "utc" },
  ).toMillis();

  const currentUTCDateTime = DateTime.now().toUTC().toMillis();

  if (healthInfoDateUTC < currentUTCDateTime - 1000 * 60 * 60 * 24 * 14) {
    // older than 2 weeks
    return "outdated";
  } else if (
    // between 2 weeks and 1 week
    healthInfoDateUTC <=
    currentUTCDateTime - 1000 * 60 * 60 * 24 * 7
  ) {
    return "moderate";
  } else {
    // less than 1 week
    return "fresh";
  }
}
