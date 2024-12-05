"use client";

import * as React from "react";

import { useSessionStore } from "@/zustand/session-store";
import { supabaseClient } from "@/supabase";

export default function MeLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const { session, setSession } = useSessionStore();

  React.useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="h-screen">
      {isLoading ? "loading..." : session ? children : "로그인이 필요합니다."}
    </div>
  );
}
