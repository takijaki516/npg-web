"use client";

import * as React from "react";
import { Bot, RotateCw, Star, X } from "lucide-react";
import { z } from "zod";
import { DateTime } from "luxon";
import { toast } from "sonner";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

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
import { cn, convertToRangeOfDayUTCTime } from "@/lib/utils";
import { InfoField } from "./daily-user-stat";
import { insertDailyGoalIntakeSchema } from "@/lib/schema/intake.schema";

export interface DailyGoalIntakeData {
  llmDescription: string;
  goalCalories: number;
  goalCarbohydrate: number;
  goalFat: number;
  goalProtein: number;
}

interface DailyTargetIntakeProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  currentDate: string;
  className?: string;
  dailyGoalIntakeData: DailyGoalIntakeData;
}

export function DailyGoalIntake({
  profile,
  currentDate,
  className,
  dailyGoalIntakeData,
}: DailyTargetIntakeProps) {
  const queryClient = useQueryClient();

  const [isAIDescriptionOpen, setIsAIDescriptionOpen] = React.useState(false);

  const intakeGoalQuery = useQuery<DailyGoalIntakeData>({
    queryKey: ["daily-goal-intake", currentDate],
    initialData: dailyGoalIntakeData,
    queryFn: async () => {
      const { startTimeOfDay, endTimeOfDay } = convertToRangeOfDayUTCTime({
        localDate: currentDate,
        timeZone: profile.timezone,
      });

      const supabase = supabaseClient<Database>();
      const { data, error } = await supabase
        .from("daily_intakes")
        .select(
          `
        llm_description,
        goal_calories_kcal,
        goal_carbohydrate_g,
        goal_fat_g,
        goal_protein_g
        `,
        )
        .eq("user_email", profile.user_email)
        .gte("date", startTimeOfDay)
        .lt("date", endTimeOfDay)
        .limit(1)
        .single();

      if (error) {
        throw error;
      }

      return {
        llmDescription: data.llm_description,
        goalCalories: data.goal_calories_kcal,
        goalCarbohydrate: data.goal_carbohydrate_g,
        goalFat: data.goal_fat_g,
        goalProtein: data.goal_protein_g,
      };
    },
  });

  const intakeGoalMutation = useMutation({
    mutationFn: async () => {
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
        throw new Error("Failed to generate target intake");
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

        goal_calories_kcal: calories_for_today,
        goal_carbohydrate_g: carbohydrate_for_today,
        goal_fat_g: fat_for_today,
        goal_protein_g: protein_for_today,

        llm_description: description,
      });

      if (!validatedData.success) {
        throw new Error("fail to parse data");
      }

      const supabase = supabaseClient<Database>();
      const { error } = await supabase
        .from("daily_intakes")
        .insert(validatedData.data);

      if (error) {
        throw error;
      }

      const data = {
        llmDescription: validatedData.data.llm_description,
        goalCalories: validatedData.data.goal_calories_kcal,
        goalCarbohydrate: validatedData.data.goal_carbohydrate_g,
        goalFat: validatedData.data.goal_fat_g,
        goalProtein: validatedData.data.goal_protein_g,
      } satisfies DailyGoalIntakeData;

      return data;
    },
    onMutate: () => {
      setIsAIDescriptionOpen(true);
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(["daily-goal-intake", currentDate], newData);
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  function handleCloseDescription() {
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
            <AlertDialogDescription>
              {intakeGoalQuery.isLoading || !intakeGoalQuery.data ? (
                <div className="flex items-center gap-2">
                  <RotateCw className="animate-spin" size={22} />
                  <span>Loading...</span>
                </div>
              ) : (
                <span>{intakeGoalQuery.data.llmDescription}</span>
              )}
            </AlertDialogDescription>
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
              onClick={() => intakeGoalMutation.mutate()}
            >
              {intakeGoalMutation.isPending ? (
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
        value={`${intakeGoalQuery.data?.goalCalories.toString()}kcal`}
        className="h-9"
      />
      <InfoField
        label={profile.language === "ko" ? "탄수화물" : "Carbohydrate"}
        value={`${intakeGoalQuery.data?.goalCarbohydrate.toString()}g`}
        className="h-9"
      />
      <InfoField
        label={profile.language === "ko" ? "단백질" : "Protein"}
        value={`${intakeGoalQuery.data?.goalProtein.toString()}g`}
        className="h-9"
      />
      <InfoField
        label={profile.language === "ko" ? "지방" : "Fat"}
        value={`${intakeGoalQuery.data?.goalFat.toString()}g`}
        className="h-9"
      />
    </div>
  );
}

export interface DayTargetIntakeBody {
  current_date: string;
}
