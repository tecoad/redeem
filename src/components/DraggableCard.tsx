import { motion, type PanInfo, useSpring } from "motion/react"
import React, { useMemo } from "react"
import { useUnscaledMeasure } from "@/lib/hooks/useScale"
import Giftcard from "./Giftcard"
import Heading from "./Heading"

// Deceleration is from iOS UIScrollView
function project(initialVelocity: number, decelerationRate = 0.998) {
	return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

export function DraggableCard({ onSnap }: { onSnap?: () => void }) {
	const [_snap, setSnap] = React.useState(false)
	const y = useSpring(0, { damping: 38, stiffness: 550 })

	// Measure card and target using useUnscaledMeasure (handles parent scale)
	const [cardRef, cardBounds] = useUnscaledMeasure()
	const [targetRef, targetBounds] = useUnscaledMeasure()

	// Calculate measurements dynamically from bounds
	const measurements = useMemo(() => {
		// Center the card within the target area
		const cardCenterY = cardBounds.top + cardBounds.height / 2
		const targetCenterY = targetBounds.top + targetBounds.height / 2
		const snappedY = targetCenterY - cardCenterY

		return {
			snappedY,
			// Snap threshold: higher = needs to be closer to target (0.65 = 65% of distance)
			snapDistance: snappedY * 0.65,
			// Minimum distance the card must travel before snap can trigger
			minDragDistance: snappedY * 0.25,
		}
	}, [cardBounds, targetBounds])

	function onPan(_: PointerEvent, { delta }: PanInfo) {
		y.jump(clamp(y.get() + delta.y, [0, measurements.snappedY]))
	}

	function onPanEnd(_: PointerEvent, { velocity }: PanInfo) {
		grab.end()

		const currentY = y.get()
		const projection = currentY + project(velocity.y)

		// Require minimum drag distance AND projected position past threshold
		const hasMinDistance = currentY >= measurements.minDragDistance
		const projectionPastThreshold = projection >= measurements.snapDistance

		if (hasMinDistance && projectionPastThreshold) {
			setSnap(true)
			y.set(measurements.snappedY)
			onSnap?.()
		} else {
			y.set(0)
			setSnap(false)
		}
	}

	return (
		<div className="flex items-center w-full flex-col h-full relative justify-between">
			<motion.div
				ref={cardRef}
				onPanStart={grab.start}
				onPan={onPan}
				onPanEnd={onPanEnd}
				style={{ y }}
				animate={{
					transition: {
						type: "spring",
						stiffness: 350,
						damping: 38,
					},
				}}
				className="w-full aspect-card rounded-[24px] cursor-grab active:cursor-grabbing touch-none z-2 outline-0"
				whileTap={{
					scale: 0.96,
				}}
			>
				<Giftcard />
			</motion.div>
			<Heading>
				<Heading.Title className="text-center">
					You just received a Wine R$50 digital giftcard.
				</Heading.Title>
			</Heading>
			{/* Drag area */}
			<div
				ref={targetRef}
				className="pointer-events-none relative border-2 bg-muted border-dotted flex items-center justify-center rounded-[31.5px]  aspect-card text-muted-foreground"
				style={{
					width: cardBounds.width + 15,
					height: cardBounds.height + 15,
				}}
			>
				{/* make a shimmer effect here */}
				drag the card to activate it
			</div>
		</div>
	)
}

function clamp(val: number, [min, max]: [number, number]): number {
	return Math.min(Math.max(val, min), max)
}

const grab = {
	start: () => document.body.classList.add("gesture-grabbing"),
	end: () => document.body.classList.remove("gesture-grabbing"),
}
