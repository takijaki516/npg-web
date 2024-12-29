import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

import { getProfileOptions } from "@/lib/queries";
import { Sidebar } from "@/components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createFileRoute("/(user)/_layout")({
  beforeLoad: ({ context }) => {
    if (!context.session || !context.user) {
      throw redirect({ to: "/login" });
    }

    return { user: context.user };
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(getProfileOptions);

    // get current local date time
    // const currentLocalDateTime = DateTime.now()
    //   .setZone(profile.timezone)
    //   .toFormat("yyyy-MM-dd");

    // const { utcStartTimeOfDay, utcEndTimeOfDay } = convertToRangeOfDayUTCTime({
    //   localDate: currentLocalDateTime,
    //   timeZone: profile.timezone,
    // });

    // if (!utcStartTimeOfDay || !utcEndTimeOfDay) {
    //   throw new Error("failed to get start and end time of day");
    // }

    // // fetch data
    // queryClient.ensureQueryData({
    //   queryKey: ["userGoal"],
    //   queryFn: () => getOrCreateGoal(),
    // });

    // queryClient.ensureQueryData({
    //   queryKey: ["dailyIntake"],
    //   queryFn: () =>
    //     getOrCreateDailyIntake({
    //       utcStartOfRange: utcStartTimeOfDay,
    //       utcEndOfRange: utcEndTimeOfDay,
    //     }),
    // });

    // queryClient.ensureQueryData({
    //   queryKey: ["latestHealthInfo"],
    //   queryFn: () => getLatestHealthInfo(),
    // });

    // queryClient.ensureQueryData(
    //   getDailyWeightsExerciseOptions({
    //     utcStartOfRange: utcStartTimeOfDay,
    //     utcEndOfRange: utcEndTimeOfDay,
    //   }),
    // );

    // queryClient.ensureQueryData(
    //   getDailyMealsWithFoodsOptions({
    //     utcStartOfRange: utcStartTimeOfDay,
    //     utcEndOfRange: utcEndTimeOfDay,
    //   }),
    // );
  },
  component: MeLayout,
});

function MeLayout() {
  return (
    <div className="relative flex">
      <TooltipProvider>
        <Sidebar />

        <Outlet />
      </TooltipProvider>
    </div>
  );
}
