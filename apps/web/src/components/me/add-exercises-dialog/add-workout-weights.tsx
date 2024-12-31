import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  insertDailyWeightsExerciseSchema,
  ARM_WORKOUT_NAMES,
  BACK_WORKOUT_NAMES,
  CHEST_WORKOUT_NAMES,
  LEG_WORKOUT_NAMES,
  SHOULDER_WORKOUT_NAMES,
  WEIGHT_BODY_PARTS,
  type WORKOUT_OPTIONS,
} from "@repo/shared-schema";

import { cn } from "@/lib/utils";
import { WeightsWorkoutSetForm } from "@/components/me/add-exercises-dialog/add-workout-set";
import { DeleteButton } from "@/components/delete-button";
import { Combobox } from "./workout-combobox";
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
  const [latestSelectedBodyPart, setLatestSelectedBodyPart] =
    React.useState<(typeof WEIGHT_BODY_PARTS)[number]>("arms");
  const [workoutOptions, setWorkoutOptions] =
    React.useState<WORKOUT_OPTIONS>(ARM_WORKOUT_NAMES);

  React.useEffect(() => {
    if (latestSelectedBodyPart === "arms") {
      setWorkoutOptions(ARM_WORKOUT_NAMES);
    } else if (latestSelectedBodyPart === "chests") {
      setWorkoutOptions(CHEST_WORKOUT_NAMES);
    } else if (latestSelectedBodyPart === "back") {
      setWorkoutOptions(BACK_WORKOUT_NAMES);
    } else if (latestSelectedBodyPart === "legs") {
      setWorkoutOptions(LEG_WORKOUT_NAMES);
    } else if (latestSelectedBodyPart === "shoulders") {
      setWorkoutOptions(SHOULDER_WORKOUT_NAMES);
    }
  }, [latestSelectedBodyPart]);

  const weightsWorkoutSetsArrForm = useFieldArray({
    control: form.control,
    name: `weightsWorkouts.${workoutIdx}.weightsWorkoutsSets`,
  });

  function handleAddWorkoutSet() {
    setIsCollapsibleOpen(true);

    weightsWorkoutSetsArrForm.append({
      weightKg: 0,
      reps: 0,
      setNumber: weightsWorkoutSetsArrForm.fields.length + 1,
    });
  }

  function handleRemoveWorkoutSet(workoutIdx: number) {
    weightsWorkoutSetsArrForm.remove(workoutIdx);
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border p-2">
      <div className="flex justify-between gap-2">
        <div className="flex w-full flex-col gap-1 overflow-x-auto sm:flex-row">
          <Combobox
            placeholder="운동부위"
            options={{
              field: "body_part",
              select_options: WEIGHT_BODY_PARTS,
              setLatestSelectedBodyPart: setLatestSelectedBodyPart,
            }}
            form={form}
            workoutIdx={workoutIdx}
          />

          <Combobox
            placeholder="운동이름"
            options={{ field: "workout_name", select_options: workoutOptions }}
            form={form}
            workoutIdx={workoutIdx}
          />
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
          <CollapsibleTrigger>
            {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}
          </CollapsibleTrigger>

          <Button variant={"outline"} onClick={() => handleAddWorkoutSet()}>
            세트 추가
          </Button>

          <span className="text-muted-foreground">
            <span>
              {
                form.watch(`weightsWorkouts.${workoutIdx}.weightsWorkoutsSets`)
                  .length
              }
            </span>
            <span className="pl-1">세트 추가됨</span>
          </span>
        </div>

        <CollapsibleContent>
          <div className={cn("ml-3 flex flex-col gap-4 border-l pl-2 pt-2")}>
            {weightsWorkoutSetsArrForm.fields.map((_, setIdx) => {
              return (
                <WeightsWorkoutSetForm
                  key={setIdx}
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
