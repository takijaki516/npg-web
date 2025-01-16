import { SearchX } from "lucide-react";

import type { DailyWorkout } from "@/lib/queries";
import { DailyExercise } from "./daily-exercise";

interface DailyExercisesProps {
  dailyWeightsExercises: DailyWorkout;
}

export function DailyExercises({ dailyWeightsExercises }: DailyExercisesProps) {
  if (dailyWeightsExercises.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 rounded-md border p-2 text-muted-foreground">
        <SearchX size={48} className="animate-[pulse_3s_infinite]" />

        <div>등록된 운동이 없어요</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {dailyWeightsExercises.map((dailyExerciseItem) => (
        <DailyExercise
          key={dailyExerciseItem.id}
          dailyWeightsExercise={dailyExerciseItem}
        />
      ))}
    </div>
  );
}
