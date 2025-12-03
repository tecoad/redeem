import { createRootRoute, Outlet } from "@tanstack/react-router"
import "@/globals.css"
import UiWrapper from "@/components/UiWrapper"

export const Route = createRootRoute({
	component: () => (
		<UiWrapper>
			<Outlet />
		</UiWrapper>
	),
})
