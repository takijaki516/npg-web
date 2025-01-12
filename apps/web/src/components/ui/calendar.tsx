import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 h-full items-center justify-center",
        month: "w-full h-full flex flex-col gap-2",

        caption: "flex justify-center pt-4 pb-2 relative items-center",
        caption_label: "text-2xl font-medium ",

        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "size-8 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center",
        ),
        nav_button_previous: "absolute left-4",
        nav_button_next: "absolute right-4",

        table: "w-full space-y-1 flex items-stretch flex-col flex-1 relative",

        head_row: "flex w-full justify-around",
        head_cell: "text-muted-foreground rounded-md w-full font-normal",

        tbody:
          "w-full items-stretch flex-1 flex flex-col gap-1 overflow-y-auto p-2",

        row: "flex w-full justify-around gap-1 flex-1 min-h-[60px]",
        // cell: cn(
        //   "relative p-0 text-center text-base focus-within:relative focus-within:z-20  w-full rounded-md",
        //   // "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
        //   props.mode === "range"
        //     ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        //     : "[&:has([aria-selected])]:rounded-md",
        // ),
        cell: "w-full h-full",

        // day: cn(
        //   "p-0 font-normal aria-selected:opacity-100 border border-border/80 p-4 rounded-md transition-colors hover:border-border w-full bg-green-500",
        // ),
        // day_range_start: "day-range-start",
        // day_range_end: "day-range-end",

        // day_selected: "border border-red-600",

        // day_today: "border border-red-600",
        // day_outside:
        //   "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        // day_disabled: "text-muted-foreground opacity-50",
        // day_range_middle:
        //   "aria-selected:bg-accent aria-selected:text-accent-foreground",
        // day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
