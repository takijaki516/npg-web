import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DateTime } from "luxon";

import {
  getLatestHealthInfoOptions,
  getMonthlyInfoOptions,
  getRangeHealthInfoOptions,
} from "@/lib/queries";
import { MyCalendar } from "@/components/calendar/my-calendar";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { BarChartContainer } from "@/components/chart/bar-chart-container";
import { CalendarSkeleton } from "@/components/skeletons/calendar-skeleton";
import { BarChartSkeleton } from "@/components/skeletons/barchart-skeleton";

export const Route = createFileRoute("/(user)/_layout/info/$yearmonth")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { yearmonth } = params;
    const queryClient = context.queryClient;

    queryClient.ensureQueryData(
      getMonthlyInfoOptions({
        localYearMonth: yearmonth,
      }),
    );
    queryClient.ensureQueryData(getLatestHealthInfoOptions);

    const startDate = DateTime.fromFormat(`${yearmonth}-01`, "yyyy-MM-dd");
    queryClient.ensureQueryData(
      getRangeHealthInfoOptions({
        startDate: startDate.toFormat("yyyy-MM-dd"),
        endDate: startDate
          .plus({ month: 1 })
          .minus({ day: 1 })
          .toFormat("yyyy-MM-dd"),
      }),
    );
  },
});

function RouteComponent() {
  return (
    <div className="flex w-full flex-col items-center justify-center overflow-y-auto p-2 xs:p-4 lg:py-10">
      <main className="flex min-h-dvh w-full max-w-3xl flex-col items-center gap-1 xs:gap-2 sm:gap-4">
        <div className="relative flex w-full flex-col rounded-md border border-border p-2 min-[400px]:h-[270px]">
          <React.Suspense fallback={<BarChartSkeleton />}>
            <div className="absolute left-2 top-3 flex items-center gap-4 text-lg font-semibold">
              <MobileSidebar />
            </div>

            <BarChartContainer />
          </React.Suspense>
        </div>

        <div className="flex w-full flex-col rounded-md border border-border sm:py-2">
          <React.Suspense fallback={<CalendarSkeleton />}>
            <MyCalendar />
          </React.Suspense>
        </div>
      </main>
    </div>
  );
}
