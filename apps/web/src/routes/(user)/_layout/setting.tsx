import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/_layout/setting")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(user)/_layout/setting"!</div>;
}
