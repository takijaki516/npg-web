import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { insertDailyWorkoutSchema } from "@repo/shared-schema";

import { cn } from "@/lib/utils";
import { DeleteButton } from "@/components/delete-button";
import { WeightsWorkoutSetForm } from "./add-workout-set";
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
  form: UseFormReturn<z.infer<typeof insertDailyWorkoutSchema>>;
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

  const handleAddWorkoutSet = React.useCallback(() => {
    setIsCollapsibleOpen(true);

    const latestSetIdx = weightsWorkoutSetsArrForm.fields.length;

    if (latestSetIdx === 0) {
      weightsWorkoutSetsArrForm.append({
        reps: 0,
        weightKg: 0,
      });

      return;
    }

    weightsWorkoutSetsArrForm.append({
      reps: form.watch(
        `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets.${latestSetIdx - 1}.reps`,
      ),
      weightKg: form.watch(
        `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets.${latestSetIdx - 1}.weightKg`,
      ),
    });
  }, [weightsWorkoutSetsArrForm, form, workoutIdx]);

  const handleRemoveWorkoutSet = React.useCallback(
    (workoutIdx: number) => {
      weightsWorkoutSetsArrForm.remove(workoutIdx);
    },
    [weightsWorkoutSetsArrForm],
  );

  return (
    <div className="flex flex-col gap-4 overflow-x-auto rounded-md border border-border p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full flex-col gap-1 overflow-x-auto xs:flex-row">
          <BodyPartSelector form={form} workoutIdx={workoutIdx} />
          <WorkoutSelector form={form} workoutIdx={workoutIdx} />
        </div>

        <DeleteButton
          dialog={false}
          deleteFunction={() => handleRemoveWorkout(workoutIdx)}
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
            onClick={handleAddWorkoutSet}
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
