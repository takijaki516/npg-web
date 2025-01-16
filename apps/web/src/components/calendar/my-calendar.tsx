import * as React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ko } from "date-fns/locale";

import { getMonthlyInfoOptions } from "@/lib/queries/info";
import { CustomDay } from "./custom-day";
import { Calendar } from "@/components/ui/calendar";

export function MyCalendar() {
  const { yearmonth } = useParams({
    from: "/(user)/_layout/info/$yearmonth",
  });

  useSuspenseQuery(
    getMonthlyInfoOptions({
      localYearMonth: yearmonth,
    }),
  );

  const navigate = useNavigate({
    from: "/info/$yearmonth",
  });

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      forInfo={true}
      mode="single"
      showOutsideDays={false}
      selected={date}
      onSelect={setDate}
      className="flex w-full flex-col"
      components={{
        Day: CustomDay,
      }}
      onMonthChange={(month) => {
        const year = month.getFullYear();
        const padMonth = (month.getMonth() + 1).toString().padStart(2, "0");
        const yearmonth = `${year}-${padMonth}`;
        navigate({ to: "/info/$yearmonth", params: { yearmonth } });
      }}
      locale={ko}
    />
  );
}
