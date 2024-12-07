"use client";

import * as React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormLabel,
  FormMessage,
  FormControl,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { supabaseClient } from "@/supabase-utils/client";
import { authSchema } from "@/lib/schema/auth";
import { useSessionStore } from "@/zustand/session-store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const { session, setSession } = useSessionStore();
  const router = useRouter();
  const supabase = supabaseClient();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // REVIEW:
  React.useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    const signupRes = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (signupRes.error) {
      toast.error("회원가입에 실패하였습니다.");
      return;
    }

    // NOTE: this is when email confirmation is disable.
    const signInRes = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    setSession(signInRes.data.session);
    router.push("/");
  };

  function handleLoginWithGoogle() {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/api/auth/callback",
      },
    });
  }

  return (
    <main className="container mt-20 flex w-full flex-1 flex-col items-center px-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input placeholder="비밀번호" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-8 w-full"
                disabled={form.formState.isLoading}
              >
                {form.formState.isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "회원가입"
                )}
              </Button>
            </form>
          </Form>

          <Button
            onClick={handleLoginWithGoogle}
            type="button"
            className="mt-2 w-full"
          >
            Login with Google
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col items-center">
          <p className="mt-6 text-sm text-muted-foreground">
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
