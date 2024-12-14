"use client";

import * as React from "react";

import { type DailyWeightsExercisesWithAllInfos } from "@/supabase-utils/server-queries";

interface SetInfoProps {
  setInfoData: DailyWeightsExercisesWithAllInfos[number]["each_weights_exercises"][number]["each_weights_exercises_set_info"][number];
}

export function SetInfo({ setInfoData }: SetInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <span>#</span>
        <span>{setInfoData.set_number}</span>
      </div>

      <div>
        <span>횟수:</span>
        <span>{setInfoData.reps}</span>
      </div>

      <div>
        <span>무게:</span>
        <span>{setInfoData.kg}</span>
      </div>
    </div>
  );
}
