import * as React from "react";
import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

import { getProfileOptions } from "@/lib/queries";
import { Sidebar } from "@/components/sidebar";

export const Route = createFileRoute("/(user)/_layout")({
  beforeLoad: ({ context }) => {
    if (!context.session || !context.user) {
      throw redirect({ to: "/login" });
    }
    return { user: context.user };
  },
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(getProfileOptions);
  },
  component: MeLayout,
});

function MeLayout() {
  return (
    <div className="relative flex">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
      </React.Suspense>

      <Outlet />
    </div>
  );
}
