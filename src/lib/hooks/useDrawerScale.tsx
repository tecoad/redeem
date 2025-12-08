import { createContext, useContext, useState } from "react"

const DrawerScaleContext = createContext<{
	isDrawerOpen: boolean
	setDrawerOpen: (open: boolean) => void
}>({ isDrawerOpen: false, setDrawerOpen: () => {} })

export function DrawerScaleProvider({ children }: { children: React.ReactNode }) {
	const [isDrawerOpen, setDrawerOpen] = useState(false)
	return (
		<DrawerScaleContext.Provider value={{ isDrawerOpen, setDrawerOpen }}>
			{children}
		</DrawerScaleContext.Provider>
	)
}

export const useDrawerScale = () => useContext(DrawerScaleContext)


