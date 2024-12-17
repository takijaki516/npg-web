import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/_layout")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.session) {
      throw redirect({ to: "/login" });
    }
  },
});
