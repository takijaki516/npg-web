import { createFileRoute } from "@tanstack/react-router";
import { DateTime } from "luxon";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import {
  getDailyMealsWithFoodsOptions,
  getDailyWeightsExerciseOptions,
  getLatestHealthInfoOptions,
  getOrCreateDailyIntakeOptions,
  getOrCreateGoalOptions,
} from "@/lib/queries";
import { BentoDashboard } from "@/components/me/bento-dashboard";

export const Route = createFileRoute("/(user)/_layout/me")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    const profile = context.profile;

    const currentDateTime = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
    useDateTimeStore.getState().setCurrentDateTime(currentDateTime);

    queryClient.ensureQueryData(getOrCreateGoalOptions);
    queryClient.ensureQueryData(getLatestHealthInfoOptions);
    queryClient.ensureQueryData(
      getOrCreateDailyIntakeOptions({
        currentLocalDateTime: currentDateTime,
        timezone: profile.timezone,
      }),
    );
    queryClient.ensureQueryData(
      getDailyWeightsExerciseOptions({
        currentLocalDateTime: currentDateTime,
        timezone: profile.timezone,
      }),
    );
    queryClient.ensureQueryData(
      getDailyMealsWithFoodsOptions({
        currentLocalDateTime: currentDateTime,
        timezone: profile.timezone,
      }),
    );
  },
});

function RouteComponent() {
  return (
    <div className="flex h-dvh flex-1 flex-col items-center justify-center overflow-hidden p-4 lg:py-10">
      <main className="flex h-full max-w-3xl flex-col items-center overflow-hidden lg:w-full">
        <BentoDashboard />
      </main>
    </div>
  );
}
