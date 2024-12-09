"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addExerciseSchema } from "@/lib/schema/exercise";
import type { Database } from "@/lib/types/database.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ExerciseType } from "@/lib/types/exercise.types";
import { WeightsForm } from "./weights-form";
import { CardioForm } from "./cardio-form";
import { supabaseClient } from "@/supabase-utils/client";

interface ExerciseFormProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function ExerciseForm({ profile }: ExerciseFormProps) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState<ExerciseType>("weights");

  const form = useForm<z.infer<typeof addExerciseSchema>>({
    resolver: zodResolver(addExerciseSchema),
    defaultValues: {
      daily_tracker_id: "",
      difficulty: "",
      start_time: new Date().toISOString().slice(0, 16),
      // NOTE: add 30 minutes
      end_time: new Date(new Date().getTime() + 30 * 60 * 1000)
        .toISOString()
        .slice(0, 16),
      exercise_detail: {},
      user_email: profile.user_email,
    },
  });

  function handleSelectTab(tab: ExerciseType) {
    setSelectedTab(tab);
  }

  async function handleSubmitWithTabValue(
    currentTab: ExerciseType,
    profile: Database["public"]["Tables"]["profiles"]["Row"],
  ) {
    // NOTE: user_id null means user deleted account
    if (!profile.user_id) {
      return;
    }

    const supabase = supabaseClient<Database>();
    let dailyTrackerId = "";

    // const supabaseDate = new Date(form.getValues("start_time"))
    //   .toISOString() // UTC
    //   .substring(0, 19)
    //   .replace("T", " "); // Convert to PostgreSQL timestamp format

    const supabaseDate = new Date(form.getValues("start_time"))
      .toISOString()
      .substring(0, 10);

    // NOTE: should be unique
    const dailyTracker = await supabase
      .from("daily_trackings")
      .select("id")
      .eq("user_email", form.getValues("user_email"))
      .eq("date", supabaseDate);

    if (dailyTracker.error) {
      // TODO: error handling
      return;
    }

    if (dailyTracker.data[0]) {
      dailyTrackerId = dailyTracker.data[0].id;
    } else {
      // TODO: add daily tracking
      const { data, error } = await supabase
        .from("daily_trackings")
        .insert({
          user_email: form.getValues("user_email"),
          date: supabaseDate,
          user_id: profile.user_id,
        })
        .select("id");

      if (error) {
        // TODO: error handling
        return;
      }

      dailyTrackerId = data[0].id;
    }

    form.setValue("daily_tracker_id", dailyTrackerId);
    form.setValue("user_id", profile.user_id);

    if (currentTab === "weights") {
      form.setValue("exercise_detail", {
        exercise_type: "weights",
        weights_exercises: form.getValues("exercise_detail.weights_exercises"),
      });
    } else {
      form.setValue("exercise_detail", {
        exercise_type: "cardio",
        cardio_exercises: form.getValues("exercise_detail.cardio_exercises"),
      });
    }

    await form.handleSubmit(onSubmit)();
    // TODO: 운동 추가 성공 시 리다이렉트, error 처리
  }

  async function onSubmit(values: z.infer<typeof addExerciseSchema>) {
    console.log(values);
    // Add your submission logic here
    const supabase = supabaseClient<Database>();
    const { error } = await supabase.from("exercises").insert(values);
    if (error) {
      console.log(
        "🚀 ~ file: exercise-form.tsx:129 ~ onSubmit ~ error:",
        error,
      );
      // TODO: error handling
      return;
    }

    // TODO: 운동 추가 성공 시 리다이렉트
    router.push("/me/exercises");
  }

  if (!profile) {
    return <div>No profile</div>;
  }

  return (
    <div className="w-full pt-4">
      <Form {...form}>
        <form className="space-y-4">
          <Tabs defaultValue="weights" className="rounded-md bg-background">
            <TabsList className="grid w-full grid-cols-2 gap-2 bg-background">
              <TabsTrigger
                value="weights"
                className="border"
                onClick={() => handleSelectTab("weights")}
              >
                웨이트
              </TabsTrigger>

              <TabsTrigger
                value="cardio"
                className="border"
                onClick={() => handleSelectTab("cardio")}
              >
                유산소
              </TabsTrigger>
            </TabsList>

            <TabsContent value="weights">
              <WeightsForm form={form} />
            </TabsContent>

            <TabsContent value="cardio">
              <CardioForm form={form} />
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>시작 시간</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>종료 시간</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value ? field.value.slice(0, 16) : ""}
                      onChange={(e) => {
                        // NOTE: change to UTC
                        const date = new Date(e.target.value).toISOString();
                        field.onChange(date);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={() => {
              handleSubmitWithTabValue(selectedTab, profile);
            }}
          >
            운동 추가
          </Button>
        </form>
      </Form>
    </div>
  );
}
