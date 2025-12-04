import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/Button"
import ConfirmationDrawer from "@/components/Drawers/ConfirmationDrawer"
import TopupDrawer from "@/components/Drawers/TopupDrawer"
import Heading from "@/components/Heading"
import Layout from "@/components/Layout"
import PixTopUpReveal from "@/components/PixTopUpReveal"
import Stepper from "@/components/Stepper"

export const Route = createFileRoute("/redeem/initiate")({
	component: RouteComponent,
})

type ActiveDrawer = "topup" | "confirmation" | null

function RouteComponent() {
	const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null)
	const [lastOpened, setLastOpened] = useState<"topup" | "confirmation">("confirmation")

	const handleOpenDrawer = () => {
		const next = lastOpened === "topup" ? "confirmation" : "topup"
		setActiveDrawer(next)
		setLastOpened(next)
	}

	return (
		<>
			<Layout>
				<Stepper>
					<Stepper.Step to="/redeem/initiate">Step 1</Stepper.Step>
					<Stepper.Step to="/redeem/topup" disabled>
						Step 2
					</Stepper.Step>
					<Stepper.Step to="/redeem/result" disabled>
						Step 3
					</Stepper.Step>
				</Stepper>
				<Heading>
					<Heading.Title>Redeeming</Heading.Title>
					<Heading.Subtitle>
						Enter the PIX code provided by the merchant at the payment.
					</Heading.Subtitle>
				</Heading>

				<PixTopUpReveal />

				<Layout.Footer>
					<Button onClick={handleOpenDrawer}>Process</Button>
				</Layout.Footer>
			</Layout>
			<TopupDrawer
				open={activeDrawer === "topup"}
				onOpenChange={open => setActiveDrawer(open ? "topup" : null)}
			/>
			<ConfirmationDrawer
				open={activeDrawer === "confirmation"}
				onOpenChange={open => setActiveDrawer(open ? "confirmation" : null)}
			/>
		</>
	)
}
