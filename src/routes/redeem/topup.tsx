import { createFileRoute, useRouter } from "@tanstack/react-router"
import { AnimateNumber } from "motion-plus/react"
import { IconCopyFillDuo18 } from "nucleo-ui-fill-duo-18"
import { useEffect, useState } from "react"
import { Button } from "@/components/Buttons/Button"
import { ConfirmButton } from "@/components/ConfirmButton"
import Giftcard from "@/components/Giftcard"
import Heading from "@/components/Heading"
import Layout from "@/components/Layout"
import ScrollFade from "@/components/ScrollFade"
import Stepper from "@/components/Stepper"

export const Route = createFileRoute("/redeem/topup")({
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
			<Giftcard className="pointer-events-auto">
				<Giftcard.ContentWrapper>
					<ScrollFade className="h-[100px]" shadowHeight={40}>
						<p className="break-all text-white p-2 select-all cursor-text">{pixCode}</p>
					</ScrollFade>
					<Button
						size="medium"
						className="aspect-square w-auto absolute top-0 right-0"
						onClick={handleCopy}
					>
						<IconCopyFillDuo18 className="size-4 text-white" />
					</Button>
					<Button size="small" className="w-auto self-center">
						View QR Code
					</Button>
				</Giftcard.ContentWrapper>
			</Giftcard>
			<Layout.Footer>
				<ConfirmButton onSuccessConfirm={() => router.navigate({ to: "/redeem/result" })}>
					Pay in &nbsp;
					<AnimateNumber>{minutes}</AnimateNumber>&nbsp;:&nbsp;
					{seconds < 10 ? "0" : ""}
					<AnimateNumber>{seconds}</AnimateNumber>
				</ConfirmButton>
			</Layout.Footer>
		</Layout>
	)
}
