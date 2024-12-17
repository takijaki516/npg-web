import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";

import { TanStackRouterDevtools } from "@/components/tanstack-router-devtool";
import { type AuthContext } from "@/auth";
import { supabase } from "@/lib/supabase";

interface RootRouteContext {
  auth: AuthContext;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <Outlet />

      <React.Suspense>
        <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
      </React.Suspense>
    </>
  ),
  beforeLoad: async ({ context }) => {
    // NOTE: for first render
    if (context.auth.isLoading) {
      await supabase.auth.getSession();
    }
  },
});
