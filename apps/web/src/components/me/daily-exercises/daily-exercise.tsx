import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getCurrentTimeInTimezone, utcToLocalTime } from "@/lib/utils";
import { useDateTimeStore } from "@/lib/zustand/time-store";
import {
  deleteDailyWeightsExerciseMutationFn,
  GET_DAILY_WEIGHTS_EXERCISES_QUERY_KEY,
  type DailyWeightsExercisesWithAllInfos,
  type Profile,
} from "@/lib/queries";
import { EachWeightWorkout } from "@/components/me/daily-exercises/each-weight-workout";
import { DeleteButton } from "@/components/delete-button";

interface DailyExerciseProps {
  profile: Profile;
  dailyWeightsExercise: DailyWeightsExercisesWithAllInfos[number];
}

export function DailyExercise({
  profile,
  dailyWeightsExercise,
}: DailyExerciseProps) {
  const localDateTime = utcToLocalTime({
    utcTime: dailyWeightsExercise.startTime,
    timezone: profile.timezone,
  });

  const [hh, mm] = localDateTime.split(" ")[1].split(":");

  const setCurrentDateTime = useDateTimeStore(
    (state) => state.setCurrentDateTime,
  );

  const queryClient = useQueryClient();

  const dailyExerciseMutate = useMutation({
    mutationFn: (id: string) => deleteDailyWeightsExerciseMutationFn({ id }),
    onSettled: async () => {
      const currentTime = getCurrentTimeInTimezone(profile.timezone);
      setCurrentDateTime(currentTime);

      await queryClient.invalidateQueries({
        queryKey: [GET_DAILY_WEIGHTS_EXERCISES_QUERY_KEY, currentTime],
      });
    },
    // TODO: error handling
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="flex w-full flex-col gap-1 overflow-x-auto rounded-md border p-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-grow flex-wrap items-center gap-1">
          <div className="flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1">
            <span className="truncate">시작 시간</span>
            <span className="">{`${hh}:${mm}`}</span>
          </div>

          <div className="flex items-center gap-1 rounded-md bg-muted/80 px-2 py-1">
            <span className="truncate">운동 시간</span>
            <span className="">{dailyWeightsExercise.durationMinutes}분</span>
          </div>
        </div>

        <DeleteButton
          onClick={() => {
            dailyExerciseMutate.mutate(dailyWeightsExercise.id);
          }}
          isPending={dailyExerciseMutate.isPending}
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
