import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/redeem/initiate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/redeem/initiate"!</div>
}
