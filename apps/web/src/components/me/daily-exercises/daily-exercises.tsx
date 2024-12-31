import { BicepsFlexed } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getDailyWeightsExerciseOptions, type Profile } from "@/lib/queries";
import { DailyExercise } from "./daily-exercise";
import { AddWorkoutDialog } from "../add-exercises-dialog/add-workout-dialog";

interface DailyExercisesCardProps {
  profile: Profile;
  currentLocalDateTime: string;
}

export function DailyExercisesCard({
  profile,
  currentLocalDateTime,
}: DailyExercisesCardProps) {
  const { data: dailyWeightsExercises } = useSuspenseQuery(
    getDailyWeightsExerciseOptions({
      currentLocalDateTime,
      timezone: profile.timezone,
    }),
  );

  return (
    <div className="flex flex-col gap-1 rounded-md border border-border p-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <BicepsFlexed />
          <div className="text-lg font-semibold">
            {profile.language === "ko" ? "오늘의 운동" : "Today's Workout"}
          </div>
        </div>

        <AddWorkoutDialog
          profile={profile}
          currentLocalDateTime={currentLocalDateTime}
        />
      </div>

      <DailyExercise
        profile={profile}
        dailyWeightsExercises={dailyWeightsExercises}
      />
    </div>
  );
}
