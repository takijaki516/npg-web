"use client";

import { useRef, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TimePickerProps {
  selectedHour: string;
  setSelectedHour: (hour: string) => void;
  selectedMinute: string;
  setSelectedMinute: (minute: string) => void;
  isTimePickerOpen: boolean;
  setIsTimePickerOpen: (open: boolean) => void;
  userLanguage: string;
  className?: string;
}

export default function TimePicker({
  userLanguage,
  selectedHour,
  selectedMinute,
  setSelectedHour,
  setSelectedMinute,
  isTimePickerOpen,
  setIsTimePickerOpen,
  className,
}: TimePickerProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTimePickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDisplay = () => {
    return `${selectedHour}:${selectedMinute}`;
  };

  return (
    <div
      className={cn(
        "relative flex items-center rounded-lg bg-muted/50 px-1 hover:cursor-pointer hover:bg-background/50 peer-hover:bg-background/50",
        className,
      )}
      ref={dropdownRef}
    >
      <div
        className="flex items-center gap-2"
        onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
      >
        <input
          type="text"
          readOnly
          value={formatDisplay()}
          placeholder="hh:mm"
          className="w-12 cursor-pointer bg-transparent text-center text-gray-200 outline-none"
        />
      </div>

      {isTimePickerOpen && (
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
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`cursor-pointer px-2 py-1 ${
                    selectedHour === hour
                      ? "bg-background/60 text-foreground"
                      : "text-muted-foreground hover:bg-background/80"
                  }`}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </div>
              ))}
            </div>

            <div className="h-full flex-1 overflow-y-auto">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={`cursor-pointer px-2 py-1 ${
                    selectedMinute === minute
                      ? "bg-background/60 text-foreground"
                      : "text-muted-foreground hover:bg-background/80"
                  }`}
                  onClick={() => setSelectedMinute(minute)}
                >
                  {minute}
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-36 items-center justify-between border-t border-background px-[2px] py-[2px]">
            <button
              className="flex flex-1 justify-center rounded-md py-1 text-muted-foreground hover:bg-background/80"
              onClick={() => setIsTimePickerOpen(false)}
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
