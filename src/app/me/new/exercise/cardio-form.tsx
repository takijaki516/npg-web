"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { z } from "zod";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CARDIO_DIFFICULTY_LEVELS,
  CARDIO_WORKOUT_NAMES,
  CommonWorkoutName,
} from "@/lib/types/exercise.types";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// interface CardioFormProps {
//   form: UseFormReturn<z.infer<typeof addExerciseSchema>>;
// }

export function CardioForm() {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercise_detail.cardio_exercises",
  });

  // Update these functions
  function handleAddCardioExercise(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    append({
      name: {
        ko: "",
        en: "",
      },
      difficulty: "MEDIUM",
    });
  }

  function handleRemoveCardioExercise(index: number) {
    remove(index);
  }

  return (
    <>
      <div className="flex min-h-[280px] flex-col gap-4">
        {fields.map((field, index) => (
          <CardioExerciseComponent
            key={field.id} // useFieldArray provides unique ids
            form={form}
            index={index}
            handleRemoveCardioExercise={handleRemoveCardioExercise}
          />
        ))}
      </div>

      <Button
        type="button"
        onClick={handleAddCardioExercise}
        className="mt-2 w-full border border-muted-foreground/60 bg-background text-secondary-foreground hover:border hover:border-muted-foreground/80 hover:bg-background"
      >
        종목 추가
      </Button>
    </>
  );
}

interface CardioExerciseComponentProps {
  form: UseFormReturn<z.infer<typeof addExerciseSchema>>;
  index: number;
  handleRemoveCardioExercise: (index: number) => void;
}

function CardioExerciseComponent({
  form,
  index,
  handleRemoveCardioExercise,
}: CardioExerciseComponentProps) {
  return (
    <div className="relative flex flex-col gap-2 rounded-md border border-pink-400 bg-background p-2">
      <div className="absolute right-2 top-2 flex items-center gap-1 text-sm text-muted-foreground">
        {index + 1}
        <button
          type="button"
          onClick={() => handleRemoveCardioExercise(index)}
          className="text-red-800 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex w-fit flex-row gap-2">
        <CardioExerciseNameCombobox form={form} index={index} />
        <CardioDifficultySelector form={form} index={index} />
      </div>
    </div>
  );
}

interface CardioExerciseNameComboboxProps {
  form: UseFormReturn<z.infer<typeof addExerciseSchema>>;
  index: number;
}

function CardioExerciseNameCombobox({
  form,
  index,
}: CardioExerciseNameComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<CommonWorkoutName | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? `${value.ko}` : "운동 선택"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command className="max-h-[200px] overflow-y-auto">
          <CommandInput placeholder="운동 검색" />

          <CommandList>
            <CommandEmpty>운동을 찾을 수 없습니다.</CommandEmpty>

            <CommandGroup>
              {CARDIO_WORKOUT_NAMES.map((cardio) => {
                return (
                  <CommandItem
                    key={cardio.ko}
                    value={cardio.ko}
                    onSelect={() => {
                      form.setValue(
                        `exercise_detail.cardio_exercises.${index}.name`,
                        cardio,
                      );
                      setValue(cardio);
                      setOpen(false);
                    }}
                  >
                    {cardio.ko}
                    <Check
                      className={cn(
                        "ml-auto",
                        value?.ko === cardio.ko ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface CardioDifficultySelectorProps {
  form: UseFormReturn<z.infer<typeof addExerciseSchema>>;
  index: number;
}

function CardioDifficultySelector({
  form,
  index,
}: CardioDifficultySelectorProps) {
  const difficulty = form.watch(
    `exercise_detail.cardio_exercises.${index}.difficulty`,
  );

  return (
    <Select
      value={difficulty}
      onValueChange={(value) => {
        form.setValue(
          `exercise_detail.cardio_exercises.${index}.difficulty`,
          value as (typeof CARDIO_DIFFICULTY_LEVELS)[number],
        );
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="난이도 선택" />
      </SelectTrigger>

      <SelectContent>
        {CARDIO_DIFFICULTY_LEVELS.map((difficulty) => (
          <SelectItem key={difficulty} value={difficulty}>
            {difficulty}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
