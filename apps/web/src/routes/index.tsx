import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { Brain, Camera, Dumbbell, PieChart, Sparkles } from "lucide-react";

// import Iphone15Pro from "@/components/ui/iphone-15-pro";
// import Safari from "@/components/ui/safari";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { profile } = useRouteContext({ from: "/" });

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background">
      <Navbar profile={profile} />

      <section className="container mt-12 px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
              AI 당신의 피트니스 여정을 혁신하세요
            </h2>
            <p className="text-muted-foreground">
              AI 기술로 피트니스의 미래를 경험하세요. 당신의 고유한 필요에 맞춰
              조정되어 그 어느 때보다 빠르게 건강 목표를 달성하도록
              도와드립니다.
            </p>
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

      {/* <section className="container mt-12 px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <Iphone15Pro />
            <Safari />
          </div>
        </section> */}

      <section className="container mt-12 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Camera className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">AI 칼로리 인식</h3>
              <p className="text-center text-muted-foreground">
                사진 한 장으로 음식의 칼로리를 즉시 계산하세요
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <PieChart className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">칼로리 기록</h3>
              <p className="text-center text-muted-foreground">
                일일 칼로리 섭취량과 영양 목표를 추적하고 관리하세요
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Dumbbell className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">운동 기록 관리</h3>
              <p className="text-center text-muted-foreground">
                운동 루틴과 진행 상황을 기록하고 모니터링하세요
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Brain className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">AI 운동프로그램 제공</h3>
              <p className="text-center text-muted-foreground">
                목표와 진행 상황에 따른 맞춤형 운동 계획을 받아보세요
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-2">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <Sparkles className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">개인 AI 코치</h3>
              <p className="text-center text-muted-foreground">
                영양/운동 조언, 동기부여 및 실시간 피드백 제공
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
