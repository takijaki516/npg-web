import {
  getOrCreateGoal,
  getDailyMealsWithFoods,
  getDailyWeightsExerciseWithAllInfos,
  getProfile,
} from "@/supabase-utils/server-queries";

import { MeHeader } from "@/components/me-header";
import { BentoDashboard } from "./bento-dashboard";
import { convertToRangeOfDayInUTCTime } from "@/lib/utils";

export default async function MePage() {
  const profile = await getProfile();

  if (!profile || !profile.user_id) {
    return null;
  }

  const userDateTime = new Date().toLocaleDateString("sv-SE", {
    timeZone: profile.timezone,
  });

  const { startTimeOfDay, endTimeOfDay } = convertToRangeOfDayInUTCTime({
    localDate: userDateTime,
    timeZone: profile.timezone,
  });

  if (!startTimeOfDay || !endTimeOfDay) {
    return null;
  }

  //
  const userGoal = await getOrCreateGoal(profile.user_email, profile.user_id);
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
          />
        </main>
      </div>
    </div>
  );
}
