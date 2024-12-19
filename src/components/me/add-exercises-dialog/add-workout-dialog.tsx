import * as React from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Clock, Plus } from "lucide-react";
import { DateTime } from "luxon";

import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../../from-next/src/components/ui/dialog";
import { Button } from "../../../../from-next/src/components/ui/button";
import { Database } from "../../../../from-next/src/lib/types/database.types";
import { insertDailyWeightsExerciseSchema } from "@/lib/schemas/exercise.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { WeightWorkoutForm } from "./add-workout-weights";
import { TimePicker } from "../../../../from-next/src/components/time-picker";

interface AddWorkoutDialogProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function AddWorkoutDialog({ profile }: AddWorkoutDialogProps) {
  const currentLocalStartTime = DateTime.now();
  const currentLocalEndTime = DateTime.now().plus({ hours: 1 });
  const localWorkoutDate = currentLocalStartTime.toFormat("yyyy-MM-dd");

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // start time picker
  const [isStartTimePickerOpen, setIsStartTimePickerOpen] =
    React.useState(false);
  const [startSelectedHour, setStartSelectedHour] = React.useState(
    currentLocalStartTime.toFormat("HH"),
  );
  const [startSelectedMinute, setStartSelectedMinute] = React.useState(
    currentLocalStartTime.toFormat("mm"),
  );

  // end time picker
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] = React.useState(false);
  const [endSelectedHour, setEndSelectedHour] = React.useState(
    currentLocalEndTime.toFormat("HH"),
  );
  const [endSelectedMinute, setEndSelectedMinute] = React.useState(
    currentLocalEndTime.toFormat("mm"),
  );

  const workoutForm = useForm<z.infer<typeof insertDailyWeightsExerciseSchema>>(
    {
      resolver: zodResolver(insertDailyWeightsExerciseSchema),
      defaultValues: {
        user_email: profile.user_email,
        user_id: profile.user_id!,
        start_time: currentLocalStartTime.toFormat("yyyy-MM-dd HH:mm:ss"),
        weights_workouts: [],
      },
    },
  );

  const weightsWorkoutsArrForm = useFieldArray({
    control: workoutForm.control,
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

    const res = await supabase.rpc("add_daily_workouts", {
      body: data,
    });

    console.log(
      "🚀 ~ file: add-workout-dialog.tsx:96 ~ AddWorkoutDialog ~ res:",
      res,
    );

    setIsDialogOpen(false);
  }

  React.useEffect(() => {
    workoutForm.setValue(
      "start_time",
      `${localWorkoutDate} ${startSelectedHour}:${startSelectedMinute}:00`,
    );
  }, [startSelectedHour, startSelectedMinute]);

  React.useEffect(() => {
    workoutForm.setValue(
      "end_time",
      `${localWorkoutDate} ${endSelectedHour}:${endSelectedMinute}:00`,
    );
  }, [endSelectedHour, endSelectedMinute]);

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
        className="flex h-full max-h-[calc(100dvh-80px)] w-full max-w-xl flex-col gap-4 overflow-y-auto"
      >
        <DialogTitle>
          <div className="text-2xl">{localWorkoutDate}</div>
        </DialogTitle>

        <div className="group flex w-fit cursor-pointer items-center gap-1 rounded-lg bg-muted/50 px-3 py-1">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="whitespace-nowrap text-muted-foreground">
              운동 시작시간:
            </span>
          </span>

          <TimePicker
            selectedHour={startSelectedHour}
            selectedMinute={startSelectedMinute}
            setSelectedHour={setStartSelectedHour}
            setSelectedMinute={setStartSelectedMinute}
            isTimePickerOpen={isStartTimePickerOpen}
            setIsTimePickerOpen={setIsStartTimePickerOpen}
            userLanguage={profile.language}
          />
        </div>

        <div className="group flex w-fit cursor-pointer items-center gap-1 rounded-lg bg-muted/50 px-3 py-1">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="whitespace-nowrap text-muted-foreground">
              운동 종료시간:
            </span>
          </span>

          <TimePicker
            selectedHour={endSelectedHour}
            selectedMinute={endSelectedMinute}
            setSelectedHour={setEndSelectedHour}
            setSelectedMinute={setEndSelectedMinute}
            isTimePickerOpen={isEndTimePickerOpen}
            setIsTimePickerOpen={setIsEndTimePickerOpen}
            userLanguage={profile.language}
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 rounded-md">
          <Button
            variant={"outline"}
            onClick={handleAddWorkout}
            className="flex items-center"
          >
            <Plus className="h-9 w-9" />
            운동 종목 추가
          </Button>

          <div className="flex max-h-[500px] flex-col gap-4 overflow-y-auto">
            {workoutForm
              .getValues("weights_workouts")
              .map((weightsWorkout, workoutIdx) => (
                <WeightWorkoutForm
                  key={workoutIdx}
                  workoutIdx={workoutIdx}
                  profile={profile}
                  form={workoutForm}
                  handleRemoveWorkout={handleRemoveWorkout}
                />
              ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={workoutForm.handleSubmit(handleSubmitWorkout)}>
            추가
          </Button>
          <Button onClick={() => setIsDialogOpen(false)}>취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
