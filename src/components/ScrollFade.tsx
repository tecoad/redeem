import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollFadeProps {
	children: React.ReactNode
	shadowHeight?: number
	className?: string
	innerClassName?: string
}

const ScrollFade = ({
	children,
	shadowHeight = 70,
	className,
	innerClassName,
}: ScrollFadeProps) => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [canScrollTop, setCanScrollTop] = useState(false)
	const [canScrollBottom, setCanScrollBottom] = useState(false)

	const updateScrollState = useCallback(() => {
		if (!scrollRef.current) return

		const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
		setCanScrollTop(scrollTop > 0)
		setCanScrollBottom(scrollTop + clientHeight < scrollHeight)
	}, [])

	useEffect(() => {
		updateScrollState()
	}, [updateScrollState])

	const getMaskImage = () => {
		if (canScrollTop && canScrollBottom) {
			return `linear-gradient(to bottom, transparent, black ${shadowHeight}px, black calc(100% - ${shadowHeight}px), transparent)`
		}
		if (canScrollTop) {
			return `linear-gradient(to bottom, transparent, black ${shadowHeight}px)`
		}
		if (canScrollBottom) {
			return `linear-gradient(to top, transparent, black ${shadowHeight}px)`
		}
		return undefined
	}

	return (
		<div className={cn("relative w-full overflow-hidden", className)}>
			<div
				ref={scrollRef}
				onScroll={updateScrollState}
				style={{ maskImage: getMaskImage(), WebkitMaskImage: getMaskImage() }}
				className={cn("h-full overflow-y-auto no-scrollbar", innerClassName)}
			>
				{children}
			</div>
		</div>
	)
}

export default ScrollFade
