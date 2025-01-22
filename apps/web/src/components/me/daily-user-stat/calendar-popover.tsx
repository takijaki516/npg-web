import { CalendarSearch } from "lucide-react";
import { DateTime } from "luxon";
import { ko } from "date-fns/locale";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CalendarPopover() {
  const { currentDateTime, setCurrentDateTime } = useDateTimeStore();
  const isoDate = currentDateTime.replace(" ", "T");

  return (
    <Popover>
      <PopoverTrigger>
        <CalendarSearch className="mb-1" size={20} />
      </PopoverTrigger>

      <PopoverContent className="p-1">
        <Calendar
          mode="single"
          locale={ko}
          selected={new Date(isoDate)}
          onSelect={(day) => {
            if (!day) return;
            setCurrentDateTime(
              DateTime.fromJSDate(day).toFormat("yyyy-MM-dd HH:mm:ss"),
            );
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
