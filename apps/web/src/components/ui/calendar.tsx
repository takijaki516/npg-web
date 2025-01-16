import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  forInfo?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  forInfo = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      classNames={{
        months:
          "flex flex-col space-y-4 sm:space-x-4 sm:space-y-0 items-center justify-center",
        month: "flex flex-col w-full",

        caption: cn(
          "flex justify-center relative items-center",
          forInfo && " py-2",
        ),
        caption_label: cn(
          "font-base",
          forInfo ? "text-lg sm:text-xl" : "text-lg",
        ),

        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "size-8 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center",
        ),
        nav_button_previous: cn("absolute", forInfo ? "left-4" : "left-1"),
        nav_button_next: cn("absolute ", forInfo ? "right-4" : "right-1"),

        table: "w-full space-y-1 flex items-stretch flex-col relative",

        head_row: "flex w-full justify-around",
        head_cell: "text-muted-foreground rounded-md w-full font-normal",

        tbody: forInfo
          ? "w-full items-stretch flex flex-col overflow-y-auto p-2"
          : "w-full items-stretch flex flex-col overflow-y-auto p-2",

        row: forInfo
          ? "flex w-full justify-around "
          : "flex w-full justify-around ",

        cell: forInfo
          ? "w-full flex-1"
          : cn(
              "relative p-0 text-center text-base focus-within:relative focus-within:z-20 w-full rounded-md",
              "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
              props.mode === "range"
                ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                : "[&:has([aria-selected])]:rounded-md",
            ),

        //
        day: cn(
          "font-normal aria-selected:opacity-100 border border-border/80 p-1 rounded-md transition-colors hover:border-primary cursor-pointer w-full",
        ),
        day_range_start: "day-range-start bg-blue-700 border border-blue-700",
        day_range_end: "day-range-end bg-green-700",
        day_selected: "border-1",
        day_today: "border border-primary/ hover:border-primary",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
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
