import { useRouter } from "@tanstack/react-router"
import type React from "react"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { useBreakpoint } from "@/lib/hooks/useBreakpoint"
import { ScaleProvider } from "@/lib/hooks/useScale"
import { cn } from "@/lib/utils"

const BASE_WIDTH = 393
const BASE_HEIGHT = 852

// Context for portal container - allows children to portal inside the scaled viewport
const PortalContainerContext = createContext<HTMLElement | null>(null)

export function usePortalContainer() {
	return useContext(PortalContainerContext)
}

function DesktopWrapper({ children }: { children: React.ReactNode }) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)
	const [scale, setScale] = useState<number | null>(null)
	const router = useRouter()

	// Ref callback to set portal container immediately when element is created
	const portalRefCallback = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			setPortalContainer(node)
		}
	}, [])

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const calculateScale = () => {
			const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
			const computedStyle = window.getComputedStyle(container)
			const paddingLeft = Number.parseFloat(computedStyle.paddingLeft)
			const paddingRight = Number.parseFloat(computedStyle.paddingRight)
			const paddingTop = Number.parseFloat(computedStyle.paddingTop)
			const paddingBottom = Number.parseFloat(computedStyle.paddingBottom)
			const availableWidth = containerWidth - paddingLeft - paddingRight
			const availableHeight = containerHeight - paddingTop - paddingBottom
			const scaleX = availableWidth / BASE_WIDTH
			const scaleY = availableHeight / BASE_HEIGHT
			setScale(Math.min(scaleX, scaleY))
		}

		calculateScale()

		const observer = new ResizeObserver(calculateScale)
		observer.observe(container)

		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={containerRef}
			className={cn("flex  py-[4dvh] px-[4dvw] w-full h-full items-center justify-center")}
		>
			{scale !== null && (
				<div
					style={{
						width: BASE_WIDTH,
						height: BASE_HEIGHT,
						transform: `scale(${scale})`,
					}}
					data-vaul-drawer-wrapper
					className={cn(
						"relative origin-center flex shrink-0 flex-col   rounded-[76px] overflow-hidden bg-white shadow-2xl cursor-[url('/cursor.svg'),pointer]"
					)}
				>
					{/* Back button */}
					<button
						type="button"
						onClick={() => router.history.back()}
						className="absolute  left-[36px] bottom-[42px] size-[46px] rounded-full z-15"
					/>

					{/* Shadow for the viewport */}
					{/* <div className="absolute bottom-0 w-full h-[100px] bg-linear-to-b  pointer-events-none  from-transparent to-white/90 to-50% z-1" /> */}

					<div className="absolute inset-0  pointer-events-none bg-no-repeat bg-center bg-cover bg-[url(/iphone.svg)] z-10" />

					<ScaleProvider scale={scale}>
						<PortalContainerContext.Provider value={portalContainer}>
							{/* Test overflow here */}
							<div
								className="w-full relative [--top-distance:7%] top-(--top-distance) h-[calc(100%-var(--top-distance)-11.5%)]"
								data-vaul-drawer-wrapper
								id="safe_area"
							>
								{children}
								{/* Portal container inside safe_area for same coordinate system */}
								<div
									ref={portalRefCallback}
									id="portal_container"
									className="absolute inset-0 pointer-events-none z-9999"
								/>
							</div>
						</PortalContainerContext.Provider>
					</ScaleProvider>
				</div>
			)}
		</div>
	)
}

function MobileWrapper({ children }: { children: React.ReactNode }) {
	const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

	const portalRefCallback = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			setPortalContainer(node)
		}
	}, [])

	return (
		<PortalContainerContext.Provider value={portalContainer}>
			<div id="safe_area" className="w-full h-full relative">
				{children}
				<div
					ref={portalRefCallback}
					id="portal_container"
					className="absolute inset-0 pointer-events-none z-9999"
				/>
			</div>
		</PortalContainerContext.Provider>
	)
}

function Viewport({ children }: { children: React.ReactNode }) {
	const { isBelowSm: isMobile } = useBreakpoint("sm")
	const Wrapper = isMobile ? MobileWrapper : DesktopWrapper

	return (
		<div className="h-dvh w-dvw bg-gray-400">
			<Wrapper>{children}</Wrapper>
		</div>
	)
}
export default Viewport
