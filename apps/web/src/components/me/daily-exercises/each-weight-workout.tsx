import * as React from "react";
import {
  PersonStanding,
  Dumbbell,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { type DailyWeightsExercisesWithAllInfos } from "@/lib/queries";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SetInfo } from "@/components/me/daily-exercises/set-info";
import { cn } from "@/lib/utils";

interface EachWeightWorkoutProps {
  eachWeightWorkoutData: DailyWeightsExercisesWithAllInfos[number]["eachWeightsExercises"][number];
}

export function EachWeightWorkout({
  eachWeightWorkoutData,
}: EachWeightWorkoutProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  return (
    <div className="flex flex-col rounded-md border p-1">
      <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
        <CollapsibleTrigger className="flex items-center">
          {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}

          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <PersonStanding />
              {eachWeightWorkoutData.bodyPart}
            </div>

            <div className="flex items-center gap-1">
              <Dumbbell />
              {eachWeightWorkoutData.workoutName}
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
