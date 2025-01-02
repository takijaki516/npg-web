import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";

import { TanStackRouterDevtools } from "@/components/tanstack-router-devtool";
import { type AuthClient, authClient } from "@/lib/better-auth";

interface RootRouteContext {
  queryClient: QueryClient;
  profile: AuthClient["$Infer"]["Session"]["profile"] | null;
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
  beforeLoad: async ({ context }) => {
    if (context.profile) {
      return { profile: context.profile };
    }

    // NOTE: for first render
    const { data, error } = await authClient.getSession();

    // TODO: handle error
    if (error) {
      throw error;
    }

    if (!data) {
      return {
        profile: null,
      };
    }

    return {
      profile: data.profile,
    };
  },
  onError: (error) => {
    console.log("🚀 ~ file: __root.tsx:32 ~ beforeLoad: ~ error:", error);
  },
  errorComponent: ({ error }) => {
    return <div>{error.message}</div>;
  },
});
