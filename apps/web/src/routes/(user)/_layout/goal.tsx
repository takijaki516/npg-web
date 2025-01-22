import * as React from "react";
import { Loader2, Pencil } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { modifyGoalSchema } from "@repo/shared-schema";

import { cn } from "@/lib/utils";
import {
  GET_USER_GOAL_QUERY_KEY,
  getOrCreateGoalOptions,
  modifyGoal,
} from "@/lib/queries";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { InputField } from "@/components/input-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/(user)/_layout/goal")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    queryClient.ensureQueryData(getOrCreateGoalOptions);
  },
});

function RouteComponent() {
  const { data: userGoal } = useSuspenseQuery(getOrCreateGoalOptions);
  const isMobile = useIsMobile();
  const [isModifying, setIsModifying] = React.useState(false);
  const queryClient = useQueryClient();

  const goalForm = useForm<z.infer<typeof modifyGoalSchema>>({
    resolver: zodResolver(modifyGoalSchema),
    defaultValues: {
      goalId: userGoal.id,
      weightKg: userGoal.weightKg ?? 0,
      bodyFatMassKg: userGoal.bodyFatMassKg ?? 0,
      skeletalMuscleMassKg: userGoal.skeletalMuscleMassKg ?? 0,
    },
  });

  React.useEffect(() => {
    goalForm.reset({
      goalId: userGoal.id,
      weightKg: userGoal.weightKg ?? 0,
      bodyFatMassKg: userGoal.bodyFatMassKg ?? 0,
      skeletalMuscleMassKg: userGoal.skeletalMuscleMassKg ?? 0,
    });
  }, [goalForm, userGoal]);

  const mutateGoal = useMutation({
    mutationFn: async (data: z.infer<typeof modifyGoalSchema>) =>
      await modifyGoal(data),
    onSuccess: async () => {
      goalForm.reset();

      toast.success("수정되었습니다.");
      await queryClient.invalidateQueries({
        queryKey: [GET_USER_GOAL_QUERY_KEY],
      });
    },
    onError: () => {
      goalForm.reset();

      toast.error("저장에 실패했습니다.");
    },
  });

  return (
    <div className="flex min-h-dvh w-full flex-col items-center p-2 xs:p-4 lg:py-6">
      {isMobile && (
        <div className="fixed left-2 top-2 z-20 flex items-center justify-center rounded-md p-1 transition-colors hover:bg-accent">
          <MobileSidebar />
        </div>
      )}

      <main className="mt-24">
        <Card className="relative w-[300px] xs:w-[400px]">
          <CardHeader>
            <CardTitle className="text-xl">현재 목표</CardTitle>
          </CardHeader>

          <button
            className={cn(
              "absolute right-2 top-2 rounded-md p-1.5 transition-colors hover:bg-muted",
              isModifying && "bg-primary text-primary-foreground",
            )}
            onClick={() => setIsModifying((prev) => !prev)}
          >
            <Pencil size={20} />
          </button>

          <CardContent>
            <form
              className="flex flex-col gap-3"
              onSubmit={goalForm.handleSubmit((data) => {
                mutateGoal.mutate(data);
              })}
            >
              <InputField
                label="몸무게"
                unit="kg"
                register={goalForm.register}
                name="weightKg"
                isNumber={true}
                isModifying={isModifying}
              />
              <InputField
                label="체지방량"
                unit="kg"
                register={goalForm.register}
                name="bodyFatMassKg"
                isNumber={true}
                isOptional={true}
                isModifying={isModifying}
              />
              <InputField
                label="골격근량"
                unit="kg"
                register={goalForm.register}
                name="skeletalMuscleMassKg"
                isNumber={true}
                isOptional={true}
                isModifying={isModifying}
              />

              <Button
                type="submit"
                disabled={mutateGoal.isPending || !isModifying}
              >
                {mutateGoal.isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "수정"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
