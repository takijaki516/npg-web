import { useSuspenseQuery } from "@tanstack/react-query";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import { cn } from "@/lib/utils";
import { getDailyWorkoutOptions } from "@/lib/queries";
import { DailyExercises } from "./daily-exercises";
import { AddWorkoutDialog } from "./add-workout-dialog";

interface DailyExercisesSectionProps {
  className?: string;
}

export function DailyExercisesSection({
  className,
}: DailyExercisesSectionProps) {
  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );
  const currentLocalDate = currentLocalDateTime.split(" ")[0];

  const { data: dailyWeightsExercises } = useSuspenseQuery(
    getDailyWorkoutOptions({
      currentLocalDate,
    }),
  );

  return (
    <div className={cn("flex flex-1 flex-col gap-1", className)}>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">운동</div>

        <AddWorkoutDialog currentLocalDateTime={currentLocalDateTime} />
      </div>

      <DailyExercises dailyWeightsExercises={dailyWeightsExercises} />
    </div>
  );
}
