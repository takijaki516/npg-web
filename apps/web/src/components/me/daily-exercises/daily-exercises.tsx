import { BicepsFlexed } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getProfileOptions } from "@/lib/queries";
import { DailyExercise } from "./daily-exercise";

export function DailyExercisesCard() {
  const { data: profile } = useSuspenseQuery(getProfileOptions);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <BicepsFlexed />
          <div className="text-lg font-semibold">
            {profile.language === "ko" ? "오늘의 운동" : "Today's Workout"}
          </div>
        </div>

        {/* <AddWorkoutDialog profile={profile} /> */}
      </div>

      <DailyExercise profile={profile} />
    </div>
  );
}
