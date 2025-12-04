import { createRootRoute, Outlet } from "@tanstack/react-router"
import "@/globals.css"
import { AnimatePresence } from "motion/react"
import Viewport from "@/components/Viewport"

export const Route = createRootRoute({
	component: () => (
		<Viewport>
			<AnimatePresence mode="wait">
				<Outlet />
			</AnimatePresence>
		</Viewport>
	),
})
