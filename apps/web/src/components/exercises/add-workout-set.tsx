import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { insertDailyWorkoutSchema } from "@repo/shared-schema";

import { cn } from "@/lib/utils";
import { DeleteButton } from "@/components/delete-button";

interface WeightsWorkoutSetFormProps {
  workoutIdx: number;
  setIdx: number;
  form: UseFormReturn<z.infer<typeof insertDailyWorkoutSchema>>;
  removeWorkoutSet: (idx: number) => void;
}

export function WeightsWorkoutSetForm({
  workoutIdx,
  setIdx,
  form,
  removeWorkoutSet,
}: WeightsWorkoutSetFormProps) {
  return (
    <div className="flex items-center gap-2 p-1">
      <span className="w-[3ch]">#{setIdx + 1}</span>

      <div className="inline-flex items-center gap-[2px]">
        <label className="w-[3ch] break-keep">횟수</label>
        <input
          className={cn(
            "w-[5ch] border text-end",
            "rounded-md bg-transparent px-1 pr-[6px]",
            "focus:outline-none",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          )}
          type="number"
          {...form.register(
            `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets.${setIdx}.reps`,
            {
              valueAsNumber: true,
            },
          )}
        />
      </div>

      <div className="inline-flex items-center gap-[2px]">
        <label className="w-[3ch] break-keep">무게</label>
        <div className="flex items-center">
          <input
            className={cn(
              "w-[5ch] border text-end",
              "rounded-md bg-transparent px-1 pr-[6px]",
              "focus:outline-none",
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            )}
            type="number"
            {...form.register(
              `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets.${setIdx}.weightKg`,
              {
                valueAsNumber: true,
              },
            )}
          />
          <span>kg</span>
        </div>
      </div>

      <DeleteButton
        dialog={false}
        deleteFunction={() => removeWorkoutSet(setIdx)}
        className="h-6 w-6"
      />
    </div>
  );
}
