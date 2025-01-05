import * as React from "react";
import { Check, Clock } from "lucide-react";
import { DateTime } from "luxon";

import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0"),
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0"),
);

interface TimePickerProps {
  userLanguage: string;
  timezone: string;
  className?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function TimePicker({
  userLanguage,
  timezone,
  className,
  value,
  setValue,
}: TimePickerProps) {
  const currentLocalDateTime = DateTime.fromFormat(
    value,
    "yyyy-MM-dd HH:mm:ss",
  ).setZone(timezone);

  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const [selectedHour, setSelectedHour] = React.useState(
    currentLocalDateTime.hour.toString().padStart(2, "0"),
  );
  const [selectedMinute, setSelectedMinute] = React.useState(
    currentLocalDateTime.minute.toString().padStart(2, "0"),
  );

  function handleTimeChange(hourOrMinute: "hour" | "minute", value: string) {
    if (hourOrMinute === "hour") {
      currentLocalDateTime.set({ hour: parseInt(value) });
      setSelectedHour(value);
    } else {
      currentLocalDateTime.set({ minute: parseInt(value) });
      setSelectedMinute(value);
    }

    setValue(currentLocalDateTime.toFormat("yyyy-MM-dd HH:mm:ss"));
  }

  function handleNowClick() {
    const currentLocalTime = DateTime.now().setZone(timezone);
    setSelectedHour(currentLocalTime.hour.toString().padStart(2, "0"));
    setSelectedMinute(currentLocalTime.minute.toString().padStart(2, "0"));
    setValue(currentLocalDateTime.toFormat("yyyy-MM-dd HH:mm:ss"));
  }

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={cn(
        "relative flex items-center rounded-md bg-background px-1 hover:cursor-pointer hover:bg-accent",
        className,
      )}
      ref={dropdownRef}
    >
      <div
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          readOnly
          value={`${selectedHour}:${selectedMinute}`}
          placeholder="hh:mm"
          className="w-12 cursor-pointer bg-transparent text-center outline-none"
        />
      </div>

      <button className="rounded-md p-1" onClick={handleNowClick}>
        <Clock className="h-4 w-4 text-muted-foreground hover:text-foreground" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-8 z-50 mt-1 rounded-lg bg-muted">
          <div className="flex px-2 py-1 text-muted-foreground">
            <div className="flex-1">
              {userLanguage === "ko" ? "시" : "Hour"}
            </div>
            <div className="flex-1">
              {userLanguage === "ko" ? "분" : "Minute"}
            </div>
          </div>

          <div className="flex h-48">
            <div className="h-full flex-1 overflow-y-auto">
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className={`cursor-pointer px-2 py-1 ${
                    selectedHour === hour
                      ? "bg-background/60 text-foreground"
                      : "text-muted-foreground hover:bg-background/80"
                  }`}
                  onClick={() => handleTimeChange("hour", hour)}
                >
                  {hour}
                </div>
              ))}
            </div>

            <div className="h-full flex-1 overflow-y-auto">
              {MINUTES.map((minute) => (
                <div
                  key={minute}
                  className={`cursor-pointer px-2 py-1 ${
                    selectedMinute === minute
                      ? "bg-background/60 text-foreground"
                      : "text-muted-foreground hover:bg-background/80"
                  }`}
                  onClick={() => handleTimeChange("minute", minute)}
                >
                  {minute}
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-36 items-center justify-between border-t border-background px-[2px] py-[2px]">
            <button
              className="flex flex-1 justify-center rounded-md py-1 text-muted-foreground hover:bg-background/80"
              onClick={() => setIsOpen(false)}
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
