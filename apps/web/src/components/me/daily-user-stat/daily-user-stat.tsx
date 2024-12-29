import * as React from "react";
import { DateTime } from "luxon";
import { useSuspenseQuery, useSuspenseQueries } from "@tanstack/react-query";

import { DailyIntake } from "./daily-intake";
import {
  getLatestHealthInfo,
  getOrCreateDailyIntake,
  getOrCreateGoal,
  getProfileOptions,
} from "@/lib/queries";
import { convertToRangeOfDayUTCTime } from "@/lib/utils";

export function DailyUserStat() {
  const { data: profile } = useSuspenseQuery(getProfileOptions);

  const currentLocalDateTime = DateTime.now()
    .setZone(profile.timezone)
    .toFormat("yyyy-MM-dd");

  const { utcStartTimeOfDay, utcEndTimeOfDay } = convertToRangeOfDayUTCTime({
    localDate: currentLocalDateTime,
    timeZone: profile.timezone,
  });

  // TODO: handle error
  if (!utcStartTimeOfDay || !utcEndTimeOfDay) {
    throw new Error("failed to get start and end time of day");
  }

  const [
    { data: userGoal },
    { data: dailyIntake },
    { data: latestHealthInfo },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["userGoal"],
        queryFn: getOrCreateGoal,
      },
      {
        queryKey: ["dailyIntake"],
        queryFn: () =>
          getOrCreateDailyIntake({
            utcStartOfRange: utcStartTimeOfDay,
            utcEndOfRange: utcEndTimeOfDay,
          }),
      },
      {
        queryKey: ["latestHealthInfo"],
        queryFn: getLatestHealthInfo,
      },
    ],
  });

  return (
    <div className="flex flex-col rounded-md border border-border p-2">
      <div className="flex items-center text-lg font-semibold">
        <div className="flex items-center">
          <span>{currentLocalDateTime}</span>
          <span>
            @{profile.timezone === "Asia/Seoul" ? "Seoul" : "New York"}
          </span>
        </div>

        <div className="flex items-center gap-4"></div>
      </div>

      {/* REVIEW: if suspense is not working, create a new component for this */}
      <React.Suspense fallback={<div>Loading...</div>}>
        <DailyIntake
          dailyIntake={dailyIntake}
          profile={profile}
          userGoal={userGoal}
          latestHealthInfo={latestHealthInfo}
        />
      </React.Suspense>
    </div>
  );
}
