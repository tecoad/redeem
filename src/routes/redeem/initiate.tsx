import { createFileRoute } from "@tanstack/react-router"
import {
	IconCircleCheck3FillDuo18,
	IconQrcodeFillDuo18,
	IconTriangleWarningFillDuo18,
} from "nucleo-ui-fill-duo-18"
import { useState } from "react"
import { Button, type ButtonStates } from "@/components/Buttons/Button"
import { SlideXButton } from "@/components/Buttons/SlideXButton"
import ConfirmationDrawer from "@/components/Drawers/ConfirmationDrawer"
import TopupDrawer from "@/components/Drawers/TopupDrawer"
import Giftcard from "@/components/Giftcard"
import Heading from "@/components/Heading"
import Layout from "@/components/Layout"
import { Spinner } from "@/components/Spinner"
import Stepper from "@/components/Stepper"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/redeem/initiate")({
	component: RouteComponent,
})

type ActiveDrawer = "topup" | "confirmation" | null

function RouteComponent() {
	const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null)
	const [lastOpened, setLastOpened] = useState<"topup" | "confirmation">("confirmation")

	const [state, setState] = useState<ButtonStates>("idle")
	const [canUserProceed, setCanUserProceed] = useState(false)
	const [clickCount, setClickCount] = useState(0)

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

				<div className="flex flex-col gap-5 w-full items-center justify-center">
					<Giftcard
						className={cn(
							"flex flex-col items-center justify-center bg-primary",
							canUserProceed && "bg-success"
						)}
					>
						<SlideXButton
							onClick={() => {
								// change to pending
								setState("pending")

								// after 2 seconds change based on click count
								setTimeout(() => {
									// First click: error, second click: success, then alternate
									let resultState: ButtonStates
									if (clickCount === 0) {
										resultState = "error"
									} else if (clickCount === 1) {
										resultState = "success"
									} else {
										// Alternate between success and error
										resultState = clickCount % 2 === 0 ? "error" : "success"
									}

									setCanUserProceed(resultState === "success")
									setState(resultState)
									setClickCount(prev => prev + 1)

									setTimeout(() => {
										setState("idle")
									}, 2000)
								}, 2000)
							}}
							icon={ICON[state]}
							variant="neutral"
							className="w-auto pointer-events-auto "
							size="medium"
							state={state}
						>
							{LABEL[state ?? "idle"]}
						</SlideXButton>
					</Giftcard>
					<Button variant="ghost" className="w-auto" size="medium">
						<IconQrcodeFillDuo18 className="size-5" /> Read qrcode
					</Button>
				</div>

				<Layout.Footer>
					<div className="text-caption text-muted-foreground text-center mb-1 text-balance">
						This is a secure process any transaction will take place in a safe enviroment.
					</div>
					<Button disabled={!canUserProceed} onClick={handleOpenDrawer}>
						Proceed
					</Button>
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

const ICON = {
	idle: undefined,
	pending: <Spinner className="size-full" />,
	success: <IconCircleCheck3FillDuo18 className="size-full" />,
	error: <IconTriangleWarningFillDuo18 className="size-full" />,
}

const LABEL = {
	idle: "Paste from clipboard",
	pending: "Validating data",
	success: "Valid data",
	error: "Error pix expired",
}
