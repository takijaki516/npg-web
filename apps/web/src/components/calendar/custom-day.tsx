import { Loader2, CircleAlert } from "lucide-react";
import { DayProps } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useDateTimeStore } from "@/lib/zustand/time-store";
import { getMonthlyInfoOptions } from "@/lib/queries";
import { DailyInfoDialog } from "./daily-info-dialog";

export function CustomDay({ date, displayMonth }: DayProps) {
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const yearMonth = `${year}-${month}`;
  const localDate = `${year}-${month}-${day}`;

  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );
  const currentLocalDate = currentLocalDateTime.split(" ")[0];

  const monthlyInfoQuery = useQuery(
    getMonthlyInfoOptions({
      localYearMonth: yearMonth,
    }),
  );

  if (displayMonth.getMonth() !== date.getMonth()) {
    return null;
  }

  if (monthlyInfoQuery.isLoading) {
    return (
      <div
        className={cn(
          "flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-border p-0 text-center text-base transition-all",
          // "focus-within:relative focus-within:z-20",
          "xs:aspect-video",
        )}
      >
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (monthlyInfoQuery.isSuccess) {
    const { exercisesByDate, mealsByDate } = monthlyInfoQuery.data;
    const currentDateExercises = exercisesByDate[localDate];
    const currentDateMeals = mealsByDate[localDate];

    return (
      <DailyInfoDialog localDate={localDate}>
        <button
          className={cn(
            "flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-border p-0 text-center text-base transition-all",
            // "focus-within:relative focus-within:z-20",
            "xs:aspect-video",
            "hover:border-primary/60",
            currentLocalDate === localDate && "border-primary/50",
            (!!currentDateExercises || !!currentDateMeals) &&
              "border-green-900/90",
          )}
        >
          {monthlyInfoQuery.isLoading && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {day}
        </button>
      </DailyInfoDialog>
    );
  }

  return (
    <div
      className={cn(
        "flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-border p-0 text-center text-base transition-all",
        // "focus-within:relative focus-within:z-20",
        "xs:aspect-video",
      )}
    >
      <CircleAlert className="h-4 w-4 animate-spin" />
    </div>
  );
}
