import { createFileRoute, useRouter } from "@tanstack/react-router"
import { ConfirmButton } from "@/components/ConfirmButton"
import Giftcard from "@/components/Giftcard"
import Heading from "@/components/Heading"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	const router = useRouter()
	return (
		<Layout>
			<Giftcard />
			<Heading>
				<Heading.Title>You just received a Wine R$50 digital giftcard.</Heading.Title>
			</Heading>
			<Layout.Footer>
				<ConfirmButton duration={0.2} onSuccessConfirm={() => router.navigate({ to: "/redeem" })}>
					Hold to redeem
				</ConfirmButton>
			</Layout.Footer>
		</Layout>
	)
}
