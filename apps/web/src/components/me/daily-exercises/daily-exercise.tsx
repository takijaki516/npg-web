import * as React from "react";
import { BicepsFlexed, SearchX } from "lucide-react";
import { DateTime } from "luxon";

import { getDailyWeightsExerciseOptions, type Profile } from "@/lib/queries";
import { EachWeightWorkout } from "@/components/me/daily-exercises/each-weight-workout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { convertToRangeOfDayUTCTime } from "@/lib/utils";

interface DailyExerciseProps {
  profile: Profile;
}

export function DailyExercise({ profile }: DailyExerciseProps) {
  // get current local date time
  const currentLocalDateTime = DateTime.now()
    .setZone(profile.timezone)
    .toFormat("yyyy-MM-dd");

  const { utcStartTimeOfDay, utcEndTimeOfDay } = convertToRangeOfDayUTCTime({
    localDate: currentLocalDateTime,
    timeZone: profile.timezone,
  });

  if (!utcStartTimeOfDay || !utcEndTimeOfDay) {
    throw new Error("failed to get start and end time of day");
  }

  const { data: dailyWeightsExercises } = useSuspenseQuery(
    getDailyWeightsExerciseOptions({
      utcStartOfRange: utcStartTimeOfDay,
      utcEndOfRange: utcEndTimeOfDay,
    }),
  );

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
          return (
            <div className="flex flex-col rounded-md border p-2">
              <BicepsFlexed />

              <div>
                <span>시작시간:</span>
                <span>{dailyExerciseItem.startTime}</span>
              </div>
              <div>
                <span>종료시간:</span>
                <span>{dailyExerciseItem.endTime}</span>
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
