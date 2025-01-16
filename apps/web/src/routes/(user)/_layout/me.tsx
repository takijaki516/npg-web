import { createFileRoute } from "@tanstack/react-router";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import {
  getDailyMealsWithFoodsOptions,
  getDailyWorkoutOptions,
  getLatestHealthInfoOptions,
  getDailyIntakeOptions,
  getOrCreateGoalOptions,
} from "@/lib/queries";
import { BentoDashboard } from "@/components/me/bento-dashboard";

export const Route = createFileRoute("/(user)/_layout/me")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    const currentDateTime = useDateTimeStore.getState().currentDateTime;
    const currentLocalDate = currentDateTime.split(" ")[0];

    queryClient.ensureQueryData(getOrCreateGoalOptions);
    queryClient.ensureQueryData(getLatestHealthInfoOptions);
    queryClient.ensureQueryData(
      getDailyIntakeOptions({
        currentLocalDate,
      }),
    );
    queryClient.ensureQueryData(
      getDailyWorkoutOptions({
        currentLocalDate,
      }),
    );
    queryClient.ensureQueryData(
      getDailyMealsWithFoodsOptions({
        currentLocalDate,
      }),
    );
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center p-2 xs:p-4 lg:py-6">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center">
        <BentoDashboard />
      </main>
    </div>
  );
}
