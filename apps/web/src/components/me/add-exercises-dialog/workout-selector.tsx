import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  insertDailyWeightsExerciseSchema,
  ARM_WORKOUT_NAMES,
  BACK_WORKOUT_NAMES,
  CHEST_WORKOUT_NAMES,
  LEG_WORKOUT_NAMES,
  SHOULDER_WORKOUT_NAMES,
  TOTAL_WEIGHT_WORKOUTS,
} from "@repo/shared-schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkoutSelectorProps {
  form: UseFormReturn<z.infer<typeof insertDailyWeightsExerciseSchema>>;
  workoutIdx: number;
}

export function WorkoutSelector({ form, workoutIdx }: WorkoutSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const bodyPart = form.watch(`weightsWorkouts.${workoutIdx}.bodyPart`);

  let workoutCandidates: ReadonlyArray<string> = TOTAL_WEIGHT_WORKOUTS;
  if (bodyPart === "가슴") {
    workoutCandidates = CHEST_WORKOUT_NAMES;
  } else if (bodyPart === "팔") {
    workoutCandidates = ARM_WORKOUT_NAMES;
  } else if (bodyPart === "등") {
    workoutCandidates = BACK_WORKOUT_NAMES;
  } else if (bodyPart === "다리") {
    workoutCandidates = LEG_WORKOUT_NAMES;
  } else if (bodyPart === "어깨") {
    workoutCandidates = SHOULDER_WORKOUT_NAMES;
  }

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => {
        form.setValue(`weightsWorkouts.${workoutIdx}.workoutName`, value);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="운동 부위" />
      </SelectTrigger>

      <SelectContent className="w-[200px]">
        {workoutCandidates.map((workout) => {
          return (
            <SelectItem key={workout} value={workout}>
              {workout}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
