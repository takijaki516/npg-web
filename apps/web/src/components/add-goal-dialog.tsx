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
import { insertGoalSchema } from "@repo/shared-schema";

import { honoClient } from "@/lib/hono";
import { GET_USER_GOAL_QUERY_KEY, getOrCreateGoalOptions } from "@/lib/queries";
import { InputField } from "./input-field";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface AddGoalDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AddGoalDialog({ isOpen, setIsOpen }: AddGoalDialogProps) {
  const [{ data: userGoal }] = useSuspenseQueries({
    queries: [getOrCreateGoalOptions],
  });

  const queryClient = useQueryClient();

  // TODO: add error handling
  const mutateGoal = useMutation({
    mutationFn: async (data: z.infer<typeof insertGoalSchema>) => {
      await honoClient.goal.$post({
        json: data,
      });
    },
    onMutate: async () => {},
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [GET_USER_GOAL_QUERY_KEY],
        }),
      ]);

      setIsOpen(false);
      toast.success("저장되었습니다.");
    },
  });

  const goalForm = useForm<z.infer<typeof insertGoalSchema>>({
    resolver: zodResolver(insertGoalSchema),
    defaultValues: {
      weightKg: userGoal.weightKg ?? 0,
      bodyFatMassKg: userGoal.bodyFatMassKg ?? 0,
      skeletalMuscleMassKg: userGoal.skeletalMuscleMassKg ?? 0,
      goalDescription: userGoal.goalDescription ?? "",
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
          <InputField
            label="목표"
            register={goalForm.register}
            name="goalDescription"
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
