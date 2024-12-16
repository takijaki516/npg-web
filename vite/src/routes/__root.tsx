import * as React from "react";
import { createRootRoute, Link } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@/components/tanstack-router-devtool";

export const Route = createRootRoute({
  component: () => (
    <>
      <div>
        <Link>Home</Link>
        <Link>About</Link>
      </div>

      <React.Suspense>
        <TanStackRouterDevtools />
      </React.Suspense>
    </>
  ),
});
