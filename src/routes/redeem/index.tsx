import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/redeem/")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/redeem"!</div>
}
