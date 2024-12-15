"use client";

import { BicepsFlexed, SearchX } from "lucide-react";

import { type DailyWeightsExercisesWithAllInfos } from "@/supabase-utils/server-queries";
import { AddWorkoutDialog } from "@/components/add-exercises-dialog/add-workout-dialog";
import { type Database } from "@/lib/types/database.types";
import { DailyExercise } from "./daily-exercise";

interface DailyExercisesCardProps {
  dailyExercisesData: DailyWeightsExercisesWithAllInfos;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function DailyExercisesCard({
  dailyExercisesData,
  profile,
}: DailyExercisesCardProps) {
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

      {dailyExercisesData.length === 0 && (
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-8 rounded-md border text-muted-foreground">
          <SearchX size={48} className="animate-[pulse_3s_infinite]" />
          <div>
            {profile.language === "ko"
              ? "아직 등록된 운동이 없어요"
              : "No exercises registered yet"}
          </div>
        </div>
      )}

      {dailyExercisesData.length > 0 &&
        dailyExercisesData.map((dailyExerciseItem) => {
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
