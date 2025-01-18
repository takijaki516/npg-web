import { Link, useRouter, createLazyFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const Route = createLazyFileRoute("/(auth)/_auth/login")({
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

  const onSubmit = async (values: z.infer<typeof authSchema>) => {};

  async function handleLoginWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      fetchOptions: {
        onSuccess: async () => {
          await router.navigate({ to: "/", reloadDocument: true });
        },
      },
    });
  }

  return (
    <main className="container mt-20 flex w-full flex-1 flex-col items-center px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">로그인</CardTitle>
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
                "로그인"
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
