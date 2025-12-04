import { createFileRoute, useRouter } from "@tanstack/react-router"
import { ConfirmButton } from "@/components/ConfirmButton"
import Heading from "@/components/Heading"
import Layout from "@/components/Layout"
import Stepper from "@/components/Stepper"

export const Route = createFileRoute("/redeem/topup")({
	component: RouteComponent,
})

function RouteComponent() {
	const router = useRouter()

	return (
		<Layout>
			<Stepper>
				<Stepper.Step>
					<span>Step 1</span>
				</Stepper.Step>
				<Stepper.Step>
					<span>Step 2</span>
				</Stepper.Step>
			</Stepper>
			<Heading>
				<Heading.Title>Pending payment R$20,00</Heading.Title>
				<Heading.Subtitle>Proceed in the topup to continue the redeeming process</Heading.Subtitle>
			</Heading>
			<Layout.Footer>
				<ConfirmButton onSuccessConfirm={() => router.navigate({ to: "/redeem/result" })}>
					Hold to redeem
				</ConfirmButton>
			</Layout.Footer>
		</Layout>
	)
}
