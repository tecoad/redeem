import { createRootRoute, Outlet } from "@tanstack/react-router"
import "@/globals.css"
import Viewport from "@/components/Viewport"

export const Route = createRootRoute({
	component: () => (
		<Viewport>
			<Outlet />
		</Viewport>
	),
})
