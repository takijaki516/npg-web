import Link from "next/link";
import { Plus, Settings } from "lucide-react";

import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { MeHeader } from "@/components/me-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProfile } from "@/supabase-utils/server-queries/auth";
// import { SingleMealCard } from "./single-meal-card";
// import { SingleWorkoutCard } from "./single-workout-card";

export default async function MePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  const date = (await params).date;

  // const DAILY_EXERCISE_DATA = dailyTrackingsData.exercises.sort(
  //   (a, b) =>
  //     new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
  // );

  // const DAILY_MEAL_DATA = dailyTrackingsData.meals.sort(
  //   (a, b) =>
  //     new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  // );

  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center">
      <MeHeader currentPageTitle={`${profile.username}님`} />

      <div className="flex w-full max-w-3xl flex-col p-4 pb-[100px] md:pt-6">
        <main className="flex flex-col lg:w-full lg:items-center">
          <BentoGrid className="grid w-full gap-4 md:grid-cols-2">
            <BentoGridItem className="rounded-xl md:col-span-full">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">Today</div>

                <div>😄</div>

                <div>오늘 목표</div>
              </div>
            </BentoGridItem>

            <BentoGridItem className="hidden rounded-xl md:inline-block">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                  <span>Workouts</span>

                  <Link
                    href="/me/exercises/new"
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    <Settings className="h-9 w-9" />
                  </Link>
                </div>

                {/* <div className="flex flex-col gap-4">
                  {DAILY_EXERCISE_DATA.map((exercise, idx) => {
                    return (
                      <SingleWorkoutCard
                        key={exercise.id}
                        exercise={exercise}
                        idx={idx}
                      />
                    );
                  })}
                </div> */}
              </div>
            </BentoGridItem>

            <BentoGridItem className="hidden rounded-xl md:inline-block">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                  <span>Meals</span>

                  <Link
                    href="/me/meals/new"
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    <Plus className="h-9 w-9" />
                  </Link>
                </div>

                {/* <div className="flex flex-col gap-4">
                  {DAILY_MEAL_DATA.map((meal, idx) => {
                    return (
                      <SingleMealCard key={meal.id} meal={meal} idx={idx} />
                    );
                  })}
                </div> */}
              </div>
            </BentoGridItem>

            <BentoGridItem className="md:hidden">
              MobileBottomGrid
            </BentoGridItem>
          </BentoGrid>
        </main>
      </div>
    </div>
  );
}
