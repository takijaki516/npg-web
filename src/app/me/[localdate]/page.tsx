import {
  getOrCreateGoal,
  getDailyMealsWithFoods,
  getDailyWeightsExerciseWithAllInfos,
  getProfile,
} from "@/supabase-utils/server-queries";
import { convertToRangeOfDayInUTCTime } from "@/lib/utils";
import { MeHeader } from "@/components/me-header";
import { BentoDashboard } from "../bento-dashboard";

export default async function MePage({
  params,
}: {
  params: Promise<{ localdate: string }>;
}) {
  const profile = await getProfile();

  if (!profile || !profile.user_id) {
    return null;
  }

  const paramsObj = await params;

  const userDateTime = paramsObj.localdate.replace(
    /(\d{4})(\d{2})(\d{2})/,
    "$1-$2-$3",
  );
  const userTimeZone = "Asia/Seoul";

  const { startTimeOfDay, endTimeOfDay } = convertToRangeOfDayInUTCTime({
    localDate: userDateTime,
    timeZone: userTimeZone,
  });

  if (!startTimeOfDay || !endTimeOfDay) {
    return null;
  }

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

  if (!dailyExercisesData || !dailyMealsData) {
    return null;
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center">
      <MeHeader currentPageTitle={`${profile.username}님`} />

      <div className="flex w-full max-w-3xl flex-col p-4 pb-[100px] md:pt-6">
        <main className="flex flex-col lg:w-full lg:items-center">
          <BentoDashboard
            displayDate={userDateTime}
            userGoal={userGoal}
            dailyExercisesData={dailyExercisesData}
            dailyMealsData={dailyMealsData}
          />
        </main>
      </div>
    </div>
  );
}
