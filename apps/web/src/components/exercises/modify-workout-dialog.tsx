import * as React from "react";
import { Loader2, Plus, Settings } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { insertDailyWorkoutSchema } from "@repo/shared-schema";

import {
  GET_DAILY_WORKOUT_QUERY_KEY,
  updateWorkout,
  type DailyWorkout,
} from "@/lib/queries";
import { TimePicker } from "@/components/time-picker";
import { MinuteSelector } from "@/components/minute-selector";
import { WeightWorkoutForm } from "./add-workout-weights";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModifyWorkoutDialogProps {
  dailyWeightsExercise: DailyWorkout[number];
}

export function ModifyWorkoutDialog({
  dailyWeightsExercise,
}: ModifyWorkoutDialogProps) {
  const queryClient = useQueryClient();
  const { profile } = useRouteContext({
    from: "/(user)/_layout",
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const modifyWorkoutForm = useForm<z.infer<typeof insertDailyWorkoutSchema>>({
    resolver: zodResolver(insertDailyWorkoutSchema),
    defaultValues: {
      id: dailyWeightsExercise.id,
      durationMinutes: dailyWeightsExercise.durationMinutes,
      startTime: dailyWeightsExercise.startTime,
      weightsWorkouts: dailyWeightsExercise.eachWeightsExercises.map(
        (eachWeightsExercise) => ({
          bodyPart: eachWeightsExercise.bodyPart,
          workoutName: eachWeightsExercise.workoutName,
          weightsWorkoutsSets: eachWeightsExercise.weightsSetInfo.map(
            (weightsSetInfo) => ({
              reps: weightsSetInfo.reps,
              weightKg: weightsSetInfo.weight,
            }),
          ),
        }),
      ),
    },
  });

  const updateDailyWeights = useMutation({
    mutationFn: async (data: z.infer<typeof insertDailyWorkoutSchema>) =>
      await updateWorkout(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [GET_DAILY_WORKOUT_QUERY_KEY, data.startTime.split(" ")[0]],
      });
      toast.success("운동 추가에 성공했습니다.");
      setIsDialogOpen(false);
      modifyWorkoutForm.reset();
    },
    onError: () => {
      setIsDialogOpen(false);
      modifyWorkoutForm.reset();

      toast.error("운동 추가에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const weightsArrForm = useFieldArray({
    control: modifyWorkoutForm.control,
    name: `weightsWorkouts`,
  });

  const handleAddWeights = React.useCallback(() => {
    const latestWeightsIdx = weightsArrForm.fields.length;

    if (latestWeightsIdx === 0) {
      weightsArrForm.append({
        bodyPart: "가슴",
        workoutName: "",
        weightsWorkoutsSets: [],
      });
      return;
    }

    weightsArrForm.append({
      bodyPart: modifyWorkoutForm.getValues(
        `weightsWorkouts.${latestWeightsIdx - 1}.bodyPart`,
      ),
      workoutName: "",
      weightsWorkoutsSets: [],
    });
  }, [weightsArrForm, modifyWorkoutForm]);

  const handleRemoveWeight = React.useCallback(
    (idx: number) => {
      weightsArrForm.remove(idx);
    },
    [weightsArrForm],
  );

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(v) => {
        if (!v) {
          modifyWorkoutForm.reset();
        }
        setIsDialogOpen(v);
      }}
    >
      <DialogTrigger className="rounded-md p-1 transition-colors hover:bg-muted">
        <Settings />
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="dialog-content"
      >
        <DialogTitle>
          <div className="text-lg xs:text-2xl">
            {modifyWorkoutForm.watch("startTime").split(" ")[0]}
          </div>
        </DialogTitle>

        <div className="flex flex-col gap-1">
          <div className="flex w-[180px] items-center justify-between gap-2 rounded-md bg-muted/50 px-2 py-1">
            <span className="whitespace-nowrap text-muted-foreground">
              시작 시간
            </span>

            <Controller
              name="startTime"
              control={modifyWorkoutForm.control}
              render={({ field }) => (
                <TimePicker
                  value={field.value}
                  setValue={field.onChange}
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
              control={modifyWorkoutForm.control}
              render={({ field }) => (
                <MinuteSelector setValue={field.onChange} value={field.value} />
              )}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 rounded-md">
          <Button
            variant={"outline"}
            onClick={handleAddWeights}
            className="flex items-center"
          >
            <Plus className="h-9 w-9" />
            운동 종목 추가
          </Button>

          <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto">
            {weightsArrForm.fields.map((field, workoutIdx) => {
              return (
                <WeightWorkoutForm
                  key={field.id}
                  workoutIdx={workoutIdx}
                  form={modifyWorkoutForm}
                  handleRemoveWorkout={handleRemoveWeight}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant={"secondary"}
            onClick={() => {
              modifyWorkoutForm.reset();
              setIsDialogOpen(false);
            }}
          >
            취소
          </Button>

          <Button
            disabled={updateDailyWeights.isPending}
            onClick={modifyWorkoutForm.handleSubmit((data) => {
              updateDailyWeights.mutate(data);
            })}
          >
            {updateDailyWeights.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "수정"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
