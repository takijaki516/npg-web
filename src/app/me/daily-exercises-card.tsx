import { type DailyWeightsExercisesWithAllInfos } from "@/supabase-utils/server-queries";
import { AddWorkoutDialog } from "./add-workout-dialog";
import { type Database } from "@/lib/types/database.types";

interface DailyExercisesCardProps {
  localWorkoutDate: string;
  dailyExercisesData: DailyWeightsExercisesWithAllInfos;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function DailyExercisesCard({
  localWorkoutDate,
  dailyExercisesData,
  profile,
}: DailyExercisesCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>오늘의 운동</div>

        <AddWorkoutDialog
          localWorkoutDate={localWorkoutDate}
          profile={profile}
        />
      </div>

      {dailyExercisesData.length === 0 && <div>아직 등록된 운동이 없어요</div>}

      {dailyExercisesData.length > 0 &&
        dailyExercisesData.map((exercise) => {
          return (
            <div key={exercise.id}>
              <div>{exercise.start_time}</div>
              <div>{exercise.end_time}</div>

              {exercise.each_weights_exercises.map((weightsExercise) => {
                return (
                  <div key={weightsExercise.id}>
                    {weightsExercise.each_weights_exercises_set_info.map(
                      (set_infos) => {
                        return (
                          <div key={set_infos.id}>
                            <div>{set_infos.kg}</div>
                            <div>{set_infos.reps}</div>
                          </div>
                        );
                      },
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
