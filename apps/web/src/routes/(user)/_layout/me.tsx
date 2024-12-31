import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { MeHeader } from "@/components/me-header";
import { BentoDashboard } from "@/components/me/bento-dashboard";
import { getProfileOptions } from "@/lib/queries";

export const Route = createFileRoute("/(user)/_layout/me")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: profile } = useSuspenseQuery(getProfileOptions);

  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center">
      <React.Suspense fallback={<div>Loading...</div>}>
        <MeHeader currentPageTitle={`${profile.email}`} />
      </React.Suspense>

      <div className="flex w-full max-w-3xl flex-col p-4 pb-[100px] md:pt-6">
        <main className="flex flex-col lg:w-full lg:items-center">
          <BentoDashboard />
        </main>
      </div>
    </div>
  );
}
