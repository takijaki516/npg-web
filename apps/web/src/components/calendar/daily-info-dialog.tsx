import * as React from "react";
import { Loader2 } from "lucide-react";
import { useQueries } from "@tanstack/react-query";

import {
  getDailyWorkoutOptions,
  getDailyMealsWithFoodsOptions,
} from "@/lib/queries";
import { cn } from "@/lib/utils";
import { DailyExercises } from "@/components/exercises/daily-exercises";
import { DailyMeals } from "@/components/meals/daily-meals";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DailyInfoDialogProps {
  children: React.ReactNode;
  localDate: string;
}

export function DailyInfoDialog({ children, localDate }: DailyInfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="dialog-content !w-full !max-w-3xl">
        <DialogHeader>
          <DialogTitle>{localDate}</DialogTitle>
        </DialogHeader>
        <DailyInfo localDate={localDate} />
      </DialogContent>
    </Dialog>
  );
}

function DailyInfo({ localDate }: { localDate: string }) {
  const [workoutQuery, mealsQuery] = useQueries({
    queries: [
      getDailyWorkoutOptions({ currentLocalDate: localDate }),
      getDailyMealsWithFoodsOptions({ currentLocalDate: localDate }),
    ],
  });

  if (workoutQuery.isLoading || mealsQuery.isLoading) {
    return (
      <div className="flex w-full flex-1 items-center justify-center bg-background">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (workoutQuery.isSuccess && mealsQuery.isSuccess) {
    return (
      <>
        <DailyInfoContent
          className="hidden flex-1 sm:flex"
          exercises={
            <DailyExercises dailyWeightsExercises={workoutQuery.data} />
          }
          meals={<DailyMeals dailyMealsWithFoods={mealsQuery.data} />}
        />

        <MobileDailyInfo
          className="flex w-full flex-1 flex-col rounded-md border p-2 sm:hidden"
          exercises={
            <div className="flex h-full flex-col overflow-y-auto">
              <DailyExercises dailyWeightsExercises={workoutQuery.data} />
            </div>
          }
          meals={
            <div className="flex h-full flex-col overflow-y-auto">
              <DailyMeals dailyMealsWithFoods={mealsQuery.data} />
            </div>
          }
        />
      </>
    );
  }
}

export function MobileDailyInfo({
  className,
  exercises,
  meals,
}: {
  className: string;
  exercises: React.ReactNode;
  meals: React.ReactNode;
}) {
  return (
    <Tabs
      defaultValue="exercises"
      className={cn("flex-col overflow-y-auto", className)}
    >
      <TabsList className="flex items-center justify-center gap-2">
        <TabsTrigger value="exercises">운동</TabsTrigger>
        <TabsTrigger value="meals">식단</TabsTrigger>
      </TabsList>

      <TabsContent value="exercises" className="flex-1 overflow-y-auto">
        {exercises}
      </TabsContent>

      <TabsContent value="meals" className="flex-1 overflow-y-auto">
        {meals}
      </TabsContent>
    </Tabs>
  );
}

export function DailyInfoContent({
  exercises,
  meals,
  className,
}: {
  exercises: React.ReactNode;
  meals: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-1 flex-row gap-2 overflow-y-auto", className)}
    >
      <div className="hidden flex-1 flex-col overflow-y-auto rounded-md border border-border p-2 sm:flex">
        {exercises}
      </div>

      <div className="hidden flex-1 flex-col overflow-y-auto rounded-md border border-border p-2 sm:flex">
        {meals}
      </div>
    </div>
  );
}
