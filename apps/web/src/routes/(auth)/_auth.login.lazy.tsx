import * as React from "react";
import { Link, useRouter, createLazyFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authClient } from "@/lib/better-auth";
import { authSchema } from "@/lib/schemas/auth.schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Google from "@/components/svg-icons";

export const Route = createLazyFileRoute("/(auth)/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const authForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    setIsLoading(true);

    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onError: () => {
          toast.error("로그인에 실패했습니다");
        },
        onSuccess: async () => {
          await router.navigate({ to: "/", reloadDocument: true });
        },
      },
    });

    setIsLoading(false);
  };

  async function handleLoginWithGoogle() {
    setIsLoading(true);

    await authClient.signIn.social({
      provider: "google",
      fetchOptions: {
        onSuccess: async () => {
          await router.navigate({ to: "/", reloadDocument: true });
        },
      },
    });

    setIsLoading(false);
  }

  return (
    <main className="container mt-20 flex w-full flex-1 flex-col items-center px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">로그인</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <form
            onSubmit={authForm.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex flex-col rounded-md border">
              <div className="flex flex-col rounded-t-md border-b p-1 focus-within:ring-1 focus-within:ring-primary">
                <input
                  type="email"
                  className="bg-transparent p-1 focus:outline-none"
                  placeholder="이메일"
                  {...authForm.register("email")}
                />
              </div>

              <div className="flex flex-col gap-1 rounded-b-md p-1 focus-within:ring-1 focus-within:ring-primary">
                <input
                  type="password"
                  className="bg-transparent p-1 focus:outline-none"
                  placeholder="비밀번호"
                  {...authForm.register("password")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {authForm.formState.errors.email && (
                <span className="text-red-500">
                  이메일을 올바르게 작성해주세요
                </span>
              )}
              {authForm.formState.errors.password && (
                <span className="text-red-500">
                  비밀번호를 올바르게 작성해주세요.
                </span>
              )}
            </div>

            <Button type="submit" variant={"secondary"} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "로그인"}
            </Button>
          </form>

          <Button
            onClick={handleLoginWithGoogle}
            type="button"
            variant={"secondary"}
            className="mt-1 flex w-full items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Google />
                구글 로그인
              </>
            )}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col items-center">
          <p className="mt-2 text-sm text-muted-foreground">
            계정이 없습니까?
            <Link
              href="/signup"
              className="pl-2 font-medium text-primary hover:underline hover:underline-offset-2"
            >
              회원가입
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
