import { createFileRoute, useRouter } from "@tanstack/react-router"
import { Button } from "@/components/Button"
import Drawer from "@/components/Drawer"
import Title from "@/components/Title"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	const route = useRouter()
	return (
		<div className="p-4 flex gap-4 w-full h-full items-start justify-between flex-col">
			<div className="w-full aspect-card rounded-2xl bg-blue-500 shadow-2xl"></div>
			<Title title="Title" subtitle="Subtitle" />
			<div className="self-stretch flex items-center justify-center flex-col gap-2">
				<Button size="small" onClick={() => route.navigate({ to: "/redeem" })}>
					Hold to activate it
				</Button>
				<Button size="medium" onClick={() => route.navigate({ to: "/redeem" })}>
					Hold to activate it
				</Button>
				<Button size="large" onClick={() => route.navigate({ to: "/redeem" })}>
					Hold to activate it
				</Button>

				<Drawer>lorem ipsum dolor sit amet</Drawer>
			</div>
		</div>
	)
}
