import { PersonStanding, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { DateTime } from "luxon";

import type { HealthInfo } from "@/lib/queries";
import { useDateTimeStore } from "@/lib/zustand/time-store";

interface UserHealthInfoStatProps {
  healthInfo?: HealthInfo | null | undefined;
  className?: string;
}

export function UserHealthInfoStat({ healthInfo }: UserHealthInfoStatProps) {
  const currentDateTime = useDateTimeStore((state) => state.currentDateTime);
  const yearMonth = currentDateTime.split(" ")[0].slice(0, 7);

  const userHealthInfoFreshness = healthInfoFreshness({ healthInfo });
  // conditionally render button
  let ConditionalIcon;
  let conditionalMessage;

  if (userHealthInfoFreshness === "fresh") {
    ConditionalIcon = <PersonStanding size={20} className="text-green-500" />;
    conditionalMessage =
      "건강정보를 1주일 이내에 업데이트 하였어요. 최적화된 조언을 받을 수 있어요";
  } else if (userHealthInfoFreshness === "moderate") {
    ConditionalIcon = <PersonStanding size={20} className="text-yellow-500" />;
    conditionalMessage =
      "건강정보가 업데이트 된지 1주일이 지났어요. 건강정보를 수정해보세요. 최적화된 조언을 받을 수 있어요.";
  } else if (userHealthInfoFreshness === "outdated") {
    ConditionalIcon = <PersonStanding size={20} className="text-red-500" />;
    conditionalMessage =
      "건강정보가 업데이트 된지 2주가 지났어요. 건강정보를 수정해주세요. 최적화된 조언을 받을 수 있어요.";
  } else {
    ConditionalIcon = <PersonStanding size={20} className="text-red-500" />;
    conditionalMessage = "내 건강정보가 없어요. 건강정보를 입력해주세요";
  }

  return (
    <div className="flex items-start gap-2">
      <Link
        to={`/info/$yearmonth`}
        params={{ yearmonth: yearMonth }}
        preload={false}
      >
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
