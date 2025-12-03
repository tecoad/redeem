import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/Button"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	return (
		<div className="p-4 flex gap-4 w-full h-full items-start justify-between flex-col">
			<div className="w-full aspect-card rounded-2xl bg-blue-500 shadow-2xl"></div>
			<h1 className="text-2xl font-bold text-center">
				You just received a Wine R$50 digital giftcard.
			</h1>
			<div className="self-stretch flex items-center justify-center">
				<Button>Hold to activate it</Button>
			</div>
		</div>
	)
}
