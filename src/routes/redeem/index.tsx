import { createFileRoute, useRouter } from "@tanstack/react-router"
import { motion } from "motion/react"
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

	const _variants = {
		initial: {},
		final: {},
	}

	return (
		<>
			<Layout
				// as={motion.div}
				className="gap-0"
				// variants={variants}
				// initial="initial"
				// animate="final"
			>
				<div className="w-full h-full relative">
					<Giftcard view="detailed" />
				</div>

				<Layout.Footer
					as={motion.div}
					variants={{
						initial: {
							height: 0,
						},
						final: {
							height: "auto",
						},
					}}
					transition={{
						delay: 3,
					}}
				>
					<div className="overflow-hidden w-full flex items-center justify-center flex-col gap-2">
						<Button
							size="medium"
							className="w-auto"
							variant="ghost"
							onClick={() => setDrawerOpen(true)}
						>
							How to redeem?
						</Button>
						<Button onClick={() => router.navigate({ to: "/redeem/initiate" })}>Redeem now</Button>
					</div>
				</Layout.Footer>
			</Layout>
			<HowToDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
		</>
	)
}
