import { Loader2 } from "lucide-react";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { honoClient } from "@/lib/hono";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/(user)/_layout/setting")({
  component: RouteComponent,
});

function RouteComponent() {
  const { profile } = useRouteContext({ from: "/(user)/_layout" });
  const isMobile = useIsMobile();

  const timezoneMutate = useMutation({
    mutationFn: async (timezone: string) => {
      return await honoClient.user.timezone.$post({
        json: { timezone },
      });
    },
    onSuccess: () => {
      toast.success("타임존 변경 완료");
    },
    onError: () => {
      toast.error("타임존 변경 실패. 다시 시도해주세요.");
    },
  });

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center px-2">
      {isMobile && (
        <div className="fixed left-2 top-2 z-20 flex items-center justify-center rounded-md p-1 transition-colors hover:bg-accent">
          <MobileSidebar />
        </div>
      )}

      <main className="flex w-full max-w-xs flex-col items-center justify-center gap-2 rounded-md border border-border px-2 py-4 sm:gap-4 sm:px-4 sm:py-6">
        <div className="flex w-full items-center justify-center gap-2">
          <Avatar className="size-8 rounded-md">
            <AvatarImage
              src={profile.image ?? undefined}
              alt={profile.email}
              className="size-full"
            />
            <AvatarFallback className="rounded-md">
              {profile.email}
            </AvatarFallback>
          </Avatar>

          {profile.email}
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <div className="font-semibold">현재 위치</div>

          <div className="flex items-center gap-2">
            <button
              className={cn(
                "rounded-md border border-border p-2 py-1 text-primary/80 transition-colors hover:bg-accent/80 hover:text-primary",
                profile.timezone === "America/New_York" &&
                  "bg-accent text-primary",
              )}
              onClick={() => {
                timezoneMutate.mutate("America/New_York");
              }}
              disabled={timezoneMutate.isPending}
            >
              {timezoneMutate.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "뉴욕"
              )}
            </button>
            <button
              className={cn(
                "rounded-md border border-border p-2 py-1 text-primary/80 transition-colors hover:bg-accent/80 hover:text-primary",
                profile.timezone === "Asia/Seoul" && "bg-accent text-primary",
              )}
              onClick={() => {
                timezoneMutate.mutate("Asia/Seoul");
              }}
              disabled={timezoneMutate.isPending}
            >
              {timezoneMutate.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "서울"
              )}
            </button>
          </div>
        </div>

        <button className="flex w-full cursor-pointer items-center justify-center font-semibold text-red-500/80 transition-colors hover:text-red-600 hover:underline hover:underline-offset-4">
          회원 탈퇴
        </button>
      </main>
    </div>
  );
}
