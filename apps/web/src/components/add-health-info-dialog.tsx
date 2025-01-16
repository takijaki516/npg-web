import * as React from "react";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient, useQueries } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertHealthInfoSchema } from "@repo/shared-schema";
import { toast } from "sonner";

import {
  GET_LATEST_HEALTH_INFO_QUERY_KEY,
  GET_RANGE_HEALTH_INFO_QUERY_KEY,
  GET_SPECIFIC_HEALTH_INFO_QUERY_KEY,
  getLatestHealthInfoOptions,
  getSpecificHealthInfoOptions,
  insertHealthInfo,
  type SpecificHealthInfo,
  type HealthInfo,
} from "@/lib/queries";
import { InputField } from "./input-field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AddHealthInfoDialogContainerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  healthInfoDate: string;
}

export function AddHealthInfoDialogContainer({
  isOpen,
  setIsOpen,
  healthInfoDate,
}: AddHealthInfoDialogContainerProps) {
  const [specificHealthInfoQuery, latestHealthInfoQuery] = useQueries({
    queries: [
      getSpecificHealthInfoOptions({ localDate: healthInfoDate }),
      getLatestHealthInfoOptions,
    ],
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-lg rounded-md">
        {(specificHealthInfoQuery.isLoading ||
          latestHealthInfoQuery.isLoading) && (
          <div className="flex h-[300px] w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {specificHealthInfoQuery.isSuccess &&
          latestHealthInfoQuery.isSuccess && (
            <AddHealthInfoDialog
              healthInfoDate={healthInfoDate}
              specificHealthInfo={specificHealthInfoQuery.data}
              latestHealthInfo={latestHealthInfoQuery.data}
              setDialogOpen={setIsOpen}
            />
          )}
      </DialogContent>
    </Dialog>
  );
}

interface AddHealthInfoDialogProps {
  specificHealthInfo: SpecificHealthInfo | null;
  latestHealthInfo: HealthInfo | null;
  setDialogOpen: (open: boolean) => void;
  healthInfoDate: string;
}

export function AddHealthInfoDialog({
  healthInfoDate,
  latestHealthInfo,
  specificHealthInfo,
  setDialogOpen,
}: AddHealthInfoDialogProps) {
  const queryClient = useQueryClient();

  const mutateHealthInfo = useMutation({
    mutationFn: async (data: z.infer<typeof insertHealthInfoSchema>) =>
      await insertHealthInfo(data),
    onSuccess: async (data) => {
      setDialogOpen(false);
      healthInfoForm.reset();
      toast.success("저장되었습니다.");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [GET_LATEST_HEALTH_INFO_QUERY_KEY],
        }),
        queryClient.invalidateQueries({
          queryKey: [GET_RANGE_HEALTH_INFO_QUERY_KEY],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            GET_SPECIFIC_HEALTH_INFO_QUERY_KEY,
            data.measuredDate.split(" ")[0],
          ],
        }),
      ]);
    },
    onError: () => {
      setDialogOpen(false);
      toast.error("저장에 실패했습니다. 나중에 다시 시도해주세요.");
    },
  });

  const healthInfoForm = useForm<z.infer<typeof insertHealthInfoSchema>>({
    resolver: zodResolver(insertHealthInfoSchema),
  });

  React.useEffect(() => {
    healthInfoForm.reset({
      measuredDate: healthInfoDate,
      heightCm: specificHealthInfo?.heightCm ?? latestHealthInfo?.heightCm ?? 0,
      weightKg: specificHealthInfo?.weightKg ?? latestHealthInfo?.weightKg ?? 0,
      bodyFatMassKg:
        specificHealthInfo?.bodyFatMassKg ??
        latestHealthInfo?.bodyFatMassKg ??
        0,
      skeletalMuscleMassKg:
        specificHealthInfo?.skeletalMuscleMassKg ??
        latestHealthInfo?.skeletalMuscleMassKg ??
        0,
      age: specificHealthInfo?.age ?? latestHealthInfo?.age ?? 0,
    });
  }, [healthInfoForm, healthInfoDate, specificHealthInfo, latestHealthInfo]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <div>{healthInfoForm.watch("measuredDate")}</div>
        </DialogTitle>
      </DialogHeader>

      <form
        className="flex flex-col gap-1 overflow-y-auto"
        onSubmit={healthInfoForm.handleSubmit((data) => {
          mutateHealthInfo.mutate(data);
        })}
      >
        <InputField
          label="나이"
          register={healthInfoForm.register}
          name="age"
          isNumber={true}
        />
        <InputField
          label="키"
          unit="cm"
          register={healthInfoForm.register}
          name="heightCm"
          isNumber={true}
        />
        <InputField
          label="몸무게"
          unit="kg"
          register={healthInfoForm.register}
          name="weightKg"
          isNumber={true}
        />
        <InputField
          label="체지방량"
          unit="kg"
          isOptional={true}
          register={healthInfoForm.register}
          name="bodyFatMassKg"
          isNumber={true}
        />
        <InputField
          label="골격근량"
          unit="kg"
          isOptional={true}
          register={healthInfoForm.register}
          name="skeletalMuscleMassKg"
          isNumber={true}
        />
        <Button
          className="mt-4"
          type="submit"
          disabled={mutateHealthInfo.isPending}
        >
          {mutateHealthInfo.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "저장"
          )}
        </Button>
      </form>
    </>
  );
}
