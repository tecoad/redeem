import { createRootRoute, Outlet } from "@tanstack/react-router"
import "@/globals.css"
import { AnimatePresence } from "motion/react"
import Viewport from "@/components/Viewport"
import { DrawerScaleProvider } from "@/lib/hooks/useDrawerScale"

export const Route = createRootRoute({
	component: () => (
		<DrawerScaleProvider>
			<Viewport>
				<AnimatePresence mode="wait">
					<Outlet />
				</AnimatePresence>
			</Viewport>
		</DrawerScaleProvider>
	),
})
