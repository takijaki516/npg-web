import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import {
  deleteWorkout,
  GET_DAILY_WORKOUT_QUERY_KEY,
  type DailyWorkout,
} from "@/lib/queries";
import { EachWeightWorkout } from "./each-weight-workout";
import { ModifyWorkoutDialog } from "./modify-workout-dialog";
import { DeleteButton } from "@/components/delete-button";

interface DailyExerciseProps {
  dailyWeightsExercise: DailyWorkout[number];
}

export function DailyExercise({ dailyWeightsExercise }: DailyExerciseProps) {
  const [hh, mm] = dailyWeightsExercise.startTime.split(" ")[1].split(":");

  const queryClient = useQueryClient();

  const dailyExerciseDeleteMutation = useMutation({
    mutationFn: async (id: string) => await deleteWorkout({ id }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          GET_DAILY_WORKOUT_QUERY_KEY,
          dailyWeightsExercise.startTime.split(" ")[0],
        ],
      });
      toast.success("삭제에 성공하였어요");
    },
    onError: () => {
      toast.error("삭제에 실패하였어요. 잠시 후 다시 시도해주세요");
    },
  });

  return (
    <div className="relative flex w-full flex-col gap-1 overflow-x-auto rounded-md border p-2">
      {dailyExerciseDeleteMutation.isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80 p-4">
          <Loader2 className="animate-spin" />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-grow flex-wrap items-center gap-1">
          <div className="flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1">
            <span className="truncate">시작 시간</span>
            <span>{`${hh}:${mm}`}</span>
          </div>

          <div className="flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1">
            <span className="truncate">운동 시간</span>
            <span>{dailyWeightsExercise.durationMinutes}분</span>
          </div>

          <ModifyWorkoutDialog
            // HACK: to remount a dialog when the workout is updated fix this
            key={uuidv4()}
            dailyWeightsExercise={dailyWeightsExercise}
          />
        </div>

        <DeleteButton
          dialog={true}
          deleteFunction={() => {
            dailyExerciseDeleteMutation.mutate(dailyWeightsExercise.id);
          }}
        />
      </div>

      {dailyWeightsExercise.eachWeightsExercises.map((eachWeights) => {
        return (
          <EachWeightWorkout
            key={eachWeights.id}
            eachWeightWorkoutData={eachWeights}
          />
        );
      })}
    </div>
  );
}
