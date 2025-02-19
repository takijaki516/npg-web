import { Home } from "lucide-react";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";

import { type AuthClient, authClient } from "@/lib/better-auth";
import { TanStackRouterDevtools } from "@/components/tanstack-router-devtool";
import { GlobalErrorLayout } from "@/components/global-error-layout";

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
  notFoundComponent: () => {
    return (
      <GlobalErrorLayout>
        <div className="text-3xl text-muted-foreground">
          404 페이지를 찾을 수 없어요
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-xl text-muted-foreground transition hover:cursor-pointer hover:text-primary hover:underline hover:underline-offset-2"
        >
          <Home className="size-6" />
          홈페이지로 가기
        </Link>
      </GlobalErrorLayout>
    );
  },
  //  TODO: global error component
  errorComponent: () => {
    return (
      <GlobalErrorLayout>
        <div className="text-3xl text-muted-foreground">
          오류가 발생했어요. 다시 시도해주세요.
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-xl text-muted-foreground transition hover:cursor-pointer hover:text-primary hover:underline hover:underline-offset-2"
        >
          <Home className="size-6" />
          홈페이지로 가기
        </Link>
      </GlobalErrorLayout>
    );
  },
});
