import * as React from "react";
import { z } from "zod";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Loader2, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { insertDailyWeightsExerciseSchema } from "@repo/shared-schema";

import { honoClient } from "@/lib/hono";
import {
  GET_DAILY_WEIGHTS_EXERCISES_QUERY_KEY,
  type Profile,
} from "@/lib/queries";
import { WeightWorkoutForm } from "./add-workout-weights";
import { TimePicker } from "@/components/time-picker";
import { MinuteSelector } from "@/components/minute-selector";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

  // TODO: add error handling
  const mutateDailyWeights = useMutation({
    mutationFn: async (
      data: z.infer<typeof insertDailyWeightsExerciseSchema>,
    ) => {
      await honoClient.weights.$post({
        json: data,
      });
    },
    onMutate: async () => {
      console.log(workoutForm.watch());
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_DAILY_WEIGHTS_EXERCISES_QUERY_KEY],
      });

      setIsDialogOpen(false);
      workoutForm.reset();
    },
  });

  const weightsWorkoutsArrForm = useFieldArray({
    control: workoutForm.control,
    name: `weightsWorkouts`,
  });

  function handleAddWorkout() {
    const latestWorkoutIdx = weightsWorkoutsArrForm.fields.length;

    if (latestWorkoutIdx === 0) {
      weightsWorkoutsArrForm.append({
        bodyPart: "가슴",
        workoutName: "",
        weightsWorkoutsSets: [],
      });

      return;
    }

    weightsWorkoutsArrForm.append({
      bodyPart: workoutForm.getValues(
        `weightsWorkouts.${latestWorkoutIdx - 1}.bodyPart`,
      ),
      workoutName: "",
      weightsWorkoutsSets: [],
    });
  }

  function handleRemoveWorkout(idx: number) {
    weightsWorkoutsArrForm.remove(idx);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="rounded-md p-1 transition-colors hover:bg-muted">
        <Plus />
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="flex h-full max-h-[calc(100dvh-80px)] w-full max-w-xl flex-col gap-4 overflow-y-auto rounded-lg"
      >
        <DialogTitle>
          <div className="text-2xl">{justDate}</div>
        </DialogTitle>

        {/*  */}
        <div className="flex flex-col gap-1">
          <div className="flex w-[180px] items-center justify-between gap-2 rounded-md bg-muted/50 px-2 py-1">
            <span className="whitespace-nowrap text-muted-foreground">
              시작 시간
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

          <div className="flex w-[180px] items-center justify-between gap-2 rounded-md bg-muted/50 px-2 py-1">
            <span className="whitespace-nowrap text-muted-foreground">
              운동 시간
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
        </div>

        {/*  */}
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
            {weightsWorkoutsArrForm.fields.map((field, workoutIdx) => {
              return (
                <WeightWorkoutForm
                  key={field.id}
                  workoutIdx={workoutIdx}
                  form={workoutForm}
                  handleRemoveWorkout={handleRemoveWorkout}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            disabled={mutateDailyWeights.isPending}
            onClick={workoutForm.handleSubmit((data) => {
              mutateDailyWeights.mutate(data);
            })}
          >
            {mutateDailyWeights.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : profile.language === "ko" ? (
              "추가"
            ) : (
              "Add"
            )}
          </Button>
          <Button onClick={() => setIsDialogOpen(false)}>
            {profile.language === "ko" ? "취소" : "Cancel"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
