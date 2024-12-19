import {
  getOrCreateGoal,
  getDailyMealsWithFoods,
  getDailyWeightsExerciseWithAllInfos,
  getProfile,
  getLatestHealthInfo,
  getOrCreateDailyIntake,
} from "../../supabase-utils/server-queries";

import { MeHeader } from "../../components/me-header";
import { BentoDashboard } from "./bento-dashboard";
import { convertToRangeOfDayUTCTime } from "../../lib/utils";
import { type DailyGoalIntakeData } from "../../components/daily-user-stat/daily-goal-intake";
import { DailyIntakeData } from "../../components/daily-user-stat/daily-intake";

export default async function MePage() {
  const profile = await getProfile();

  if (!profile || !profile.user_id) {
    return null;
  }

  const userDateTime = new Date().toLocaleDateString("sv-SE", {
    timeZone: profile.timezone,
  });

  const { startTimeOfDay, endTimeOfDay } = convertToRangeOfDayUTCTime({
    localDate: userDateTime,
    timeZone: profile.timezone,
  });

  if (!startTimeOfDay || !endTimeOfDay) {
    return null;
  }

  const userGoal = await getOrCreateGoal(profile.user_email, profile.user_id);
  const dailyIntakes = await getOrCreateDailyIntake(
    profile.user_email,
    profile.user_id,
    startTimeOfDay,
    endTimeOfDay,
  );

  if (!userGoal || !dailyIntakes) {
    return null;
  }

  const healthInfo = await getLatestHealthInfo(profile.user_id);
  const dailyExercisesData = await getDailyWeightsExerciseWithAllInfos(
    startTimeOfDay,
    endTimeOfDay,
  );
  const dailyMealsData = await getDailyMealsWithFoods(
    startTimeOfDay,
    endTimeOfDay,
  );

  if (!dailyExercisesData || !dailyMealsData) {
    return null;
  }

  const dailyGoalIntakeData = {
    llmDescription: dailyIntakes.llm_description,
    goalCalories: dailyIntakes.goal_calories_kcal,
    goalCarbohydrate: dailyIntakes.goal_carbohydrate_g,
    goalFat: dailyIntakes.goal_fat_g,
    goalProtein: dailyIntakes.goal_protein_g,
  } satisfies DailyGoalIntakeData;

  const dailyIntakeData = {
    calories: dailyIntakes.intake_calories_kcal,
    carbohydrates: dailyIntakes.intake_carbohydrate_g,
    protein: dailyIntakes.intake_protein_g,
    fat: dailyIntakes.intake_fat_g,
  } satisfies DailyIntakeData;

  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center">
      <MeHeader currentPageTitle={`${profile.username}`} />

      <div className="flex w-full max-w-3xl flex-col p-4 pb-[100px] md:pt-6">
        <main className="flex flex-col lg:w-full lg:items-center">
          <BentoDashboard
            displayDate={userDateTime}
            userGoal={userGoal}
            dailyExercisesData={dailyExercisesData}
            dailyMealsData={dailyMealsData}
            profile={profile}
            latestHealthInfo={healthInfo}
            dailyGoalIntakeData={dailyGoalIntakeData}
            dailyIntakeData={dailyIntakeData}
          />
        </main>
      </div>
    </div>
  );
}
