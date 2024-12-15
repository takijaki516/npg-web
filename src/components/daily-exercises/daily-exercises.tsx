"use client";

import { type DailyWeightsExercisesWithAllInfos } from "@/supabase-utils/server-queries";
import { AddWorkoutDialog } from "../add-exercises-dialog/add-workout-dialog";
import { type Database } from "@/lib/types/database.types";
import { DailyExercise } from "./daily-exercise";
import { Expand } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DailyExercisesCardProps {
  localWorkoutDate: string;
  dailyExercisesData: DailyWeightsExercisesWithAllInfos;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function DailyExercisesCard({
  localWorkoutDate,
  dailyExercisesData,
  profile,
}: DailyExercisesCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>오늘의 운동</div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Expand />
          </Button>

          <AddWorkoutDialog profile={profile} />
        </div>
      </div>

      {dailyExercisesData.length === 0 && <div>아직 등록된 운동이 없어요</div>}

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
