import {
  createFileRoute,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import { Camera, Dumbbell, ChartLine, UtensilsCrossed } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { PWAInstallButton } from "@/components/pwa-install";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.session && context.profile) {
      throw redirect({
        to: "/me",
      });
    }
  },
  component: Index,
});

function Index() {
  const { profile } = useRouteContext({ from: "/" });

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background">
      <Navbar profile={profile} />

      <section className="mt-12 flex w-full max-w-xl justify-center px-4">
        <div className="w-fit">
          <h1 className="animated-header text-5xl">Coach247</h1>
        </div>
      </section>

      <section className="mt-12 flex w-full max-w-xl justify-around px-4">
        <PWAInstallButton />
      </section>

      <section className="mt-12 flex w-full max-w-xl justify-center px-4 pb-8">
        <div className="grid w-full place-items-center gap-2 xs:grid-cols-2">
          <Card className="w-full max-w-sm">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Camera className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">AI 칼로리 계산</h3>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <UtensilsCrossed className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">식단 기록</h3>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Dumbbell className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">운동 기록</h3>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <ChartLine className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">체중 기록</h3>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
