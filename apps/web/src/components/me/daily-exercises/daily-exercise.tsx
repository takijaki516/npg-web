import * as React from "react";
import { SearchX } from "lucide-react";

import { DailyWeightsExercisesWithAllInfos, type Profile } from "@/lib/queries";
import { EachWeightWorkout } from "@/components/me/daily-exercises/each-weight-workout";
import { utcToLocalTime } from "@/lib/utils";

interface DailyExerciseProps {
  profile: Profile;
  dailyWeightsExercises: DailyWeightsExercisesWithAllInfos;
}

export function DailyExercise({
  profile,
  dailyWeightsExercises,
}: DailyExerciseProps) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {dailyWeightsExercises.length === 0 && (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-8 rounded-md border text-muted-foreground">
          <SearchX size={48} className="animate-[pulse_3s_infinite]" />
          <div>
            {profile.language === "ko"
              ? "아직 등록된 운동이 없어요"
              : "No exercises registered yet"}
          </div>
        </div>
      )}

      {dailyWeightsExercises.length > 0 &&
        dailyWeightsExercises.map((dailyExerciseItem) => {
          const localDateTime = utcToLocalTime({
            utcTime: dailyExerciseItem.startTime,
            timezone: profile.timezone,
          });

          const [hh, mm] = localDateTime.split(" ")[1].split(":");

          return (
            <div
              className="flex flex-col gap-2 rounded-md border p-2"
              key={dailyExerciseItem.id}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span>시작시간</span>
                  <span>{`${hh}:${mm}`}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>운동시간</span>
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
    </React.Suspense>
  );
}
