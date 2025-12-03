import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/Button"
import RedeemDrawer from "@/components/RedeemDrawer"
import Title from "@/components/Title"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	const [isRedeemDrawerOpen, setIsRedeemDrawerOpen] = useState(false)

	return (
		<div className="p-4 flex gap-4 w-full h-full items-start justify-between flex-col">
			<div className="w-full aspect-card rounded-2xl bg-blue-500 shadow-2xl"></div>
			<Title title="Title" subtitle="Subtitle" />
			<div className="self-stretch flex items-center justify-center flex-col gap-2">
				<Button size="large" onClick={() => setIsRedeemDrawerOpen(true)}>
					Open drawer
				</Button>

				<RedeemDrawer open={isRedeemDrawerOpen} onOpenChange={setIsRedeemDrawerOpen} />
			</div>
		</div>
	)
}
