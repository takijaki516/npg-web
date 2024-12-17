import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { WEIGHT_BODY_PARTS, WORKOUT_OPTIONS } from "@/lib/types/exercise.types";
import { insertDailyWeightsExerciseSchema } from "@/lib/schemas/exercise.schema";

interface ComboboxProps {
  placeholder: string;
  options:
    | {
        field: "body_part";
        select_options: typeof WEIGHT_BODY_PARTS;
        setLatestSelectedBodyPart?:
          | React.Dispatch<
              React.SetStateAction<(typeof WEIGHT_BODY_PARTS)[number]>
            >
          | undefined;
      }
    | {
        field: "workout_name";
        select_options: WORKOUT_OPTIONS;
      };
  form: UseFormReturn<z.infer<typeof insertDailyWeightsExerciseSchema>>;
  workoutIdx: number;
}

export function Combobox({
  options,
  placeholder,
  form,
  workoutIdx,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>(null);

  const { field, select_options } = options;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="relative flex w-[200px] justify-between"
        >
          {value ? value : placeholder}
          <ChevronDown className="absolute right-2 h-9 rounded-md bg-background/80" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command className="max-h-[200px] overflow-y-auto">
          {field === "body_part" ? (
            <>
              <CommandInput placeholder={"운동 부위"} />

              <CommandList>
                <CommandEmpty>찾을 수 없습니다.</CommandEmpty>

                {select_options.map((opt, idx) => (
                  <CommandItem
                    key={idx}
                    value={opt}
                    onSelect={() => {
                      setValue(opt);
                      setOpen(false);
                      if (options.setLatestSelectedBodyPart) {
                        options.setLatestSelectedBodyPart(opt);
                        form.setValue(
                          `weights_workouts.${workoutIdx}.body_part`,
                          opt,
                        );
                      }
                    }}
                    className="flex items-center justify-between"
                  >
                    {opt}
                    {value === opt && <Check className="ml-2 h-4 w-4" />}
                  </CommandItem>
                ))}
              </CommandList>
            </>
          ) : (
            <>
              <CommandInput placeholder={"운동"} />

              <CommandList>
                <CommandEmpty>찾을 수 없습니다.</CommandEmpty>

                {select_options.map((opt, idx) => (
                  <CommandItem
                    key={idx}
                    value={opt}
                    onSelect={() => {
                      setValue(opt);
                      setOpen(false);
                      form.setValue(
                        `weights_workouts.${workoutIdx}.workout_name`,
                        opt,
                      );
                    }}
                    className="relative flex items-center justify-between"
                  >
                    {opt}

                    {value === opt && (
                      <Check className="absolute right-1 top-1/2 ml-2 h-4 w-4 -translate-y-1/2" />
                    )}
                  </CommandItem>
                ))}
              </CommandList>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
