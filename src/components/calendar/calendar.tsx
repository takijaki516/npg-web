"use client";

import * as React from "react";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";

export function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarGrid currentDate={currentDate} />
    </div>
  );
}
