import { type DailyWeightsExercisesWithAllInfos } from "@/lib/queries";

interface SetInfoProps {
  setInfoData: DailyWeightsExercisesWithAllInfos[number]["eachWeightsExercises"][number]["weightsSetInfo"][number];
}

export function SetInfo({ setInfoData }: SetInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <div>
        <span>#</span>
      </div>

      <div>
        <span>횟수:</span>
        <span>{setInfoData.reps}</span>
      </div>

      <div>
        <span>무게:</span>
        <span>{setInfoData.weight}</span>
      </div>
    </div>
  );
}
