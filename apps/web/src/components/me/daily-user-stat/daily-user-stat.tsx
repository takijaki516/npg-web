import { useSuspenseQueries } from "@tanstack/react-query";

import {
  getOrCreateDailyIntakeOptions,
  type Profile,
  getOrCreateGoalOptions,
  getLatestHealthInfoOptions,
  getDailyMealsWithFoodsOptions,
} from "@/lib/queries";
import { UserHealthInfoStat } from "./user-health-info-stat";
import { UserGoalStat } from "./user-goal-stat";
import { DailyIntake } from "./daily-intake";

interface DailyUserStatProps {
  profile: Profile;
  currentLocalDateTime: string;
}

export function DailyUserStat({
  profile,
  currentLocalDateTime,
}: DailyUserStatProps) {
  const [
    { data: userGoal },
    { data: latestHealthInfo },
    { data: dailyIntake },
    { data: dailyMealsWithFoods },
  ] = useSuspenseQueries({
    queries: [
      getOrCreateGoalOptions,
      getLatestHealthInfoOptions,
      getOrCreateDailyIntakeOptions({
        currentLocalDateTime,
        timezone: profile.timezone,
      }),
      getDailyMealsWithFoodsOptions({
        currentLocalDateTime: currentLocalDateTime,
        timezone: profile.timezone,
      }),
    ],
  });

  const justDate = currentLocalDateTime.split(" ")[0];

  return (
    <div className="flex flex-col rounded-md p-2">
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

      <DailyIntake
        profile={profile}
        currentLocalDateTime={currentLocalDateTime}
        dailyMealsWithFoods={dailyMealsWithFoods}
        dailyIntake={dailyIntake}
      />
    </div>
  );
}
