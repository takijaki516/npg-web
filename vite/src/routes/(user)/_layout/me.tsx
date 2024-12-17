import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/_layout/me")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(user)/_layout/me"!</div>;
}
