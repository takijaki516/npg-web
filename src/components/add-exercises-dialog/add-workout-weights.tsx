"use client";

import * as React from "react";
import { X, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { type Database } from "@/lib/types/database.types";
import { Combobox } from "./workout-combobox";
import { insertDailyWeightsExerciseSchema } from "@/lib/schema/exercise.schema";
import {
  ARM_WORKOUT_NAMES,
  BACK_WORKOUT_NAMES,
  CHEST_WORKOUT_NAMES,
  LEG_WORKOUT_NAMES,
  SHOULDER_WORKOUT_NAMES,
  WEIGHT_BODY_PARTS,
  type WORKOUT_OPTIONS,
} from "@/lib/types/exercise.types";
import { WeightsWorkoutSetForm } from "./add-workout-set";
import { DeleteButton } from "../delete-button";

interface WeightWorkoutFormProps {
  workoutIdx: number;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  form: UseFormReturn<z.infer<typeof insertDailyWeightsExerciseSchema>>;
  handleRemoveWorkout: (idx: number) => void;
}

export function WeightWorkoutForm({
  workoutIdx,
  profile,
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

  const weightsWorkoutSetSArrForm = useFieldArray({
    control: form.control,
    name: `weights_workouts.${workoutIdx}.weights_workouts_sets`,
  });

  console.log();

  function handleAddWorkoutSet() {
    setIsCollapsibleOpen(true);

    weightsWorkoutSetSArrForm.append({
      user_email: profile.user_email,
      user_id: profile.user_id!,
      kg: 0,
      reps: 0,
      set_number: weightsWorkoutSetSArrForm.fields.length + 1,
    });
  }

  function handleRemoveWorkoutSet(workoutIdx: number) {
    weightsWorkoutSetSArrForm.remove(workoutIdx);
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
                form.watch(
                  `weights_workouts.${workoutIdx}.weights_workouts_sets`,
                ).length
              }
            </span>
            <span className="pl-1">세트 추가됨</span>
          </span>
        </div>

        <CollapsibleContent>
          <div className={cn("ml-3 flex flex-col gap-4 border-l pl-2 pt-2")}>
            {weightsWorkoutSetSArrForm.fields.map((field, setIdx) => {
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
