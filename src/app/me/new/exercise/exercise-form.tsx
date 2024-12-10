import * as React from "react";
import type { Database } from "@/lib/types/database.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeightsForm } from "./weights-form";
import { CardioForm } from "./cardio-form";

interface ExerciseFormProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function ExerciseForm({ profile }: ExerciseFormProps) {
  // const form = useForm<z.infer<typeof addExerciseSchema>>({
  //   resolver: zodResolver(addExerciseSchema),
  //   defaultValues: {
  //     daily_tracker_id: "",
  //     difficulty: "",
  //     start_time: startTime,
  //     end_time: endTime,
  //     exercise_detail: {},
  //     user_email: profile.user_email,
  //   },
  // });

  // async function handleSubmitWithTabValue(
  //   currentTab: ExerciseType,
  //   profile: Database["public"]["Tables"]["profiles"]["Row"],
  // ) {
  //   // NOTE: user_id null means user deleted account
  //   if (!profile.user_id) {
  //     return;
  //   }

  //   const supabase = supabaseClient<Database>();
  //   let dailyTrackerId = "";
  //   const supabaseDate = new Date(form.getValues("start_time")).toISOString();

  //   // NOTE: should be unique
  //   const dailyTracker = await supabase
  //     .from("daily_trackings")
  //     .select("id")
  //     .eq("user_email", form.getValues("user_email"))
  //     .eq("date", supabaseDate);

  //   if (dailyTracker.error) {
  //     // TODO: error handling
  //     return;
  //   }

  //   if (dailyTracker.data[0]) {
  //     dailyTrackerId = dailyTracker.data[0].id;
  //   } else {
  //     // TODO: add daily tracking
  //     const { data, error } = await supabase
  //       .from("daily_trackings")
  //       .insert({
  //         user_email: form.getValues("user_email"),
  //         date: supabaseDate,
  //         user_id: profile.user_id,
  //       })
  //       .select("id");

  //     if (error) {
  //       // TODO: error handling
  //       return;
  //     }

  //     dailyTrackerId = data[0].id;
  //   }

  //   form.setValue("daily_tracker_id", dailyTrackerId);
  //   form.setValue("user_id", profile.user_id);

  //   if (currentTab === "weights") {
  //     form.setValue("exercise_detail", {
  //       exercise_type: "weights",
  //       weights_exercises: form.getValues("exercise_detail.weights_exercises"),
  //     });
  //   } else {
  //     form.setValue("exercise_detail", {
  //       exercise_type: "cardio",
  //       cardio_exercises: form.getValues("exercise_detail.cardio_exercises"),
  //     });
  //   }

  //   await form.handleSubmit(onSubmit)();
  //   // TODO: 운동 추가 성공 시 리다이렉트, error 처리
  // }

  // async function onSubmit(values: z.infer<typeof addExerciseSchema>) {
  //   console.log(values);
  //   // Add your submission logic here
  //   const supabase = supabaseClient<Database>();
  //   const { error } = await supabase.from("exercises").insert(values);
  //   if (error) {
  //     console.log(
  //       "🚀 ~ file: exercise-form.tsx:129 ~ onSubmit ~ error:",
  //       error,
  //     );
  //     // TODO: error handling
  //     return;
  //   }

  //   // TODO: 운동 추가 성공 시 리다이렉트
  //   router.push("/me/exercises");
  // }

  if (!profile) {
    return <div>No profile</div>;
  }

  return (
    <div className="w-full space-y-6 pt-4">
      <Tabs defaultValue="weights" className="rounded-md bg-background">
        <TabsList className="grid w-full grid-cols-2 gap-2 bg-background">
          <TabsTrigger value="weights" className="border">
            웨이트
          </TabsTrigger>

          <TabsTrigger value="cardio" className="border">
            유산소
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weights">
          <WeightsForm />
        </TabsContent>

        <TabsContent value="cardio">
          {/* <CardioForm /> */}
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* <div>
          <Label>시작 시간</Label>
          <Input
            type="datetime-local"
            onChange={(e) => {
              const utcTime = new Date(e.target.value).toISOString();
              setStartTime(utcTime);
              form.setValue("start_time", utcTime);
            }}
            value={
              startTime
                ? new Date(startTime).toLocaleString("sv-SE").slice(0, 16)
                : ""
            }
          />
        </div>

        <div>
          <Label>종료 시간</Label>
          <Input
            type="datetime-local"
            onChange={(e) => {
              const utcTime = new Date(e.target.value).toISOString();
              setEndTime(utcTime);
              form.setValue("end_time", utcTime);
            }}
            value={
              endTime
                ? new Date(endTime).toLocaleString("sv-SE").slice(0, 16)
                : ""
            }
          />
        </div> */}
      </div>

      {/* <Button
        type="button"
        className="w-full"
        onClick={() => {
          handleSubmitWithTabValue(selectedTab, profile);
        }}
      >
        운동 추가
      </Button> */}
    </div>
  );
}
