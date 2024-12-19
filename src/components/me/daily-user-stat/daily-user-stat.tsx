import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getRouteApi } from "@tanstack/react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../from-next/src/components/ui/collapsible";
import { UserHealthInfoStat } from "./user-health-info-stat";
import { UserGoalStat } from "./user-goal-stat";
import { DailyIntake, type DailyIntakeData } from "./daily-intake";
import { DailyGoalIntake, type DailyGoalIntakeData } from "./daily-goal-intake";

export function DailyUserStat() {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const routeApi = getRouteApi("/(user)/_layout/me");
  const {
    profile,
    userGoal,
    currentLocalDateTime,
    healthInfo,
    dailyIntake,
    dailyMealsWithFoods,
  } = routeApi.useLoaderData();

  const dailyGoalIntakeData = {
    llmDescription: dailyIntake.llm_description,
    goalCalories: dailyIntake.goal_calories_kcal,
    goalCarbohydrate: dailyIntake.goal_carbohydrate_g,
    goalFat: dailyIntake.goal_fat_g,
    goalProtein: dailyIntake.goal_protein_g,
  } satisfies DailyGoalIntakeData;

  // const dailyIntakeData = {
  //   calories: dailyIntake.intake_calories_kcal,
  //   carbohydrates: dailyIntake.intake_carbohydrate_g,
  //   protein: dailyIntake.intake_protein_g,
  //   fat: dailyIntake.intake_fat_g,
  // } satisfies DailyIntakeData;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 text-lg font-semibold">
        <div className="flex items-center gap-2">
          <span>{currentLocalDateTime}</span>
          <span>
            @{profile.timezone === "Asia/Seoul" ? "Seoul" : "New York"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <UserHealthInfoStat profile={profile} healthInfo={healthInfo} />
          <UserGoalStat userGoal={userGoal} profile={profile} />
        </div>
      </div>

      <Collapsible
        open={isCollapsibleOpen}
        onOpenChange={setIsCollapsibleOpen}
        className="relative min-h-10"
      >
        <CollapsibleTrigger className="absolute top-1 flex items-center gap-6">
          {isCollapsibleOpen ? (
            <ChevronDown size={24} />
          ) : (
            <ChevronRight size={24} />
          )}
          {!isCollapsibleOpen && (
            <span className="font-bold">
              {profile.language === "ko" ? "더보기" : "More"}
            </span>
          )}
        </CollapsibleTrigger>

        <CollapsibleContent className="ml-12 flex flex-col gap-2">
          <div className="grid justify-between gap-4 xs:grid-cols-2 sm:grid-cols-3">
            <DailyGoalIntake
              profile={profile}
              currentDate={currentLocalDateTime}
              dailyGoalIntakeData={dailyGoalIntakeData}
            />

            <DailyIntake
              profile={profile}
              dailyMealsData={dailyMealsWithFoods}
              className="h-full"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
