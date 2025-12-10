import { createFileRoute, Outlet } from "@tanstack/react-router"
import { AnimatePresence } from "motion/react"
import Viewport from "@/components/Viewport"
import { DrawerScaleProvider } from "@/lib/hooks/useDrawerScale"

export const Route = createFileRoute("/_app")({
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
