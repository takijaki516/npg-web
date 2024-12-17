import { createFileRoute } from "@tanstack/react-router";
import { DateTime } from "luxon";

import { getProfile } from "@/lib/queries/profile";
import { convertToRangeOfDayUTCTime } from "@/lib/utils";
import { getOrCreateGoal } from "@/lib/queries/user-goal";
import { getOrCreateDailyIntake } from "@/lib/queries/daily-intake";
import { getLatestHealthInfo } from "@/lib/queries/user-health-info";
import { getDailyWeightsExerciseWithAllInfos } from "@/lib/queries/exercises";
import { getDailyMealsWithFoods } from "@/lib/queries/meals";
import { MeHeader } from "@/components/me-header";
import { BentoDashboard } from "@/components/me/bento-dashboard";

export const Route = createFileRoute("/(user)/_layout/me")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;

    const userProfile = await queryClient.ensureQueryData({
      queryKey: ["profile"],
      queryFn: getProfile,
    });

    if (!userProfile.user_id) {
      throw new Error("deleted user");
    }

    // get current local date time
    const currentLocalDateTime = DateTime.now()
      .setZone(userProfile.timezone)
      .toFormat("yyyy-MM-dd");

    const { startTimeOfDay, endTimeOfDay } = convertToRangeOfDayUTCTime({
      localDate: currentLocalDateTime,
      timeZone: userProfile.timezone,
    });

    if (!startTimeOfDay || !endTimeOfDay) {
      throw new Error("failed to get start and end time of day");
    }

    // fetch data
    const userGoalPromise = queryClient.ensureQueryData({
      queryKey: ["userGoal"],
      queryFn: () =>
        getOrCreateGoal({
          email: userProfile.user_email,
          userId: userProfile.user_id!,
        }),
    });

    const dailyIntakePromise = queryClient.ensureQueryData({
      queryKey: ["dailyIntake"],
      queryFn: () =>
        getOrCreateDailyIntake({
          userEmail: userProfile.user_email,
          userId: userProfile.user_id!,
          utcStartOfRange: startTimeOfDay,
          utcEndOfRange: endTimeOfDay,
        }),
    });

    const healthInfoPromise = queryClient.ensureQueryData({
      queryKey: ["healthInfo"],
      queryFn: () => getLatestHealthInfo({ email: userProfile.user_email }),
    });

    const dailyWeightsExercisesPromise = queryClient.ensureQueryData({
      queryKey: ["dailyWeightsExercises"],
      queryFn: () =>
        getDailyWeightsExerciseWithAllInfos({
          utcStartOfRange: startTimeOfDay,
          utcEndOfRange: endTimeOfDay,
        }),
    });

    const dailyMealsWithFoodsPromise = queryClient.ensureQueryData({
      queryKey: ["dailyMealsWithFoods"],
      queryFn: () =>
        getDailyMealsWithFoods({
          utcStartOfRange: startTimeOfDay,
          utcEndOfRange: endTimeOfDay,
        }),
    });

    const [
      userGoal,
      dailyIntake,
      healthInfo,
      dailyWeightsExercises,
      dailyMealsWithFoods,
    ] = await Promise.all([
      userGoalPromise,
      dailyIntakePromise,
      healthInfoPromise,
      dailyWeightsExercisesPromise,
      dailyMealsWithFoodsPromise,
    ]);

    return {
      profile: userProfile,
      currentLocalDateTime,
      userGoal,
      dailyIntake,
      healthInfo,
      dailyWeightsExercises,
      dailyMealsWithFoods,
    };
  },
});

function RouteComponent() {
  const { profile } = Route.useLoaderData();

  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center">
      <MeHeader currentPageTitle={`${profile.username}`} />

      <div className="flex w-full max-w-3xl flex-col p-4 pb-[100px] md:pt-6">
        <main className="flex flex-col lg:w-full lg:items-center">
          <BentoDashboard />
        </main>
      </div>
    </div>
  );
}
