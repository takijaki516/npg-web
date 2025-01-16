import { type DailyWorkout } from "@/lib/queries";

interface SetInfoProps {
  setInfoData: DailyWorkout[number]["eachWeightsExercises"][number]["weightsSetInfo"][number];
}

export function SetInfo({ setInfoData }: SetInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex w-[3ch] items-center gap-[1px]">
        <span>#</span>
        <span>{setInfoData.setNumber}</span>
      </div>

      <div className="flex w-[6ch] items-center gap-[2px]">
        <span>횟수:</span>
        <span>{setInfoData.reps}</span>
      </div>

      <div className="flex w-[8ch] items-center gap-[2px]">
        <span>무게:</span>
        <span>{setInfoData.weight}kg</span>
      </div>
    </div>
  );
}
