import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

import { Sidebar } from "@/components/sidebar";

export const Route = createFileRoute("/(user)/_layout")({
  beforeLoad: ({ context }) => {
    if (!context.profile) {
      throw redirect({ to: "/login" });
    }

    return { profile: context.profile };
  },
  component: MeLayout,
});

function MeLayout() {
  return (
    <div className="relative flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}
