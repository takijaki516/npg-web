import * as React from "react";
import { z } from "zod";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Dumbbell, Loader2, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouteContext } from "@tanstack/react-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { insertDailyWorkoutSchema } from "@repo/shared-schema";
import { toast } from "sonner";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import { GET_DAILY_WORKOUT_QUERY_KEY, insertWorkout } from "@/lib/queries";
import { WeightWorkoutForm } from "./add-workout-weights";
import { TimePicker } from "@/components/time-picker";
import { MinuteSelector } from "@/components/minute-selector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function AddWorkoutDialog() {
  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );

  const queryClient = useQueryClient();
  const { profile } = useRouteContext({
    from: "/(user)/_layout",
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const workoutForm = useForm<z.infer<typeof insertDailyWorkoutSchema>>({
    resolver: zodResolver(insertDailyWorkoutSchema),
    defaultValues: {
      startTime: currentLocalDateTime,
      durationMinutes: 5,
      weightsWorkouts: [],
    },
  });

  const insertDailyWeights = useMutation({
    mutationFn: async (data: z.infer<typeof insertDailyWorkoutSchema>) =>
      await insertWorkout(data),
    onSuccess: async (data) => {
      setIsDialogOpen(false);
      workoutForm.reset();
      toast.success("운동 추가에 성공했습니다.");

      await queryClient.invalidateQueries({
        queryKey: [GET_DAILY_WORKOUT_QUERY_KEY, data.startTime.split(" ")[0]],
      });
    },
    onError: () => {
      setIsDialogOpen(false);
      workoutForm.reset();

      toast.error("운동 추가에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const weightsArrForm = useFieldArray({
    control: workoutForm.control,
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
      bodyPart: workoutForm.getValues(
        `weightsWorkouts.${latestWeightsIdx - 1}.bodyPart`,
      ),
      workoutName: "",
      weightsWorkoutsSets: [],
    });
  }, [workoutForm, weightsArrForm]);

  const handleRemoveWeight = React.useCallback(
    (idx: number) => {
      weightsArrForm.remove(idx);
    },
    [weightsArrForm],
  );

  React.useEffect(() => {
    workoutForm.reset({
      startTime: currentLocalDateTime,
      durationMinutes: 5,
      weightsWorkouts: [],
    });
  }, [workoutForm, currentLocalDateTime]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="rounded-md p-1 transition-colors hover:bg-muted">
        <Plus />
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="dialog-content"
      >
        <DialogTitle className="flex items-center gap-2">
          <Dumbbell size={20} />
          <div className="text-lg xs:text-2xl">
            {currentLocalDateTime.split(" ")[0]}
          </div>
        </DialogTitle>
        <DialogDescription className="sr-only">
          Add workout dialog
        </DialogDescription>

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
                <MinuteSelector setValue={field.onChange} value={field.value} />
              )}
            />
          </div>
        </div>

        <Button
          variant={"outline"}
          onClick={handleAddWeights}
          className="flex items-center"
        >
          <Plus className="h-9 w-9" />
          운동 종목 추가
        </Button>

        <div className="flex flex-1 flex-col gap-2">
          {weightsArrForm.fields.map((field, workoutIdx) => {
            return (
              <WeightWorkoutForm
                key={field.id}
                workoutIdx={workoutIdx}
                form={workoutForm}
                handleRemoveWorkout={handleRemoveWeight}
              />
            );
          })}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant={"secondary"} onClick={() => setIsDialogOpen(false)}>
            취소
          </Button>

          <Button
            disabled={insertDailyWeights.isPending}
            onClick={workoutForm.handleSubmit((data) => {
              insertDailyWeights.mutate(data);
            })}
          >
            {insertDailyWeights.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "추가"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
