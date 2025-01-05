import { useSuspenseQuery } from "@tanstack/react-query";

import { getDailyWeightsExerciseOptions, type Profile } from "@/lib/queries";
import { DailyExercise } from "./daily-exercise";
import { AddWorkoutDialog } from "../add-exercises-dialog/add-workout-dialog";

interface DailyExercisesCardProps {
  profile: Profile;
  currentLocalDateTime: string;
  className?: string;
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
    <div className="flex flex-col gap-1 overflow-y-auto rounded-md p-2">
      <div className="flex items-center justify-between px-1">
        <div className="text-lg font-semibold">오늘의 운동</div>

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
