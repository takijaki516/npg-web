"use client";

import * as React from "react";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { insertDailyWeightsExerciseSchema } from "@/lib/schema/exercise.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteButton } from "../delete-button";

interface WeightsWorkoutSetFormProps {
  workoutIdx: number;
  setIdx: number;
  form: UseFormReturn<z.infer<typeof insertDailyWeightsExerciseSchema>>;
  removeWorkoutSet: (idx: number) => void;
}

export function WeightsWorkoutSetForm({
  workoutIdx,
  setIdx,
  form,
  removeWorkoutSet,
}: WeightsWorkoutSetFormProps) {
  return (
    <div className="flex w-fit items-center gap-1 overflow-x-auto">
      <span>
        #
        {form.getValues(
          `weights_workouts.${workoutIdx}.weights_workouts_sets.${setIdx}.set_number`,
        )}
      </span>

      <div className="flex items-center gap-1">
        <Label className="break-keep">횟수</Label>
        <input
          className="w-10 rounded-md px-1"
          type="number"
          {...form.register(
            `weights_workouts.${workoutIdx}.weights_workouts_sets.${setIdx}.reps`,
            {
              valueAsNumber: true,
            },
          )}
        />
      </div>

      <div className="flex items-center gap-1">
        <Label className="break-keep">무게</Label>
        <input
          className="w-14 rounded-md px-1"
          type="number"
          {...form.register(
            `weights_workouts.${workoutIdx}.weights_workouts_sets.${setIdx}.reps`,
            {
              valueAsNumber: true,
            },
          )}
        />
      </div>

      <DeleteButton
        onClick={() => removeWorkoutSet(setIdx)}
        className="h-6 w-6"
      />
    </div>
  );
}
