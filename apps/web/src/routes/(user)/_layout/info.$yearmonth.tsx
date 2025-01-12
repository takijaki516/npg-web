import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
} from "@tanstack/react-query";
import { useForm, UseFormRegister, Path } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertHealthInfoSchema } from "@repo/shared-schema";

import { honoClient } from "@/lib/hono";
import { cn } from "@/lib/utils";
import {
  GET_LATEST_HEALTH_INFO_QUERY_KEY,
  GET_RANGE_HEALTH_INFO_QUERY_KEY,
  getLatestHealthInfoOptions,
  getMonthlyInfoOptions,
} from "@/lib/queries";
import { MyCalendar } from "@/components/my-calendar";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { BarChartComponent } from "@/components/bar-chart";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(user)/_layout/info/$yearmonth")({
  component: RouteComponent,

  loader: async ({ context, params }) => {
    const { yearmonth } = params;
    const queryClient = context.queryClient;
    const profile = context.profile;

    queryClient.ensureQueryData(
      getMonthlyInfoOptions({
        localYearMonth: yearmonth,
        timezone: profile.timezone,
      }),
    );
  },
});

function RouteComponent() {
  const [{ data: latestHealthInfo }] = useSuspenseQueries({
    queries: [getLatestHealthInfoOptions],
  });
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = React.useState(false);

  const healthInfoForm = useForm<z.infer<typeof insertHealthInfoSchema>>({
    resolver: zodResolver(insertHealthInfoSchema),
    defaultValues: {
      heightCm: latestHealthInfo?.heightCm ?? 0,
      weightKg: latestHealthInfo?.weightKg ?? 0,
      bodyFatMassKg: latestHealthInfo?.bodyFatMassKg ?? 0,
      skeletalMuscleMassKg: latestHealthInfo?.skeletalMuscleMassKg ?? 0,
      age: latestHealthInfo?.age ?? 0,
    },
  });

  // TODO: add error handling
  const mutateHealthInfo = useMutation({
    mutationFn: async (data: z.infer<typeof insertHealthInfoSchema>) => {
      await honoClient.healthinfo.$post({
        json: data,
      });
    },
    onMutate: async () => {},
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [GET_LATEST_HEALTH_INFO_QUERY_KEY],
        }),
        queryClient.invalidateQueries({
          queryKey: [GET_RANGE_HEALTH_INFO_QUERY_KEY],
        }),
      ]);

      setIsOpen(false);
      healthInfoForm.reset();
    },
  });

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center overflow-y-auto p-4 lg:py-10">
      <main className="flex h-full w-full max-w-3xl flex-col items-center gap-4">
        <div className="relative flex w-full flex-col rounded-md border border-border p-2">
          <div className="absolute left-2 top-2 flex items-center gap-4 text-lg font-semibold">
            <MobileSidebar />
          </div>

          <BarChartComponent setDialogOpen={setIsOpen} form={healthInfoForm} />

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogTitle>
                <div>{healthInfoForm.getValues("measuredDate")}</div>
              </DialogTitle>

              <form
                className="flex flex-col gap-2"
                onSubmit={healthInfoForm.handleSubmit((data) => {
                  mutateHealthInfo.mutate(data);
                })}
              >
                <InputField
                  label="키"
                  register={healthInfoForm.register}
                  name="heightCm"
                  isNumber={true}
                />
                <InputField
                  label="몸무게"
                  register={healthInfoForm.register}
                  name="weightKg"
                  isNumber={true}
                />
                <InputField
                  label="체지방량"
                  register={healthInfoForm.register}
                  name="bodyFatMassKg"
                  isNumber={true}
                />
                <InputField
                  label="골격근량"
                  register={healthInfoForm.register}
                  name="skeletalMuscleMassKg"
                  isNumber={true}
                />

                <Button
                  className="mt-4"
                  type="submit"
                  disabled={mutateHealthInfo.isPending}
                >
                  {mutateHealthInfo.isPending ? "저장중..." : "저장"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full flex-1 rounded-md border border-border">
          <React.Suspense fallback={<div>Loading...</div>}>
            <MyCalendar />
          </React.Suspense>
        </div>
      </main>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  register: UseFormRegister<z.infer<typeof insertHealthInfoSchema>>;
  name: Path<z.infer<typeof insertHealthInfoSchema>>;
  isNumber?: boolean;
}

function InputField({ label, register, name, isNumber }: InputFieldProps) {
  return (
    <div className="inline-flex min-h-10 items-start gap-2">
      <div className="flex flex-col">
        <label className="w-[8ch]">{label}</label>
        <span className="text-xs text-muted-foreground/50">
          {name !== "heightCm" && name !== "weightKg" && "선택사항"}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <input
          className={cn(
            "w-[8ch] border text-end",
            "rounded-md bg-transparent px-1 pr-[6px]",
            "focus:outline-none",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          )}
          type={isNumber ? "number" : "text"}
          {...register(name, {
            setValueAs: (value) => (isNumber ? Number(value) : value),
          })}
        />

        <span>{name === "heightCm" ? "cm" : "kg"}</span>
      </div>
    </div>
  );
}
