import { useAuthStore } from "@/lib/zustand/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/auth/callback")({
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      throw redirect({
        to: "/",
      });
    }
  },
  validateSearch: z.object({
    code: z.string(),
  }),
  loaderDeps: async ({ search }) => {
    return {
      code: search.code,
    };
  },
  loader: async ({ deps }) => {
    const { code } = await deps;

    const res = await fetch("http://localhost:7788/auth/callback", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!res.ok) {
      throw new Error("Token exchange failed");
    }

    const { access_token } = await res.json();

    useAuthStore.setState({
      accessToken: access_token,
    });

    throw redirect({
      to: "/",
    });
  },
});
