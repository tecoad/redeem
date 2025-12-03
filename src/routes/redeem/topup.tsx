import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/redeem/topup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/redeem/topup"!</div>
}
