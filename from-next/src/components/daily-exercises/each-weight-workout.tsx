"use client";

import * as React from "react";
import {
  PersonStanding,
  Dumbbell,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { type DailyWeightsExercisesWithAllInfos } from "../../supabase-utils/server-queries";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { SetInfo } from "./set-info";

interface EachWeightWorkoutProps {
  eachWeightWorkoutData: DailyWeightsExercisesWithAllInfos[number]["each_weights_exercises"][number];
}

export function EachWeightWorkout({
  eachWeightWorkoutData,
}: EachWeightWorkoutProps) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  return (
    <div className="flex flex-col rounded-md border p-2">
      <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
        <CollapsibleTrigger className="flex items-center gap-2">
          {isCollapsibleOpen ? <ChevronDown /> : <ChevronRight />}

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <PersonStanding />
              {eachWeightWorkoutData.body_part}
            </div>

            <div className="flex items-center gap-1">
              <Dumbbell />
              {eachWeightWorkoutData.workout_name}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="ml-3 mt-3 flex flex-col gap-2 border-l pl-3">
          {eachWeightWorkoutData.each_weights_exercises_set_info.map(
            (setInfo) => (
              <SetInfo key={setInfo.id} setInfoData={setInfo} />
            ),
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
