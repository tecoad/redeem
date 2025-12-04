import { createFileRoute } from "@tanstack/react-router"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/redeem/result")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<Layout>
			<Layout.Footer>Lorem ipsum</Layout.Footer>
		</Layout>
	)
}
