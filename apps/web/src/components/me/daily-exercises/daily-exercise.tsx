import { SearchX } from "lucide-react";

import {
  type DailyWeightsExercisesWithAllInfos,
  type Profile,
} from "@/lib/queries";
import { utcToLocalTime } from "@/lib/utils";
import { EachWeightWorkout } from "@/components/me/daily-exercises/each-weight-workout";

interface DailyExerciseProps {
  profile: Profile;
  dailyWeightsExercises: DailyWeightsExercisesWithAllInfos;
}

export function DailyExercise({
  profile,
  dailyWeightsExercises,
}: DailyExerciseProps) {
  if (dailyWeightsExercises.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 rounded-md border p-2 text-muted-foreground">
        <SearchX size={48} className="animate-[pulse_3s_infinite]" />
        <div>
          {profile.language === "ko"
            ? "아직 등록된 운동이 없어요"
            : "No exercises registered yet"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {dailyWeightsExercises.map((dailyExerciseItem) => {
        const localDateTime = utcToLocalTime({
          utcTime: dailyExerciseItem.startTime,
          timezone: profile.timezone,
        });

        const [hh, mm] = localDateTime.split(" ")[1].split(":");

        return (
          <div
            className="flex flex-col gap-1 rounded-md border p-2"
            key={dailyExerciseItem.id}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1">
                <span>시작 시간</span>
                <span>{`${hh}:${mm}`}</span>
              </div>

              <div className="flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1">
                <span>운동 시간</span>
                <span>{dailyExerciseItem.durationMinutes}분</span>
              </div>
            </div>

            {dailyExerciseItem.eachWeightsExercises.map((eachWeights) => {
              return (
                <EachWeightWorkout
                  key={eachWeights.id}
                  eachWeightWorkoutData={eachWeights}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
