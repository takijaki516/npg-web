import * as React from "react";
import { Loader2 } from "lucide-react";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { honoClient } from "@/lib/hono";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    onSuccess: async () => {
      window.location.reload();
    },
    onError: () => {
      toast.error("타임존 변경 실패. 다시 시도해주세요.");
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
          <CardHeader className="flex flex-row items-center gap-2">
            <Avatar className="size-8 rounded-md">
              <AvatarImage
                src={profile.image ?? undefined}
                alt={profile.email}
                className="size-full"
              />
              <AvatarFallback className="rounded-md">
                {profile.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {profile.email}
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-base">현재 위치:</div>

              <div className="flex items-center gap-2">
                <AlertDialog>
                  <AlertDialogTrigger
                    className={cn(
                      "text-muted-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4",
                      profile.timezone === "America/New_York" && "text-primary",
                    )}
                    disabled={timezoneMutate.isPending}
                  >
                    {timezoneMutate.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "뉴욕"
                    )}
                  </AlertDialogTrigger>

                  <AlertDialogContent className="rounded-md">
                    <AlertDialogHeader className="items-start">
                      <AlertDialogTitle>위치 변경</AlertDialogTitle>
                      <AlertDialogDescription>
                        현재위치를 뉴욕으로 변경
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex flex-row items-center justify-end gap-2">
                      <AlertDialogCancel className="m-0">
                        취소
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() => {
                          timezoneMutate.mutateAsync("America/New_York");
                        }}
                        disabled={timezoneMutate.isPending}
                      >
                        {timezoneMutate.isPending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          "변경"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger
                    className={cn(
                      "text-muted-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4",
                      profile.timezone === "Asia/Seoul" && "text-primary",
                    )}
                    disabled={timezoneMutate.isPending}
                  >
                    {timezoneMutate.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "서울"
                    )}
                  </AlertDialogTrigger>

                  <AlertDialogContent className="rounded-md">
                    <AlertDialogHeader className="items-start">
                      <AlertDialogTitle>위치 변경</AlertDialogTitle>
                      <AlertDialogDescription>
                        현재위치를 서울으로 변경
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex flex-row items-center justify-end gap-2">
                      <AlertDialogCancel className="m-0">
                        취소
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          timezoneMutate.mutate("Asia/Seoul");
                        }}
                        disabled={timezoneMutate.isPending}
                      >
                        {timezoneMutate.isPending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          "변경"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* TODO: */}
            <button className="cursor-pointer text-base text-red-500/80 transition-colors hover:text-red-600 hover:underline hover:underline-offset-4">
              회원 탈퇴
            </button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
