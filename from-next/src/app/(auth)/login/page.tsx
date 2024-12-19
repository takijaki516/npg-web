"use client";

import * as React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormLabel,
  FormMessage,
  FormControl,
  FormItem,
  FormField,
} from "../../../components/ui/form";
import { authSchema } from "../../../lib/schema/auth.schema";
import { supabaseClient } from "../../../supabase-utils/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = supabaseClient();

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

    router.push("/");
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
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">로그인</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                  "로그인"
                )}
              </Button>
            </form>

            <Button
              onClick={handleLoginWithGoogle}
              type="button"
              className="mt-2 flex w-full items-center justify-center"
            >
              <FcGoogle className="mr-2" />
              Login with Google
            </Button>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col items-center">
          <p className="mt-6 text-sm text-muted-foreground">
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
