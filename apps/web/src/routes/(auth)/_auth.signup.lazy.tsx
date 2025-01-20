import * as React from "react";
import { Loader2 } from "lucide-react";
import { Link, createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { authClient } from "@/lib/better-auth";
import { authSchema } from "@/lib/schemas/auth.schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Google from "@/components/svg-icons";

export const Route = createLazyFileRoute("/(auth)/_auth/signup")({
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

    await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.email,
      fetchOptions: {
        onError: () => {
          toast.error("회원가입에 실패했습니다");
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
          <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={authForm.handleSubmit(onSubmit)}
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
                  <br /> 비밀번호는 최소 8자 이상이어야 합니다
                </span>
              )}
            </div>

            <Button type="submit" variant={"secondary"} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "회원가입"}
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
            이미 계정이 있습니까?
            <Link
              href="/login"
              className="pl-2 font-medium text-primary hover:underline hover:underline-offset-2"
            >
              로그인
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
