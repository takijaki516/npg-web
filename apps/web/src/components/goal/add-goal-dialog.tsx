import * as React from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { modifyGoalSchema } from "@repo/shared-schema";

import {
  GET_USER_GOAL_QUERY_KEY,
  getOrCreateGoalOptions,
  modifyGoal,
} from "@/lib/queries";
import { InputField } from "@/components/input-field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AddGoalDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AddGoalDialog({ isOpen, setIsOpen }: AddGoalDialogProps) {
  const [{ data: userGoal }] = useSuspenseQueries({
    queries: [getOrCreateGoalOptions],
  });

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
      setIsOpen(false);
      toast.success("수정되었습니다.");
      await queryClient.invalidateQueries({
        queryKey: [GET_USER_GOAL_QUERY_KEY],
      });
    },
    onError: () => {
      goalForm.reset();
      setIsOpen(false);
      toast.error("저장에 실패했습니다.");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>목표 설정</DialogTitle>
        </DialogHeader>

        <form
          className="flex h-full max-h-[400px] flex-col gap-1 overflow-y-auto"
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
          />
          <InputField
            label="체지방량"
            unit="kg"
            register={goalForm.register}
            name="bodyFatMassKg"
            isNumber={true}
          />
          <InputField
            label="골격근량"
            unit="kg"
            register={goalForm.register}
            name="skeletalMuscleMassKg"
            isNumber={true}
          />

          <Button
            className="mt-4"
            type="submit"
            disabled={mutateGoal.isPending}
          >
            {mutateGoal.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "저장"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
