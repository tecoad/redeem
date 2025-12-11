import { createFileRoute } from "@tanstack/react-router"
import { motion } from "motion/react"
import {
	IconCircleCheck3FillDuo18,
	IconQrcodeFillDuo18,
	IconTriangleWarningFillDuo18,
} from "nucleo-ui-fill-duo-18"
import { useState } from "react"
import { Button, type ButtonStates } from "@/components/Buttons/Button"
import { SlideXButton } from "@/components/Buttons/SlideXButton"
import TopupDrawer from "@/components/Drawers/TopupDrawer"
import Giftcard from "@/components/Giftcard"
import Heading from "@/components/Heading"
import Layout from "@/components/Layout"
import { Skeleton } from "@/components/Skeleton"
import { Spinner } from "@/components/Spinner"
import Stepper from "@/components/Stepper"
import { subtitleMotionConfig, titleMotionConfig } from "@/lib/motionConfigs"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/_app/redeem/initiate")({
	component: RouteComponent,
})

type ActiveDrawer = "topup" | "confirmation" | null

function RouteComponent() {
	const [activeDrawer, setActiveDrawer] = useState<ActiveDrawer>(null)
	const [_lastOpened, setLastOpened] = useState<"topup" | "confirmation">("confirmation")

	const [state, setState] = useState<ButtonStates>("idle")
	const [canUserProceed, setCanUserProceed] = useState(false)
	const [clickCount, setClickCount] = useState(0)

	const handleOpenDrawer = () => {
		// const next = lastOpened === "topup" ? "confirmation" : "topup"
		const next = "topup"
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
					<Heading.Title as={motion.h1} {...titleMotionConfig}>
						Redeeming
					</Heading.Title>
					<Heading.Subtitle as={motion.h2} {...subtitleMotionConfig}>
						Enter the PIX code provided by the merchant at the payment.
					</Heading.Subtitle>
				</Heading>

				<div className="flex flex-col gap-5 w-full items-center justify-center">
					<Giftcard
						className={cn(
							"flex flex-col items-center justify-center bg-muted transition-colors duration-150 ease-in-out",
							canUserProceed && state === "success" && "bg-success",
							state === "error" && "bg-destructive/10"
						)}
					>
						{state === "pending" && (
							<Skeleton
								className={cn("size-full opacity-60 absolute inset-0 [--color:var(--primary)]")}
							/>
						)}
						<motion.div
							className="size-full flex items-center justify-center flex flex-col gap-3"
							initial={{
								translateY: "100%",
								opacity: 0,
							}}
							animate={{
								translateY: "0%",
								opacity: 1,
							}}
							transition={{
								type: "spring",
								bounce: 0.5,
								duration: 1.2,
								delay: 0.4,
							}}
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
								className="w-auto pointer-events-auto "
								size="md"
								variant={state === "success" ? "outline" : "muted"}
								state={state}
							>
								{LABEL[state ?? "idle"]}
							</SlideXButton>
						</motion.div>
					</Giftcard>
					<Button
						as={motion.button}
						disabled={true}
						initial={{
							opacity: 0,
							rotate: "12deg",
						}}
						animate={{
							opacity: 1,
							rotate: "0deg",
						}}
						transition={{
							delay: 1,
						}}
						size="md"
						variant="outline"
						className="w-auto cursor-not-allowed"
					>
						<IconQrcodeFillDuo18 className="size-5" /> Read qrcode
					</Button>
				</div>

				<Layout.Footer>
					<motion.div className="text-xs text-muted-foreground text-center mb-1 text-balance">
						This is a secure process any transaction will take place in a safe enviroment.
					</motion.div>
					<Button
						disabled={!canUserProceed}
						size="lg"
						variant={canUserProceed ? "primary" : "outline"}
						onClick={handleOpenDrawer}
					>
						Proceed
					</Button>
				</Layout.Footer>
			</Layout>
			<TopupDrawer
				open={activeDrawer === "topup"}
				onOpenChange={open => setActiveDrawer(open ? "topup" : null)}
			/>
			{/* <ConfirmationDrawer
				open={activeDrawer === "confirmation"}
				onOpenChange={open => setActiveDrawer(open ? "confirmation" : null)}
			/> */}
		</>
	)
}

const ICON = {
	idle: null,
	pending: <Spinner />,
	success: <IconCircleCheck3FillDuo18 />,
	error: <IconTriangleWarningFillDuo18 />,
}

const LABEL = {
	idle: "Paste from clipboard",
	pending: "Validating data",
	success: "Valid data",
	error: "Error pix expired",
}
