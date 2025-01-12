import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";

import { type AuthClient, authClient } from "@/lib/better-auth";
import { TanStackRouterDevtools } from "@/components/tanstack-router-devtool";

interface RootRouteContext {
  queryClient: QueryClient;
  profile: AuthClient["$Infer"]["Session"]["profile"] | null;
  session: AuthClient["$Infer"]["Session"]["session"] | null;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
  // TODO: add caching
  beforeLoad: async ({ context }) => {
    if (context.session && context.profile) {
      return { profile: context.profile, session: context.session };
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
        session: null,
      };
    }

    return {
      profile: data.profile,
      session: data.session,
    };
  },
  onError: () => {},
  errorComponent: ({ error }) => {
    return <div>{error.message}</div>;
  },
});
