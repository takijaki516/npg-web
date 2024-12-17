import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AppSidebar } from "@/components/sidebar";
import { getProfile } from "@/lib/queries/profile";

export const Route = createFileRoute("/(user)/_layout")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.session) {
      throw redirect({ to: "/login" });
    }
  },
  loader: async ({ context }) => {
    const queryClient = context.queryClient;

    const userProfile = await queryClient.ensureQueryData({
      queryKey: ["profile"],
      queryFn: getProfile,
    });

    return { profile: userProfile };
  },
  component: MeLayout,
});

function MeLayout() {
  const { profile } = Route.useLoaderData();

  return (
    <div className="relative flex">
      <TooltipProvider>
        <AppSidebar profile={profile} />
        <Outlet />
      </TooltipProvider>
    </div>
  );
}
