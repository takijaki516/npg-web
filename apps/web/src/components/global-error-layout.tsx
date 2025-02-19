import * as React from "react";
import { Navbar } from "./navbar";
import { Route } from "@/routes/__root";

export function GlobalErrorLayout({ children }: { children: React.ReactNode }) {
  const context = Route.useRouteContext();

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background">
      <Navbar profile={context.profile} />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        {children}
      </div>
    </div>
  );
}
