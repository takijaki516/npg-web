import * as React from "react";
import {
  PersonStanding,
  Dumbbell,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { type DailyWeightsExercisesWithAllInfos } from "@/lib/queries";
import { SetInfo } from "@/components/me/daily-exercises/set-info";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface EachWeightWorkoutProps {
  eachWeightWorkoutData: DailyWeightsExercisesWithAllInfos[number]["eachWeightsExercises"][number];
}

export function EachWeightWorkout({
  eachWeightWorkoutData,
}: EachWeightWorkoutProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  return (
    <div className="flex flex-col rounded-md border p-1 transition-colors hover:bg-muted/50">
      <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
        <CollapsibleTrigger className="flex w-full items-center">
          {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}

          <div className="flex w-full flex-1 items-center gap-6">
            <div className="flex flex-[1_1_0%] items-center gap-[2px]">
              <PersonStanding size={18} />
              <span className="break-keep">
                {eachWeightWorkoutData.bodyPart}
              </span>
            </div>

            <div className="flex flex-[3_1_0%] items-center gap-[2px]">
              <Dumbbell size={18} />
              <span className="break-keep">
                {eachWeightWorkoutData.workoutName}
              </span>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(
            "ml-3 flex flex-col gap-2 border-l pl-3",
            isCollapsibleOpen ? "mt-1" : "",
          )}
        >
          {eachWeightWorkoutData.weightsSetInfo.map((setInfo) => (
            <SetInfo key={setInfo.id} setInfoData={setInfo} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
