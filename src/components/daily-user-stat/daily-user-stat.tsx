"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { type Database } from "@/lib/types/database.types";
import { UserHealthInfoStat } from "./user-health-info-stat";
import { UserGoalStat } from "./user-goal-stat";
import { type DailyMealsWithFoods } from "@/supabase-utils/server-queries";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { DailyIntake } from "./daily-intake";
import { DailyTargetIntake } from "./daily-target-intake";

interface DailyUserStatProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  userGoal: Database["public"]["Tables"]["user_goals"]["Row"];
  latestHealthInfo: Database["public"]["Tables"]["health_info"]["Row"] | null;
  dailyMealsData: DailyMealsWithFoods;
  currentDate: string;
}

export function DailyUserStat({
  profile,
  currentDate,
  latestHealthInfo,
  userGoal,
  dailyMealsData,
}: DailyUserStatProps) {
  // const newYorkTime = DateTime.now().setZone(profile.timezone);

  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 text-lg font-semibold">
        <div className="flex items-center gap-2">
          <span>{currentDate}</span>
          <span>
            @{profile.timezone === "Asia/Seoul" ? "Seoul" : "New York"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <UserHealthInfoStat healthInfo={latestHealthInfo} profile={profile} />
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
            {/* <div className="flex flex-col gap-2">
          <Button variant={"outline"} className="flex items-center">
            <span className="flex items-center gap-[2px]">
              <Bot />
              <BicepsFlexed />
            </span>
            <span>
              {profile.language === "ko"
                ? "오늘 운동 생성하기"
                : "Create Today's Exercise"}
            </span>
          </Button>

          <Button variant={"outline"} className="flex items-center">
            <span className="flex items-center gap-[2px]">
              <Bot />
              <CookingPot />
            </span>

            <span>
              {profile.language === "ko"
                ? "오늘 식단 생성하기"
                : "Create Today's Meal"}
            </span>
          </Button>
        </div> */}

            <DailyTargetIntake profile={profile} currentDate={currentDate} />

            <DailyIntake
              profile={profile}
              dailyMealsData={dailyMealsData}
              className="h-full"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export function InfoField({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-lg bg-muted/50 px-3 py-1",
        className,
      )}
    >
      <span className="min-w-20 whitespace-nowrap text-muted-foreground">
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
