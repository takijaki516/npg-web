import * as React from "react";
import { Loader2, X } from "lucide-react";
import { DayProps } from "react-day-picker";
import {
  useSuspenseQuery,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import {
  useNavigate,
  useParams,
  useRouteContext,
} from "@tanstack/react-router";

import { useDateTimeStore } from "@/lib/zustand/time-store";
import { cn } from "@/lib/utils";
import {
  GET_MONTHLY_INFO_QUERY_KEY,
  getDailyInfoOptions,
  getMonthlyInfoOptions,
  MonthlyInfo,
} from "@/lib/queries/info";
import { DailyMeals } from "./me/daily-meals/daily-meals";
import { DailyExercises } from "./me/daily-exercises/daily-exercises";
import { Calendar } from "./ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function MyCalendar() {
  const { yearmonth } = useParams({
    from: "/(user)/_layout/info/$yearmonth",
  });
  const { profile } = useRouteContext({ from: "/(user)/_layout" });

  useSuspenseQuery(
    getMonthlyInfoOptions({
      localYearMonth: yearmonth,
      timezone: profile.timezone,
    }),
  );

  const navigate = useNavigate({
    from: "/info/$yearmonth",
  });

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      showOutsideDays={false}
      selected={date}
      onSelect={setDate}
      className="h-full w-full"
      components={{
        Day: CustomDay,
      }}
      onMonthChange={(month) => {
        const year = month.getFullYear();
        const padMonth = (month.getMonth() + 1).toString().padStart(2, "0");
        const yearmonth = `${year}-${padMonth}`;
        navigate({ to: "/info/$yearmonth", params: { yearmonth } });
      }}
    />
  );
}

function CustomDay({ date, displayMonth }: DayProps) {
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const localDate = `${year}-${month}-${day}`;
  const yearmonth = `${year}-${month}`;

  const currentLocalDateTime = useDateTimeStore(
    (state) => state.currentDateTime,
  );
  const currentLocalDate = currentLocalDateTime.split(" ")[0];

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<MonthlyInfo>([
    GET_MONTHLY_INFO_QUERY_KEY,
    yearmonth,
  ]);

  const [isFull, setIsFull] = React.useState(false);

  if (displayMonth.getMonth() + 1 !== date.getMonth() + 1) {
    return null;
  }

  // TODO:
  if (!data) {
    return null;
  }

  const { exercisesByDate, mealsByDate } = data;
  const currentDateExercises = exercisesByDate[localDate];
  const currentDateMeals = mealsByDate[localDate];

  return (
    <div
      className={cn(
        "flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-border p-0 text-center text-base transition-all",
        // "focus-within:relative focus-within:z-20",
        "hover:border-primary/60",
        currentLocalDate === localDate && "border-primary/50",
        //
        (!!currentDateExercises || !!currentDateMeals) && "border-green-900/90",
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("clicked");
        setIsFull(true);
      }}
    >
      {isFull && <DailyInfo localDate={localDate} setIsFull={setIsFull} />}
      {day}
    </div>
  );
}

function DailyInfo({
  localDate,
  setIsFull,
}: {
  localDate: string;
  setIsFull: (isFull: boolean) => void;
}) {
  const { profile } = useRouteContext({ from: "/(user)/_layout" });
  const dailyInfoQuery = useQuery(
    getDailyInfoOptions({ localDate, timezone: profile.timezone }),
  );

  if (dailyInfoQuery.isLoading) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (dailyInfoQuery.isSuccess) {
    const { exercises, meals } = dailyInfoQuery.data;

    return (
      <div className="absolute inset-0 z-10 flex cursor-default flex-col gap-2 overflow-y-auto rounded-b-md border-t bg-background p-2 transition-all">
        <X
          className="absolute right-1 top-2 cursor-pointer text-primary/60 transition-colors hover:text-primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("close");
            setIsFull(false);
          }}
        />
        <div className="flex w-full items-center justify-center">
          {localDate}
        </div>

        <DailyInfoContent
          className="hidden sm:flex"
          exercises={
            <DailyExercises
              dailyWeightsExercises={exercises}
              profile={profile}
            />
          }
          meals={<DailyMeals dailyMealsWithFoods={meals} profile={profile} />}
        />

        <MobileDailyInfo
          className="flex h-full w-full flex-col rounded-md border p-2 sm:hidden"
          exercises={
            <div className="flex h-full flex-col overflow-y-auto">
              <DailyExercises
                dailyWeightsExercises={exercises}
                profile={profile}
              />
            </div>
          }
          meals={
            <div className="flex h-full flex-col overflow-y-auto">
              <DailyMeals dailyMealsWithFoods={meals} profile={profile} />
            </div>
          }
        />
      </div>
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
