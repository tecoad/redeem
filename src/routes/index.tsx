import { createFileRoute, useRouter } from "@tanstack/react-router"
import { DraggableCard } from "@/components/DraggableCard"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	const router = useRouter()

	const handleSnap = () => {
		setTimeout(() => {
			router.navigate({ to: "/redeem" })
		}, 1000) // delay em ms
	}

	return (
		<Layout>
			<DraggableCard onSnap={handleSnap} />
		</Layout>
	)
}
