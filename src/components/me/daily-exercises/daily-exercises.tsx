import { BicepsFlexed, SearchX } from "lucide-react";
import { getRouteApi } from "@tanstack/react-router";

import { AddWorkoutDialog } from "@/components/me/add-exercises-dialog/add-workout-dialog";
import { DailyExercise } from "@/components/me/daily-exercises/daily-exercise";

export function DailyExercisesCard() {
  const routeApi = getRouteApi("/(user)/_layout/me");
  const { profile, dailyWeightsExercises } = routeApi.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <BicepsFlexed />
          <div className="text-lg font-semibold">
            {profile.language === "ko" ? "오늘의 운동" : "Today's Workout"}
          </div>
        </div>

        <AddWorkoutDialog profile={profile} />
      </div>

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
            <DailyExercise
              key={dailyExerciseItem.id}
              dailyExerciseData={dailyExerciseItem}
            />
          );
        })}
    </div>
  );
}
