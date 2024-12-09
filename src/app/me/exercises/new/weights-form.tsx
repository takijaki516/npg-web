"use client";

import * as React from "react";
import { Check, ChevronDown, Plus, X, UnfoldVertical } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { z } from "zod";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  TOTAL_WEIGHT_WORKOUTS,
  CommonWorkoutName,
  type WeightExercise,
} from "@/lib/types/exercise.types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addExerciseSchema } from "@/lib/schema/exercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WeightsFormProps {
  form: UseFormReturn<z.infer<typeof addExerciseSchema>>;
}

export function WeightsForm({ form }: WeightsFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercise_detail.weights_exercises",
  });

  // Update these functions
  function handleAddWeightExercise(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    append({
      name: {
        ko: "",
        en: "",
      },
      set_infos: [],
    });
  }

  function handleRemoveWeightExercise(index: number) {
    remove(index);
  }

  return (
    <>
      <div className="flex min-h-[280px] flex-col gap-4">
        {fields.map((field, index) => (
          <WeightExerciseComponent
            key={field.id} // useFieldArray provides unique ids
            form={form}
            index={index}
            handleRemoveWeightExercise={handleRemoveWeightExercise}
          />
        ))}
      </div>

      <Button
        type="button"
        onClick={handleAddWeightExercise}
        className="mt-2 w-full border border-muted-foreground/60 bg-background text-secondary-foreground hover:border hover:border-muted-foreground/80 hover:bg-background"
      >
        종목 추가
      </Button>
    </>
  );
}

interface WeightExerciseComponentProps {
  form: UseFormReturn<z.infer<typeof addExerciseSchema>>;
  index: number;
  handleRemoveWeightExercise: (index: number) => void;
}

function WeightExerciseComponent({
  form,
  index,
  handleRemoveWeightExercise,
}: WeightExerciseComponentProps) {
  return (
    <div className="relative flex flex-col gap-2 rounded-md border border-pink-400 bg-background p-2">
      <div className="absolute right-2 top-2 flex items-center gap-1 text-sm text-muted-foreground">
        {index + 1}
        <button
          type="button"
          onClick={() => handleRemoveWeightExercise(index)}
          className="text-red-800 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <WeightExerciseNameCombobox form={form} index={index} />
      <div className="flex flex-col gap-2">
        <WeightExerciseSetsComponent form={form} index={index} />
      </div>
    </div>
  );
}

interface WeightExerciseNameComboboxProps {
  form: UseFormReturn<z.infer<typeof addExerciseSchema>>;
  index: number;
}

function WeightExerciseNameCombobox({
  form,
  index,
}: WeightExerciseNameComboboxProps) {
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
            {TOTAL_WEIGHT_WORKOUTS.map((PART_WORKOUTS) => {
              return (
                <CommandGroup
                  key={PART_WORKOUTS.part}
                  heading={PART_WORKOUTS.part}
                >
                  {PART_WORKOUTS.workout.map((workout) => {
                    return (
                      <CommandItem
                        key={workout.ko}
                        value={workout.ko}
                        onSelect={() => {
                          form.setValue(
                            `exercise_detail.weights_exercises.${index}.name`,
                            workout,
                          );
                          setValue(workout);
                          setOpen(false);
                        }}
                      >
                        {workout.ko}
                        <Check
                          className={cn(
                            "ml-auto",
                            value?.ko === workout.ko
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface WeightExerciseSetsComponentProps {
  form: UseFormReturn<z.infer<typeof addExerciseSchema>>;
  index: number;
}

function WeightExerciseSetsComponent({
  form,
  index,
}: WeightExerciseSetsComponentProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Add useFieldArray for set_infos
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `exercise_detail.weights_exercises.${index}.set_infos`,
  });

  function handleAddSet() {
    append({
      set_number: fields.length + 1,
      reps: 0,
      weight: 0,
    });
  }

  function handleRemoveSet(setIndex: number) {
    remove(setIndex);
  }

  return (
    <Collapsible open={isOpen} defaultOpen={false} onOpenChange={setIsOpen}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span>sets</span>

          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              handleAddSet();
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <CollapsibleTrigger>
          {isOpen ? <X /> : <UnfoldVertical />}
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        {fields.map((field, setIndex) => {
          return (
            <div key={field.id} className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                set #{setIndex + 1}
                <button onClick={() => handleRemoveSet(setIndex)}>
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="flex-1"
                  {...form.register(
                    `exercise_detail.weights_exercises.${index}.set_infos.${setIndex}.reps`,
                    {
                      valueAsNumber: true,
                    },
                  )}
                />
                <span className="w-fit">reps</span>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  className="flex-1"
                  {...form.register(
                    `exercise_detail.weights_exercises.${index}.set_infos.${setIndex}.weight`,
                    {
                      valueAsNumber: true,
                    },
                  )}
                />
                <span className="w-fit">kg</span>
              </div>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
