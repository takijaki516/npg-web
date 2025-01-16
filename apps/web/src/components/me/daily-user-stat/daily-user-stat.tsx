import { useSuspenseQueries } from "@tanstack/react-query";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import {
  getDailyIntakeOptions,
  getOrCreateGoalOptions,
  getLatestHealthInfoOptions,
  getDailyMealsWithFoodsOptions,
} from "@/lib/queries";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { UserHealthInfoStat } from "./user-health-info-stat";
import { UserGoalStat } from "./user-goal-stat";
import { DailyIntake } from "./daily-intake";

export function DailyUserStat() {
  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );
  const currentLocalDate = currentLocalDateTime.split(" ")[0];

  const [
    { data: userGoal },
    { data: latestHealthInfo },
    { data: dailyIntake },
    { data: dailyMealsWithFoods },
  ] = useSuspenseQueries({
    queries: [
      getOrCreateGoalOptions,
      getLatestHealthInfoOptions,
      getDailyIntakeOptions({
        currentLocalDate,
      }),
      getDailyMealsWithFoodsOptions({
        currentLocalDate,
      }),
    ],
  });

  return (
    <div className="flex flex-col rounded-md p-2">
      <div className="flex items-center gap-4 text-lg font-semibold">
        <MobileSidebar />

        <div className="flex items-center">{currentLocalDate}</div>

        <div className="flex items-center gap-1">
          <UserHealthInfoStat healthInfo={latestHealthInfo} />
          <UserGoalStat
            userGoal={userGoal}
            className="cursor-pointer transition-colors hover:text-primary"
          />
        </div>
      </div>

      <DailyIntake
        dailyMealsWithFoods={dailyMealsWithFoods}
        dailyIntake={dailyIntake}
      />
    </div>
  );
}
