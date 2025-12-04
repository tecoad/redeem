import { createFileRoute, useRouter } from "@tanstack/react-router"
import { ConfirmButton } from "@/components/ConfirmButton"
import Giftcard from "@/components/Giftcard"
import Layout from "@/components/Layout"
import Title from "@/components/Title"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	const router = useRouter()
	return (
		<Layout>
			<Giftcard />
			<Title title="You just received a Wine R$50 digital giftcard." />
			<Layout.Footer>
				<ConfirmButton duration={3} onSuccessConfirm={() => router.navigate({ to: "/redeem" })}>
					Hold to redeem
				</ConfirmButton>
			</Layout.Footer>
		</Layout>
	)
}
