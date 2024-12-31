import { Bot, Loader2, Info } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { honoClient } from "@/lib/hono";
import {
  getOrCreateDailyIntake,
  type DailyIntake,
  type Profile,
} from "@/lib/queries";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DailyIntakeProps {
  profile: Profile;
  currentLocalDateTime: string;
}

export function DailyIntake({
  profile,
  currentLocalDateTime,
}: DailyIntakeProps) {
  const queryClient = useQueryClient();

  // REVIEW: 여기서 useQuery를 사용해야 하는 이유
  const dailyIntakeQuery = useQuery({
    queryKey: ["dailyIntake"],
    queryFn: () =>
      getOrCreateDailyIntake({
        currentLocalDateTime: currentLocalDateTime,
        timezone: profile.timezone,
      }),
  });

  const mutateIntake = useMutation({
    mutationFn: async () => {
      // TODO: error handling
      if (!dailyIntakeQuery.data) {
        throw new Error("Daily intake not found");
      }

      await honoClient.ai.intake.$post({
        json: {
          dateTime: currentLocalDateTime,
          timezone: profile.timezone,
          dailyIntakeId: dailyIntakeQuery.data.id,
        },
      });
    },
    onMutate: async () => {
      // TODO: snapshot previous intake
    },
    onError: () => {
      // TODO: error handling
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["dailyIntake"],
      });
    },
  });

  if (dailyIntakeQuery.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cn("flex gap-2 pt-2")}>
      <div className="flex flex-1 flex-col justify-center gap-1 rounded-md border p-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div>cur/total</div>
            {dailyIntakeQuery.data?.llmDescription && (
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] border bg-muted text-sm text-muted-foreground">
                  {dailyIntakeQuery.data.llmDescription}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className="flex cursor-pointer items-center justify-center rounded-md p-1 hover:bg-muted">
            {mutateIntake.isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Bot onClick={() => mutateIntake.mutate()} size={20} />
            )}
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-16 whitespace-nowrap">칼로리</div>

          <div className="w-20 border">
            <span>333</span>/
            <span>{dailyIntakeQuery.data?.goalCaloriesKcal ?? "00"}</span>
          </div>

          <div
            className={cn(
              "ml-1 h-5 flex-1 overflow-hidden rounded-full bg-muted",
            )}
          >
            <div
              className="h-full bg-green-500"
              style={{ width: `${(333 / 1000) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-16 whitespace-nowrap">탄수화물</div>

          <div className="flex w-20 gap-1">
            <span>{dailyIntakeQuery.data?.intakeCarbohydratesG ?? "0"}g</span>
            <span>/</span>
            <span>{dailyIntakeQuery.data?.goalCarbohydratesG ?? "?"}g</span>
          </div>

          <div
            className={cn("h-5 flex-1 overflow-hidden rounded-full bg-muted")}
          >
            <div
              className="h-full bg-green-500"
              style={{ width: `${(333 / 1000) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* REVIEW: whitespace */}
          <div className="w-16 whitespace-nowrap">단백질</div>

          <div className="flex w-20 gap-1">
            <span>{dailyIntakeQuery.data?.intakeProteinG ?? "0"}g</span>
            <span>/</span>
            <span>{dailyIntakeQuery.data?.goalProteinG ?? "?"}g</span>
          </div>

          <div
            className={cn("h-5 flex-1 overflow-hidden rounded-full bg-muted")}
          >
            <div
              className="h-full bg-green-500"
              style={{ width: `${(333 / 1000) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-16 whitespace-nowrap">지방</div>

          <div className="flex w-20 gap-1">
            <span>{dailyIntakeQuery.data?.intakeFatG ?? "0"}g</span>
            <span>/</span>
            <span>{dailyIntakeQuery.data?.goalFatG ?? "?"}g</span>
          </div>

          <div
            className={cn("h-5 flex-1 overflow-hidden rounded-full bg-muted")}
          >
            <div
              className="h-full bg-green-500"
              style={{ width: `${(333 / 1000) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-md border">
        B
      </div>
    </div>
  );
}
