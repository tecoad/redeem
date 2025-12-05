import { createFileRoute } from "@tanstack/react-router"
import { animate, motion, useMotionValue, useTransform } from "motion/react"
import DefaultView from "@/components/Giftcard/DefaultView"
import Giftcard from "@/components/Giftcard/Giftcard"
import Heading from "@/components/Heading"
import Layout from "@/components/Layout"
import { TextShimmer } from "@/components/TextShimmer"
import { useUnscaledMeasure } from "@/lib/hooks/useScale"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	// Measure card and target using useUnscaledMeasure (handles parent scale)
	const [constrainsRef, constrainsBounds] = useUnscaledMeasure()
	const [cardRef, cardBounds] = useUnscaledMeasure()

	// Motion value for Y position
	const y = useMotionValue(0)
	const maxY = constrainsBounds.height - cardBounds.height
	const snapThreshold = maxY - 100

	// ClipPath transforms based on drag progress
	// First title: more visible at top (0%), clips from top as card goes down
	const clipPath1 = useTransform(y, [0, maxY || 1], ["inset(0% 0 0 0)", "inset(100% 0 0 0)"])
	// Second title: more visible at bottom, clips from bottom when at top
	const clipPath2 = useTransform(y, [0, maxY || 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"])

	// Border for snap zone - shows when drag position will trigger snap to bottom
	const snapZoneBorderWidth = useTransform(y, currentY => (currentY >= snapThreshold ? 2 : 0))

	// Snap logic on drag end
	const handleDragEnd = () => {
		const currentY = y.get()
		const snapToBottom = currentY >= snapThreshold

		setTimeout(() => {
			animate(y, snapToBottom ? maxY : 0, {
				type: "spring",
				stiffness: 400,
				damping: 30,
			})
			if (snapToBottom) {
				setTimeout(() => {
					// router.navigate({ to: "/redeem" })
				}, 1000)
			}
		}, 200)
	}

	return (
		<Layout>
			<div
				ref={constrainsRef}
				className="flex items-center w-full @container flex-col h-full relative justify-between"
			>
				<motion.div
					drag="y"
					ref={cardRef}
					style={{ y }}
					onDragEnd={handleDragEnd}
					dragTransition={{
						bounceStiffness: 600,
						bounceDamping: 10,
						power: 0.2,
					}}
					whileDrag={{
						scale: 0.95,
						boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
					}}
					dragElastic={0.1}
					dragConstraints={{ top: 0, bottom: maxY }}
					className="w-full z-10 top-0 absolute rounded-[24px]"
				>
					<Giftcard>
						<DefaultView />
					</Giftcard>
				</motion.div>

				{/* Snap zone target area */}
				<motion.div
					style={{
						borderWidth: snapZoneBorderWidth,
						width: cardBounds.width + 14,
						height: cardBounds.height + 14,
						translateY: 7,
						opacity: !cardBounds.width ? 0 : 1,
					}}
					className=" bottom-0 pointer-events-none absolute bg-muted rounded-[31.5px] flex items-center justify-center p-6"
				>
					<TextShimmer className="text-[24px] text-center text-pretty">
						drag card to activate it
					</TextShimmer>
				</motion.div>

				<Heading className="relative   top-1/2 -translate-y-1/2 h-full flex flex-col items-center  justify-center select-none pointer-events-none w-full">
					<Heading.Title
						as={motion.div}
						style={{ clipPath: clipPath1 }}
						className="text-center  z-10 absolute inset-0  flex items-center"
					>
						You just received a Wine R$50 digital giftcard.
					</Heading.Title>
					<Heading.Title
						as={motion.div}
						className="text-center absolute inset-0  flex items-center"
						style={{ clipPath: clipPath2 }}
					>
						You are redeeming a Wine R$50 digital giftcard.
					</Heading.Title>
				</Heading>
			</div>
		</Layout>
	)
}
