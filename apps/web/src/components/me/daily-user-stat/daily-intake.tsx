import { UserHealthInfoStat } from "./user-health-info-stat";
import { UserGoalStat } from "./user-goal-stat";
import type { DailyIntake, HealthInfo, UserGoal, Profile } from "@/lib/queries";
import { cn } from "@/lib/utils";

interface DailyIntakeProps {
  dailyIntake: DailyIntake;
  profile: Profile;
  userGoal: UserGoal;
  latestHealthInfo: HealthInfo;
}

export function DailyIntake({
  dailyIntake,
  profile,
  userGoal,
  latestHealthInfo,
}: DailyIntakeProps) {
  if (!dailyIntake.llmDescription) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="relative rounded-md border border-border p-12">
          <div className="absolute right-2 top-2 flex gap-2">
            <UserHealthInfoStat
              profile={profile}
              healthInfo={latestHealthInfo}
            />

            <UserGoalStat profile={profile} userGoal={userGoal} />
          </div>
        </div>
      </div>
    );
  }
  return <div className={cn("flex gap-2")}></div>;
}
