import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getMonthName } from "@/lib/calendar-utils";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <button
        onClick={onPrevMonth}
        className="rounded-full p-2 hover:bg-gray-100"
        aria-label="Previous month"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <h2 className="text-xl font-semibold">
        {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
      </h2>
      <button
        onClick={onNextMonth}
        className="rounded-full p-2 hover:bg-gray-100"
        aria-label="Next month"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
