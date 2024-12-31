import * as React from "react";
import { useSuspenseQueries } from "@tanstack/react-query";

import { UserHealthInfoStat } from "./user-health-info-stat";
import { UserGoalStat } from "./user-goal-stat";
import { DailyIntake } from "./daily-intake";
import {
  getLatestHealthInfo,
  getOrCreateGoal,
  type Profile,
} from "@/lib/queries";

interface DailyUserStatProps {
  profile: Profile;
  currentLocalDateTime: string;
}

export function DailyUserStat({
  profile,
  currentLocalDateTime,
}: DailyUserStatProps) {
  const justDate = currentLocalDateTime.split(" ")[0];

  const [{ data: userGoal }, { data: latestHealthInfo }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["userGoal"],
        queryFn: getOrCreateGoal,
      },
      {
        queryKey: ["latestHealthInfo"],
        queryFn: getLatestHealthInfo,
      },
    ],
  });

  return (
    <div className="flex flex-col rounded-md border border-border p-2">
      <div className="flex items-center gap-4 text-lg font-semibold">
        <div className="flex items-center">
          <span>{justDate}</span>
          <span>
            @{profile.timezone === "Asia/Seoul" ? "Seoul" : "New York"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <UserHealthInfoStat profile={profile} healthInfo={latestHealthInfo} />
          <UserGoalStat profile={profile} userGoal={userGoal} />
        </div>
      </div>

      {/* REVIEW: if suspense is not working, create a new component for this */}
      <React.Suspense fallback={<div>Loading...</div>}>
        <DailyIntake
          profile={profile}
          currentLocalDateTime={currentLocalDateTime}
        />
      </React.Suspense>
    </div>
  );
}
