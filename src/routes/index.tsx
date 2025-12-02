import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	return <div className="bg-[green] h-full w-full">list</div>
}
