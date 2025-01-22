import { useSuspenseQueries } from "@tanstack/react-query";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import {
  getDailyIntakeOptions,
  getDailyMealsWithFoodsOptions,
} from "@/lib/queries";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { DailyIntake } from "./daily-intake";
import { CalendarPopover } from "./calendar-popover";

export function DailyUserStat() {
  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );
  const currentLocalDate = currentLocalDateTime.split(" ")[0];

  const [{ data: dailyIntake }, { data: dailyMealsWithFoods }] =
    useSuspenseQueries({
      queries: [
        getDailyIntakeOptions({
          currentLocalDate,
        }),
        getDailyMealsWithFoodsOptions({
          currentLocalDate,
        }),
      ],
    });

  return (
    <div className="flex flex-col rounded-md p-2">
      <div className="flex items-center gap-6 text-lg font-semibold">
        <MobileSidebar />

        <div className="flex items-center gap-1">
          <span>{currentLocalDate}</span>
          <CalendarPopover />
        </div>
      </div>

      <DailyIntake
        dailyMealsWithFoods={dailyMealsWithFoods}
        dailyIntake={dailyIntake}
      />
    </div>
  );
}
