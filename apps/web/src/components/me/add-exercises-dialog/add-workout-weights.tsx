import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { insertDailyWeightsExerciseSchema } from "@repo/shared-schema";

import { cn } from "@/lib/utils";
import { WeightsWorkoutSetForm } from "@/components/me/add-exercises-dialog/add-workout-set";
import { DeleteButton } from "@/components/delete-button";
import { WorkoutSelector } from "./workout-selector";
import { BodyPartSelector } from "./body-part-selector";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface WeightWorkoutFormProps {
  workoutIdx: number;
  form: UseFormReturn<z.infer<typeof insertDailyWeightsExerciseSchema>>;
  handleRemoveWorkout: (idx: number) => void;
}

export function WeightWorkoutForm({
  workoutIdx,
  form,
  handleRemoveWorkout,
}: WeightWorkoutFormProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  const weightsWorkoutSetsArrForm = useFieldArray({
    control: form.control,
    name: `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets`,
  });

  function handleAddWorkoutSet() {
    setIsCollapsibleOpen(true);

    const latestSetIdx = weightsWorkoutSetsArrForm.fields.length;

    if (latestSetIdx === 0) {
      weightsWorkoutSetsArrForm.append({
        setNumber: 1,
        reps: 0,
        weightKg: 0,
      });

      return;
    }

    weightsWorkoutSetsArrForm.append({
      setNumber: latestSetIdx + 1, // 1 based index
      reps: form.getValues(
        `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets.${latestSetIdx - 1}.reps`,
      ),
      weightKg: form.getValues(
        `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets.${latestSetIdx - 1}.weightKg`,
      ),
    });
  }

  function handleRemoveWorkoutSet(workoutIdx: number) {
    weightsWorkoutSetsArrForm.remove(workoutIdx);
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full flex-col gap-1 overflow-x-auto xs:flex-row">
          <BodyPartSelector form={form} workoutIdx={workoutIdx} />
          <WorkoutSelector form={form} workoutIdx={workoutIdx} />
        </div>

        <DeleteButton
          onClick={() => handleRemoveWorkout(workoutIdx)}
          className="h-8 w-8"
        />
      </div>

      <Collapsible
        open={isCollapsibleOpen}
        onOpenChange={setIsCollapsibleOpen}
        className="flex flex-col"
      >
        <div className="flex items-center gap-1">
          <CollapsibleTrigger className="text-foreground/80 hover:text-foreground">
            {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
          </CollapsibleTrigger>

          <Button
            variant={"outline"}
            className="px-2 py-1"
            onClick={() => handleAddWorkoutSet()}
          >
            세트 추가
          </Button>

          <span className="text-muted-foreground">
            <span>
              {
                form.watch(`weightsWorkouts.${workoutIdx}.weightsWorkoutsSets`)
                  ?.length
              }
            </span>
            <span className="pl-1">세트 추가됨</span>
          </span>
        </div>

        <CollapsibleContent>
          <div className={cn("ml-3 mt-1 flex flex-col border-l pl-2")}>
            {weightsWorkoutSetsArrForm.fields.map((field, setIdx) => {
              return (
                <WeightsWorkoutSetForm
                  key={field.id}
                  workoutIdx={workoutIdx}
                  setIdx={setIdx}
                  form={form}
                  removeWorkoutSet={handleRemoveWorkoutSet}
                />
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
