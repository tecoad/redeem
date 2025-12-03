import React, { useEffect, useRef, useState } from "react"
import { useBreakpoint } from "@/lib/hooks/useBreakpoint"
import { cn } from "@/lib/utils"

const BASE_WIDTH = 393
const BASE_HEIGHT = 852

function IphoneUI({ children }: { children: React.ReactNode }) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [scale, setScale] = useState(1)

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
			className={cn("flex py-[4dvh] px-[4dvw] w-full h-full items-center justify-center")}
		>
			<div
				style={{
					width: BASE_WIDTH,
					height: BASE_HEIGHT,
					transform: `scale(${scale})`,
				}}
				className="relative origin-center flex shrink-0 flex-col  rounded-[76px] overflow-hidden bg-white shadow-2xl"
			>
				<div className="absolute inset-0  pointer-events-none bg-no-repeat bg-center bg-cover bg-[url(/iphone.svg)] z-10" />

				<div className="w-full relative [--top-distance:7%] top-(--top-distance) h-[calc(100%-var(--top-distance)-11.5%)] ">
					{children}
				</div>
			</div>
		</div>
	)
}

function UiWrapper({ children }: { children: React.ReactNode }) {
	const { isBelowSm: isMobile } = useBreakpoint("sm")
	const Wrapper = isMobile ? React.Fragment : IphoneUI

	return (
		<div className="h-dvh w-dvw bg-gray-400">
			<Wrapper>{children}</Wrapper>
		</div>
	)
}
export default UiWrapper
