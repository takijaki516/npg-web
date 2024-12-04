import * as React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@/components/tanstack-router-devtools";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="npg-theme">
      <main>
        <Outlet />

        <React.Suspense>
          <TanStackRouterDevtools />
        </React.Suspense>
      </main>
    </ThemeProvider>
  ),
});
