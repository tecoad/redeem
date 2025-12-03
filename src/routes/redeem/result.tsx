import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/redeem/result')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/redeem/result"!</div>
}
