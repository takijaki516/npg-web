import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/_layout/meal")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(user)/_layout/meal"!</div>;
}
