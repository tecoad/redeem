import { createFileRoute, useRouter } from "@tanstack/react-router"
import { AnimateNumber } from "motion-plus/react"
import {
	IconCheckOutline18,
	IconClockTimeOutline18,
	IconDuplicate2Outline18,
} from "nucleo-ui-outline-18"
import { useEffect, useState } from "react"
import { Button } from "@/components/Buttons/Button"
import { SlideYButton } from "@/components/Buttons/SlideYButton"
import { ConfirmButton } from "@/components/ConfirmButton"
import Giftcard from "@/components/Giftcard"
import Heading from "@/components/Heading"
import Layout from "@/components/Layout"
import ScrollFade from "@/components/ScrollFade"
import { Skeleton } from "@/components/Skeleton"
import Stepper from "@/components/Stepper"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/_app/redeem/topup")({
	component: RouteComponent,
})

function RouteComponent() {
	const router = useRouter()
	const [timeRemaining, setTimeRemaining] = useState(15 * 60)
	const [hasConfirmedPayment, setHasConfirmedPayment] = useState(false)
	const [copied, setCopied] = useState(false)

	const pixCode =
		"00020101021226780014br.gov.bcb.pix2556pix.ebanx.com/qr/v2/7F646B96B450AA8A4D79A84A3FD34EC20EE55204000053039865802BR5905EBANX6008CURITIBA62070503***63040C96"

	useEffect(() => {
		if (!hasConfirmedPayment) {
			const timer = setTimeout(() => {
				setHasConfirmedPayment(true)
			}, 5000)
			return () => clearTimeout(timer)
		}
	}, [hasConfirmedPayment])

	useEffect(() => {
		if (timeRemaining <= 0) return

		const interval = setInterval(() => {
			setTimeRemaining(prev => {
				if (prev <= 1) {
					clearInterval(interval)
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [timeRemaining])

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(pixCode)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Failed to copy:", err)
		}
	}

	const minutes = Math.floor(timeRemaining / 60)
	const seconds = timeRemaining % 60

	return (
		<Layout>
			<Stepper>
				<Stepper.Step to="/redeem/initiate">Step 1</Stepper.Step>
				<Stepper.Step to="/redeem/topup">Step 2</Stepper.Step>
				<Stepper.Step to="/redeem/result" disabled>
					Step 3
				</Stepper.Step>
			</Stepper>
			<Heading>
				<Heading.Title>Pending payment R$20,00</Heading.Title>
				<Heading.Subtitle>Proceed in the topup to continue the redeeming process</Heading.Subtitle>
			</Heading>
			<Giftcard
				className={cn(
					"shadow-inner pointer-events-auto bg-muted flex gap-3 flex-col transition-colors duration-150 ease-in-out",
					copied && "bg-success/10"
				)}
			>
				{copied && <Skeleton executeOnce className="size-full absolute inset-0 [--color:white]" />}
				<ScrollFade className="h-[calc(100%-40px)] p-6 pr-18" shadowHeight={40}>
					<p className="break-all text-muted-foreground font-medium select-all cursor-text">
						{pixCode}
					</p>
				</ScrollFade>
				<SlideYButton
					size="sm"
					variant={copied ? "primary" : "muted"}
					state={copied ? "success" : "idle"}
					icon={
						copied ? (
							<IconCheckOutline18 className="size-5" />
						) : (
							<IconDuplicate2Outline18 className="size-5" />
						)
					}
					className="w-auto absolute top-6 right-4 aspect-square"
					onClick={handleCopy}
				/>
				<Button
					size="sm"
					variant="outline"
					className="w-auto self-center absolute bottom-6 left-1/2 -translate-x-1/2"
				>
					View QR Code
				</Button>
			</Giftcard>
			<Layout.Footer>
				<ConfirmButton
					duration={3}
					disabled={!hasConfirmedPayment}
					variant={hasConfirmedPayment ? "muted" : "outline"}
					onSuccessConfirm={() => router.navigate({ to: "/redeem/result" })}
				>
					{hasConfirmedPayment ? (
						"Hold to redeem"
					) : (
						<>
							<IconClockTimeOutline18 className="size-5" />
							<span>
								Pay in &nbsp;
								<AnimateNumber>{minutes}</AnimateNumber>&nbsp;:&nbsp;
								{seconds < 10 ? "0" : ""}
								<AnimateNumber>{seconds}</AnimateNumber>
							</span>
						</>
					)}
				</ConfirmButton>
			</Layout.Footer>
		</Layout>
	)
}
