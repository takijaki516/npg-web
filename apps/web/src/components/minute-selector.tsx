import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

interface MinuteSelectorProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export function MinuteSelector({ setValue, value }: MinuteSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const minuteOptions = Array.from({ length: 18 }, (_, i) => (i + 1) * 5);

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
      setValue(inputValue);
    }
  };

  const handleOptionClick = (minutes: number) => {
    setValue(minutes.toString());
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
    <div className="relative w-40" ref={dropdownRef}>
      <div className="flex items-center rounded-md border border-gray-300">
        <div className="relative flex-grow">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            className="w-full rounded-l-md px-3 py-2 pr-6 text-end text-sm focus:outline-none"
            aria-label="Select or enter minutes"
          />
        </div>

        <button
          onClick={toggleDropdown}
          className="rounded-r-md border-l border-gray-300 bg-white px-2 py-2 focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {minuteOptions.map((minutes) => (
            <div
              key={minutes}
              onClick={() => handleOptionClick(minutes)}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
              role="option"
              aria-selected={value === minutes.toString()}
            >
              {minutes} m
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
