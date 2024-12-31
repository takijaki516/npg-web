import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { insertDailyWeightsExerciseSchema } from "@repo/shared-schema";

import { DeleteButton } from "@/components/delete-button";

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
          `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets.${setIdx}.setNumber`,
        )}
      </span>

      <div className="flex items-center gap-1">
        <label className="break-keep">횟수</label>
        <input
          className="w-10 rounded-md px-1"
          type="number"
          {...form.register(
            `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets.${setIdx}.reps`,
            {
              valueAsNumber: true,
            },
          )}
        />
      </div>

      <div className="flex items-center gap-1">
        <label className="break-keep">무게</label>
        <input
          className="w-14 rounded-md px-1"
          type="number"
          {...form.register(
            `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets.${setIdx}.weightKg`,
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
