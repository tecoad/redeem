import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/Button"
import HowToDrawer from "@/components/Drawers/HowToDrawer"
import Giftcard from "@/components/Giftcard"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/redeem/")({
	component: RouteComponent,
})

function RouteComponent() {
	const router = useRouter()
	const [drawerOpen, setDrawerOpen] = useState(false)

	return (
		<>
			<Layout>
				<Giftcard />
				<Layout.Footer>
					<Button
						size="medium"
						className="w-auto"
						variant="ghost"
						onClick={() => setDrawerOpen(true)}
					>
						How to redeem?
					</Button>
					<Button onClick={() => router.navigate({ to: "/redeem/initiate" })}>Redeem now</Button>
				</Layout.Footer>
			</Layout>
			<HowToDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
		</>
	)
}
