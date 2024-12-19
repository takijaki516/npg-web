import { getMonthDays } from "../../lib/calendar-utils";

interface CalendarGridProps {
  currentDate: Date;
}

export function CalendarGrid({ currentDate }: CalendarGridProps) {
  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfWeek = days[0].getDay();

  return (
    <div className="grid grid-cols-7 gap-1">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="py-2 text-center text-sm font-semibold text-gray-500"
        >
          {day}
        </div>
      ))}
      {Array(firstDayOfWeek)
        .fill(null)
        .map((_, index) => (
          <div key={`empty-${index}`} className="h-12 sm:h-24"></div>
        ))}
      {days.map((date) => (
        <div
          key={date.toISOString()}
          className={`h-12 border border-gray-200 p-1 sm:h-24 ${
            date.toDateString() === new Date().toDateString()
              ? "bg-blue-100"
              : ""
          }`}
        >
          <span className="text-sm">{date.getDate()}</span>
        </div>
      ))}
    </div>
  );
}
