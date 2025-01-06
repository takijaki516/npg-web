import { useSuspenseQuery } from "@tanstack/react-query";

import { getDailyWeightsExerciseOptions, type Profile } from "@/lib/queries";
import { DailyExercises } from "./daily-exercises";
import { AddWorkoutDialog } from "../add-exercises-dialog/add-workout-dialog";

interface DailyExercisesSectionProps {
  profile: Profile;
  currentLocalDateTime: string;
  className?: string;
}

export function DailyExercisesSection({
  profile,
  currentLocalDateTime,
}: DailyExercisesSectionProps) {
  const { data: dailyWeightsExercises } = useSuspenseQuery(
    getDailyWeightsExerciseOptions({
      currentLocalDateTime,
      timezone: profile.timezone,
    }),
  );

  return (
    <div className="flex h-full flex-col gap-1">
      <div className="flex items-center justify-between px-1">
        <div className="text-lg font-semibold">오늘의 운동</div>

        <AddWorkoutDialog
          profile={profile}
          currentLocalDateTime={currentLocalDateTime}
        />
      </div>

      <DailyExercises
        profile={profile}
        dailyWeightsExercises={dailyWeightsExercises}
      />
    </div>
  );
}
