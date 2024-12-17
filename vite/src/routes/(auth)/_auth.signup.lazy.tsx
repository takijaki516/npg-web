import { Loader2 } from "lucide-react";
import { Link, useRouter, createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { authSchema } from "@/lib/schemas/auth.schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/(auth)/_auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(
        "로그인에 실패하였습니다.\n" +
          "이메일 또는 비밀번호를 확인해주세요.\n" +
          "회원가입을 진행하지 않았다면 회원가입을 진행해주세요.\n",
        {
          style: {
            whiteSpace: "pre-line",
          },
        },
      );
      return;
    }

    router.navigate({ to: "/" });
  };

  async function handleLoginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/api/auth/callback",
      },
    });
  }

  return (
    <main className="container mt-20 flex w-full flex-1 flex-col items-center px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex flex-col rounded-md border">
              <div className="flex flex-col rounded-t-md border-b p-2 focus-within:ring-2 focus-within:ring-primary">
                <input
                  type="email"
                  className="text-xl focus:outline-none"
                  placeholder="이메일"
                  {...form.register("email")}
                />
              </div>

              <div className="flex flex-col gap-1 rounded-b-md p-2 focus-within:ring-2 focus-within:ring-primary">
                <input
                  type="password"
                  className="text-xl focus:outline-none"
                  placeholder="비밀번호"
                  {...form.register("password")}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isLoading}
            >
              {form.formState.isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "회원가입"
              )}
            </Button>
          </form>

          <Button
            onClick={handleLoginWithGoogle}
            type="button"
            className="mt-2 flex w-full items-center justify-center"
          >
            Login with Google
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
