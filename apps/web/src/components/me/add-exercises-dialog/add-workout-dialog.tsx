import * as React from "react";
import { z } from "zod";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { insertDailyWeightsExerciseSchema } from "@repo/shared-schema";

import { honoClient } from "@/lib/hono";
import type { Profile } from "@/lib/queries";
import { WeightWorkoutForm } from "./add-workout-weights";
import { TimePicker } from "@/components/time-picker";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MinuteSelector } from "@/components/minute-selector";

interface AddWorkoutDialogProps {
  profile: Profile;
  currentLocalDateTime: string;
}

export function AddWorkoutDialog({
  profile,
  currentLocalDateTime,
}: AddWorkoutDialogProps) {
  const justDate = currentLocalDateTime.split(" ")[0];

  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const workoutForm = useForm<z.infer<typeof insertDailyWeightsExerciseSchema>>(
    {
      resolver: zodResolver(insertDailyWeightsExerciseSchema),
      defaultValues: {
        profileEmail: profile.email,
        timezone: profile.timezone,
        startTime: currentLocalDateTime,
        durationMinutes: 5,
        weightsWorkouts: [],
      },
    },
  );

  const weightsWorkoutsArrForm = useFieldArray({
    control: workoutForm.control,
    name: `weightsWorkouts`,
  });

  function handleAddWorkout() {
    weightsWorkoutsArrForm.append({
      bodyPart: "arms",
      workoutName: "barbell-curl",
      weightsWorkoutsSets: [],
    });
  }

  function handleRemoveWorkout(idx: number) {
    weightsWorkoutsArrForm.remove(idx);
  }

  async function handleSubmitWorkout(
    data: z.infer<typeof insertDailyWeightsExerciseSchema>,
  ) {
    console.log("🚀 ~ file: add-workout-dialog.tsx:75 ~ data:", data);

    const res = await honoClient.weights.$post({
      json: data,
    });

    if (res.status === 200) {
      await queryClient.invalidateQueries({ queryKey: ["weights"] });
    }

    workoutForm.reset();
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="rounded-full p-1 hover:bg-muted">
        <Plus />
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="flex h-full max-h-[calc(100dvh-80px)] w-full max-w-xl flex-col gap-4 overflow-y-auto"
      >
        <DialogTitle>
          <div className="text-2xl">{justDate}</div>
        </DialogTitle>

        <div className="group flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-muted/50 px-3 py-1">
          <span className="whitespace-nowrap text-muted-foreground">
            운동 시간
          </span>

          <Controller
            name="startTime"
            control={workoutForm.control}
            render={({ field }) => (
              <TimePicker
                value={field.value}
                setValue={field.onChange}
                userLanguage={profile.language}
                timezone={profile.timezone}
              />
            )}
          />
        </div>

        <div className="group flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-muted/50 px-3 py-1">
          <span className="whitespace-nowrap text-muted-foreground">
            운동 시간:
          </span>

          <Controller
            name="durationMinutes"
            control={workoutForm.control}
            render={({ field }) => (
              <MinuteSelector
                setValue={field.onChange}
                value={field.value.toString()}
              />
            )}
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
            {workoutForm.getValues("weightsWorkouts").map((_, workoutIdx) => {
              return (
                <WeightWorkoutForm
                  key={workoutIdx}
                  workoutIdx={workoutIdx}
                  form={workoutForm}
                  handleRemoveWorkout={handleRemoveWorkout}
                />
              );
            })}
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
