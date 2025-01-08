import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MinuteSelectorProps {
  setValue: React.Dispatch<React.SetStateAction<number>>;
  value: number;
}

export function MinuteSelector({ setValue, value }: MinuteSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const minuteOptions = Array.from({ length: 18 }, (_, i) => (i + 1) * 5);

  // REVIEW:
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    // Remove 'm' if it's the last character
    if (inputValue.endsWith("m")) {
      inputValue = inputValue.slice(0, -1);
    }

    if (
      inputValue === "" ||
      (/^\d+$/.test(inputValue) && parseInt(inputValue) > 0)
    ) {
      setValue(parseInt(inputValue));
    }
  };

  const handleOptionClick = (minutes: number) => {
    setValue(minutes);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div className="flex items-center rounded-md border bg-background">
        <div className="flex w-full items-center rounded-l-md bg-transparent">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            className={cn(
              "w-full flex-1 rounded-l-md bg-transparent text-end text-sm",
              "focus:outline-none",
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            )}
          />
          <span className="px-1">분</span>
        </div>

        <button
          onClick={toggleDropdown}
          className="rounded-r-md border-l border-border px-2 py-1 transition-colors hover:bg-accent focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <ChevronDownIcon className="size-4 text-muted-foreground" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 max-h-60 w-20 divide-y overflow-y-auto rounded-md border border-border bg-background shadow-lg">
          {minuteOptions.map((minutes) => (
            <div
              key={minutes}
              onClick={() => handleOptionClick(minutes)}
              className="cursor-pointer px-3 py-2 text-center text-sm transition-colors hover:bg-muted"
              role="option"
              aria-selected={value === minutes}
            >
              {minutes} 분
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
