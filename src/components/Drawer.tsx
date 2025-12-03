import { type PropsWithChildren, useEffect, useState } from "react"
import { Drawer as VaulDrawer } from "vaul"

export default function Drawer({ children }: PropsWithChildren) {
	const [container, setContainer] = useState<HTMLElement | null>(null)

	useEffect(() => {
		const element = document.getElementById("safe_area")
		setContainer(element)
	}, [])

	if (!container) return null

	return (
		<VaulDrawer.Root container={container}>
			<VaulDrawer.Trigger>Open Drawer</VaulDrawer.Trigger>
			<VaulDrawer.Overlay className="absolute inset-0 bg-black/40" />
			<VaulDrawer.Content className="bg-white flex flex-col  absolute bottom-0 left-0 right-0 max-h-[82vh] rounded-t-[10px]">
				<div className="max-w-md w-full mx-auto overflow-auto p-4 rounded-t-[10px]">
					<VaulDrawer.Handle />
					<VaulDrawer.Title className="font-medium text-gray-900 mt-8">
						New Project
					</VaulDrawer.Title>
					<VaulDrawer.Description className="leading-6 mt-2 text-gray-600">
						Get started by filling in the information below to create your new project.
					</VaulDrawer.Description>
					{children}
				</div>
			</VaulDrawer.Content>
		</VaulDrawer.Root>
	)
}
