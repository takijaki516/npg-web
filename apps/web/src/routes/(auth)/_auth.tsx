import { Navbar } from "@/components/navbar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/_auth")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.session) {
      throw redirect({ to: search.redirect || "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background">
      <Navbar profile={null} />
      <Outlet />
    </div>
  );
}
