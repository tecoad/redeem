import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/Button"
import RedeemDrawer from "@/components/Drawers/RedeemDrawer"
import Layout from "@/components/Layout"
import Title from "@/components/Title"

export const Route = createFileRoute("/redeem/initiate")({
	component: RouteComponent,
})

function RouteComponent() {
	const [drawerOpen, setDrawerOpen] = useState(false)

	return (
		<>
			<Layout>
				<Title
					title="Redeeming"
					subtitle="Enter the PIX code provided by the merchant at the payment."
				/>
				<Layout.Footer>
					<Button onClick={() => setDrawerOpen(true)}>Process</Button>
				</Layout.Footer>
			</Layout>
			<RedeemDrawer activeElementKey="initiate" open={drawerOpen} onOpenChange={setDrawerOpen} />
		</>
	)
}
