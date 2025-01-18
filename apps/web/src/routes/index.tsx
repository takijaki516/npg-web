import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { Camera, Dumbbell, PieChart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { profile, session } = useRouteContext({ from: "/" });

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background">
      <Navbar profile={profile} session={session} />

      <section className="container mt-12 w-full max-w-3xl px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
              AI 당신의 피트니스 여정을 혁신하세요
            </h2>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-xl">
            <img
              src="/hero-1.png"
              alt="App interface showcase"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container mt-12 w-full max-w-3xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Camera className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">AI 칼로리 인식</h3>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <PieChart className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">칼로리 기록</h3>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Dumbbell className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">운동 기록 관리</h3>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
