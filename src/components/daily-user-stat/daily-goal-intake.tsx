"use client";

import * as React from "react";
import { Bot, RotateCw, Star, X } from "lucide-react";
import { z } from "zod";
import { DateTime } from "luxon";

import { supabaseClient } from "@/supabase-utils/client";
import { llmTargetSchema } from "@/app/api/day-target-intake/route";
import {
  AlertDialogFooter,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Database } from "@/lib/types/database.types";
import { cn } from "@/lib/utils";
import { InfoField } from "./daily-user-stat";
import { insertDailyGoalIntakeSchema } from "@/lib/schema/intake.schema";
import { toast } from "sonner";

interface DailyTargetIntakeProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  currentDate: string;
  className?: string;
}

export function DailyGoalIntake({
  profile,
  currentDate,
  className,
}: DailyTargetIntakeProps) {
  const [isAIGenerating, setIsAIGenerating] = React.useState(false);
  const [isAIDescriptionOpen, setIsAIDescriptionOpen] = React.useState(false);
  const [description, setDescription] = React.useState<string>("");

  const [targetIntake, setTargetIntake] = React.useState<Omit<
    z.infer<typeof llmTargetSchema>,
    "description"
  > | null>(null);

  async function handleAIGen() {
    setIsAIGenerating(true);

    const body: DayTargetIntakeBody = {
      current_date: currentDate,
    };

    const res = await fetch("/api/day-target-intake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      toast.error("Failed to generate target intake");
      return;
    }

    const {
      calories_for_today,
      carbohydrate_for_today,
      fat_for_today,
      protein_for_today,
      description,
    }: z.infer<typeof llmTargetSchema> = await res.json();

    const currentUTCDate = DateTime.fromFormat(currentDate, "yyyy-MM-dd")
      .setZone(profile.timezone)
      .toUTC()
      .toSQL();

    const validatedData = insertDailyGoalIntakeSchema.safeParse({
      user_id: profile.user_id,
      user_email: profile.user_email,
      date: currentUTCDate,

      goal_calories: calories_for_today,
      goal_carbohydrate_g: carbohydrate_for_today,
      goal_fat_g: fat_for_today,
      goal_protein_g: protein_for_today,

      llm_description: description,
    });

    if (!validatedData.success) {
      toast.error("fail to parse data");
      return;
    }

    const supabase = supabaseClient<Database>();
    const { error } = await supabase
      .from("daily_intakes")
      .insert(validatedData.data);

    if (error) {
      toast.error("failed to add to supabase");
      return;
    }

    setTargetIntake({
      calories_for_today,
      carbohydrate_for_today,
      fat_for_today,
      protein_for_today,
    });

    setDescription(description);
    setIsAIDescriptionOpen(true);
    setIsAIGenerating(false);
  }

  function handleCloseDescription() {
    setDescription("");
    setIsAIDescriptionOpen(false);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <AlertDialog
        open={isAIDescriptionOpen}
        onOpenChange={setIsAIDescriptionOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Bot />
            </AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDescription}>
              <X />
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center gap-1">
        <Star size={22} className="text-yellow-500" />

        <span className="text-center font-semibold">
          {profile.language === "ko" ? "목표 섭취량" : "Target Intake"}
        </span>

        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <button
              className="ml-4 flex size-8 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
              onClick={handleAIGen}
            >
              {isAIGenerating ? (
                <RotateCw className="animate-spin" size={22} />
              ) : (
                <Bot size={22} />
              )}
            </button>
          </TooltipTrigger>

          <TooltipContent className="bg-muted-foreground">
            {profile.language === "ko" ? "AI로 생성하기" : "Generate by AI"}
          </TooltipContent>
        </Tooltip>
      </div>

      <InfoField
        label={profile.language === "ko" ? "칼로리" : "Calories"}
        value={targetIntake?.calories_for_today?.toString() ?? "0"}
        className="h-9"
      />
      <InfoField
        label={profile.language === "ko" ? "탄수화물" : "Carbohydrate"}
        value={targetIntake?.carbohydrate_for_today?.toString() ?? "0"}
        className="h-9"
      />
      <InfoField
        label={profile.language === "ko" ? "단백질" : "Protein"}
        value={targetIntake?.protein_for_today?.toString() ?? "0"}
        className="h-9"
      />
      <InfoField
        label={profile.language === "ko" ? "지방" : "Fat"}
        value={targetIntake?.fat_for_today?.toString() ?? "0"}
        className="h-9"
      />
    </div>
  );
}

export interface DayTargetIntakeBody {
  current_date: string;
}
