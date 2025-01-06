import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/_layout/exercise')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(user)/_layout/exercise"!</div>
}
