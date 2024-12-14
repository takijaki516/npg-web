"use client";

import * as React from "react";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { insertDailyWeightsExerciseSchema } from "@/lib/schema/exercise.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="flex w-fit items-center gap-2">
      <div className="break-keep">
        #
        {form.getValues(
          `weights_workouts.${workoutIdx}.weights_workouts_sets.${setIdx}.set_number`,
        )}
      </div>

      <div className="flex items-center gap-1">
        <Label className="break-keep">횟수</Label>
        <Input
          className="w-fit"
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
        <Input
          className="w-fit"
          type="number"
          {...form.register(
            `weights_workouts.${workoutIdx}.weights_workouts_sets.${setIdx}.reps`,
            {
              valueAsNumber: true,
            },
          )}
        />
      </div>

      <Button
        size="sm"
        variant={"ghost"}
        onClick={() => removeWorkoutSet(setIdx)}
        className="cursor-pointer text-red-500 hover:bg-red-500"
      >
        <X />
      </Button>
    </div>
  );
}
