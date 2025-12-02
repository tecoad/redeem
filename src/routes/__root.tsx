import { createRootRoute, Outlet } from "@tanstack/react-router";
import "@/globals.css";
import DeviceLayout from "@/components/DeviceLayout";

export const Route = createRootRoute({
	component: () => (
		<DeviceLayout>
			<Outlet />
		</DeviceLayout>
	),
});
