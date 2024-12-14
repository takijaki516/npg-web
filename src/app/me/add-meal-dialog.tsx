"use client";

import * as React from "react";
import { Plus, Utensils } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { DateTime } from "luxon";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Database } from "@/lib/types/database.types";
import { AddFoodDialog } from "./add-food-dialog";

interface AddMealDialogProps {
  className?: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  localDate: string;
}

export function AddMealDialog({
  className,
  profile,
  localDate,
}: AddMealDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const currentLocalStartTime = DateTime.now();
  const currentLocalEndTime = DateTime.now().plus({ hours: 1 });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className={cn(className)}>
          <Plus className="h-9 w-9" />
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="flex max-h-dvh w-full max-w-3xl flex-col gap-4 overflow-y-auto"
      >
        <DialogTitle>
          <div className="text-2xl">{localDate}</div>
        </DialogTitle>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            식사 시간
            <span>{currentLocalStartTime.toFormat("hh:mm")}</span>
          </div>
          <div>
            칼로리:
            <span>ESTimated calories</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border p-4">
          <AddFoodDialog localDate={localDate} />

          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto pr-4"></div>
        </div>

        <div className="flex justify-end gap-2">
          <Button>추가</Button>
          <Button onClick={() => setIsDialogOpen(false)}>취소</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
