"use client";

import * as React from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/supabase-utils/client";
import { Database } from "@/lib/types/database.types";
import { DateTime } from "luxon";
import { insertDailyWeightsExerciseSchema } from "@/lib/schema/exercise.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { WeightWorkoutForm } from "./add-workout-weights";

interface AddWorkoutDialogProps {
  localWorkoutDate: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function AddWorkoutDialog({
  localWorkoutDate,
  profile,
}: AddWorkoutDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const currentLocalStartTime = DateTime.now();
  const currentLocalEndTime = DateTime.now().plus({ hours: 1 });

  const form = useForm<z.infer<typeof insertDailyWeightsExerciseSchema>>({
    resolver: zodResolver(insertDailyWeightsExerciseSchema),
    defaultValues: {
      user_email: profile.user_email,
      user_id: profile.user_id!,
      start_time: currentLocalStartTime.toFormat("yyyy-MM-dd HH:mm:ss"),
      weights_workouts: [],
    },
  });

  const weightsWorkoutsArrForm = useFieldArray({
    control: form.control,
    name: `weights_workouts`,
  });

  function handleAddWorkout() {
    weightsWorkoutsArrForm.append({
      body_part: "arms",
      workout_name: "barbell-curl",
      weights_workouts_sets: [],
      user_email: profile.user_email,
      user_id: profile.user_id!, // NOTE: user_id is not nullable
    });
  }

  function handleRemoveWorkout(idx: number) {
    weightsWorkoutsArrForm.remove(idx);
  }

  async function handleSubmitWorkout(
    data: z.infer<typeof insertDailyWeightsExerciseSchema>,
  ) {
    // NOTE: set startTime to UTC
    const startTime = DateTime.fromFormat(
      data.start_time,
      "yyyy-MM-dd HH:mm:ss",
    );
    const utcStartTime = startTime.toUTC().toFormat("yyyy-MM-dd HH:mm:ss");
    data.start_time = utcStartTime;

    console.log(data);

    const supabase = supabaseClient<Database>();
    const res = await supabase.rpc("add_daily_workouts", {
      body: data,
    });

    console.log("🚀 ~ file: add-workout-dialog.tsx:81 ~ res:", res);
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus className="h-9 w-9" />
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="flex max-h-dvh w-full max-w-3xl flex-col gap-4 overflow-y-auto"
      >
        <DialogTitle>
          <div className="text-2xl">{localWorkoutDate}</div>
        </DialogTitle>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            운동 시작시간:
            <span>{currentLocalStartTime.toFormat("hh:mm")}</span>
          </div>

          <div className="flex gap-2">
            운동 종료시간:<span>일단 비워놓기</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border p-4">
          <Button
            variant={"outline"}
            onClick={handleAddWorkout}
            className="flex items-center"
          >
            <Plus className="h-9 w-9" />
            운동 종목 추가
          </Button>

          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto pr-4">
            {form
              .getValues("weights_workouts")
              .map((weightsWorkout, workoutIdx) => (
                <WeightWorkoutForm
                  key={workoutIdx}
                  workoutIdx={workoutIdx}
                  profile={profile}
                  form={form}
                  handleRemoveWorkout={handleRemoveWorkout}
                />
              ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={form.handleSubmit(handleSubmitWorkout)}>추가</Button>
          <Button onClick={() => setIsDialogOpen(false)}>취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
