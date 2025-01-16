import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  WEIGHT_BODY_PARTS,
  insertDailyWorkoutSchema,
} from "@repo/shared-schema";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface BodyPartSelectorProps {
  form: UseFormReturn<z.infer<typeof insertDailyWorkoutSchema>>;
  workoutIdx: number;
}

export function BodyPartSelector({ form, workoutIdx }: BodyPartSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value: (typeof WEIGHT_BODY_PARTS)[number]) => {
        form.setValue(`weightsWorkouts.${workoutIdx}.bodyPart`, value);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <div>{form.watch(`weightsWorkouts.${workoutIdx}.bodyPart`)}</div>
      </SelectTrigger>

      <SelectContent className="w-[200px]">
        {WEIGHT_BODY_PARTS.map((bodyPart) => {
          return (
            <SelectItem key={bodyPart} value={bodyPart}>
              {bodyPart}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
