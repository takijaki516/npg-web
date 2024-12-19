import { BicepsFlexed } from "lucide-react";

import { type DailyWeightsExercisesWithAllInfos } from "@/lib/queries";
import { EachWeightWorkout } from "@/components/me/daily-exercises/each-weight-workout";

interface DailyExerciseProps {
  dailyExerciseData: DailyWeightsExercisesWithAllInfos[number];
}

export function DailyExercise({ dailyExerciseData }: DailyExerciseProps) {
  return (
    <div className="flex flex-col rounded-md border p-2">
      <BicepsFlexed />

      <div>
        <span>시작시간:</span>
        <span>{dailyExerciseData.start_time}</span>
      </div>
      <div>
        <span>종료시간:</span>
        <span>{dailyExerciseData.end_time}</span>
      </div>

      {dailyExerciseData.each_weights_exercises.map((eachWeights) => {
        return (
          <EachWeightWorkout
            key={eachWeights.id}
            eachWeightWorkoutData={eachWeights}
          />
        );
      })}
    </div>
  );
}
