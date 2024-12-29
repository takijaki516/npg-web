import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
import type { Session, User } from "better-auth";

import { TanStackRouterDevtools } from "@/components/tanstack-router-devtool";
import { authClient } from "@/lib/better-auth";

interface RootRouteContext {
  queryClient: QueryClient;
  session: Session | null;
  user: User | null;
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
  // TODO: add caching
  beforeLoad: async () => {
    // NOTE: for first render
    const { data, error } = await authClient.getSession();

    // TODO: handle error
    if (error) {
      throw error;
    }

    if (!data) {
      return {
        session: null,
        user: null,
      };
    }

    return {
      session: data.session,
      user: data.user,
    };
  },
});
