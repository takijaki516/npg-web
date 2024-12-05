"use client";

import { useSessionStore } from "@/zustand/session-store";

export default function MePage() {
  const { session } = useSessionStore();

  if (!session) {
    return null;
  }

  return <div>{session.user.email}</div>;
}
