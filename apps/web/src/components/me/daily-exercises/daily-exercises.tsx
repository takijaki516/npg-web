import { SearchX } from "lucide-react";

import {
  type DailyWeightsExercisesWithAllInfos,
  type Profile,
} from "@/lib/queries";
import { DailyExercise } from "./daily-exercise";

interface DailyExercisesProps {
  profile: Profile;
  dailyWeightsExercises: DailyWeightsExercisesWithAllInfos;
}

export function DailyExercises({
  profile,
  dailyWeightsExercises,
}: DailyExercisesProps) {
  if (dailyWeightsExercises.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 rounded-md border p-2 text-muted-foreground">
        <SearchX size={48} className="animate-[pulse_3s_infinite]" />

        <div>아직 등록된 운동이 없어요</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {dailyWeightsExercises.map((dailyExerciseItem) => (
        <DailyExercise
          key={dailyExerciseItem.id}
          profile={profile}
          dailyWeightsExercise={dailyExerciseItem}
        />
      ))}
    </div>
  );
}
