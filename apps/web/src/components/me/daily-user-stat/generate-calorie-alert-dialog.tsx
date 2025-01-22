import * as React from "react";
import { Loader2 } from "lucide-react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
} from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { calculateDailyIntakeWithAISchema } from "@repo/shared-schema";

import {
  calculateDailyIntakeWithAI,
  GET_DAILY_INTAKE_QUERY_KEY,
  getLatestHealthInfoOptions,
  getOrCreateGoalOptions,
} from "@/lib/queries";
import { useDateTimeStore } from "@/lib/zustand/time-store";
import { UserGoalStat } from "./user-goal-stat";
import { UserHealthInfoStat } from "./user-health-info-stat";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface GenerateCalorieAlertDialogProps {
  children: React.ReactNode;
}

export function GenerateCalorieAlertDialog({
  children,
}: GenerateCalorieAlertDialogProps) {
  const [{ data: userGoal }, { data: latestHealthInfo }] = useSuspenseQueries({
    queries: [getOrCreateGoalOptions, getLatestHealthInfoOptions],
  });

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const currentDateTime = useDateTimeStore((state) => state.currentDateTime);

  const queryClient = useQueryClient();

  const mutateIntake = useMutation({
    mutationFn: ({
      currentLocalDate,
    }: z.infer<typeof calculateDailyIntakeWithAISchema>) =>
      calculateDailyIntakeWithAI({ currentLocalDate }),
    onError: () => {
      toast.error("칼로리를 계산하는데 실패했습니다. 다시 시도해주세요.");
    },
    onSuccess: async (data) => {
      setIsDialogOpen(false);
      toast.success("칼로리를 계산하는데 성공했습니다.");
      await queryClient.invalidateQueries({
        queryKey: [GET_DAILY_INTAKE_QUERY_KEY, data.date.split(" ")[0]],
      });
    },
  });

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger
        onClick={() => setIsDialogOpen(true)}
        className="rounded-md border border-border p-[2px] transition-colors hover:bg-muted"
      >
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col">
        <AlertDialogTitle>AI 칼로리 추천 받기</AlertDialogTitle>

        <AlertDialogDescription className="flex flex-col gap-4 rounded-md border p-2">
          <div className="text-base">
            최근2주간의 건강정보와 목표를 바탕으로 AI가 오늘 하루 섭취해야할
            영양정보를 계산합니다.
          </div>

          <UserHealthInfoStat healthInfo={latestHealthInfo} />

          <UserGoalStat userGoal={userGoal} />
        </AlertDialogDescription>

        <AlertDialogFooter className="flex flex-row items-center gap-2 self-end">
          <Button variant={"secondary"} onClick={() => setIsDialogOpen(false)}>
            닫기
          </Button>

          <Button variant={"outline"} disabled={mutateIntake.isPending}>
            {mutateIntake.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <div
                onClick={() =>
                  mutateIntake.mutate({
                    currentLocalDate: currentDateTime.split(" ")[0],
                  })
                }
              >
                생성
              </div>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
