"use client";

import * as React from "react";

import { useSessionStore } from "@/zustand/session-store";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { session } = useSessionStore();
  const router = useRouter();

  React.useEffect(() => {
    if (session) {
      router.push("/me");
      return;
    }
  }, [session]);

  if (session) {
    router.push("/me");
    return;
  }

  return <div>SignupPage</div>;
}
