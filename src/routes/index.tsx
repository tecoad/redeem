import { createFileRoute, useRouter } from "@tanstack/react-router"
import {
	animate,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useSpring,
	useTransform,
	useVelocity,
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import Giftcard from "@/components/Giftcard"
import Heading from "@/components/Heading"
import Layout from "@/components/Layout"
import WaterRippleEffect, { WaterRippleExclude } from "@/components/Shader"
import SVGBorder, { type BorderMode } from "@/components/SvgBorder"
import { TextEffect } from "@/components/TextEffect"
import { TextRoll } from "@/components/TextRoll"
import { TextShimmer } from "@/components/TextShimmer"
import { useUnscaledMeasure } from "@/lib/hooks/useScale"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/")({
	component: App,
})

function App() {
	// Measure card and target using useUnscaledMeasure (handles parent scale)
	const [layoutRef, layoutBounds] = useUnscaledMeasure()
	const [constrainsRef, constrainsBounds] = useUnscaledMeasure()
	const [cardRef, cardBounds] = useUnscaledMeasure()
	const [triggerKey, setTriggerKey] = useState(0)
	const router = useRouter()

	// Motion blur for card entry animation
	const entryY = useMotionValue(800)
	const entryVelocity = useVelocity(entryY)
	const blurFilterRef = useRef<SVGFEGaussianBlurElement>(null)

	// Update SVG filter blur based on velocity
	useMotionValueEvent(entryVelocity, "change", velocity => {
		if (blurFilterRef.current) {
			// Map velocity to blur amount (absolute value since we care about speed, not direction)
			const blurAmount = Math.min(Math.abs(velocity) / 100, 20)
			blurFilterRef.current.setAttribute("stdDeviation", `0,${blurAmount}`)
		}
	})

	// Trigger entry animation on mount
	useEffect(() => {
		const timeout = setTimeout(() => {
			animate(entryY, 0, {
				type: "tween",
				duration: 3,
				ease: [0.16, 1, 0.3, 1],
			})
		}, 1200) // delay to match original

		return () => clearTimeout(timeout)
	}, [entryY])

	// Motion value for Y position
	const y = useMotionValue(0)
	const maxY = constrainsBounds.height - cardBounds.height
	const snapThreshold = maxY - 100

	// Rotation based on drag velocity (spring-based)
	const yVelocity = useVelocity(y)
	const rotateRaw = useTransform(yVelocity, [-1000, 0, 1000], [-3, 0, 3])
	const rotate = useSpring(rotateRaw, { stiffness: 300, damping: 20 })

	// ClipPath transforms based on drag progress
	// First title: more visible at top (0%), clips from top as card goes down
	const clipPath1 = useTransform(y, [0, maxY || 1], ["inset(0% 0 0 0)", "inset(100% 0 0 0)"])
	// Second title: more visible at bottom, clips from bottom when at top
	const clipPath2 = useTransform(y, [0, maxY || 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"])

	const [borderMode, setBorderMode] = useState<BorderMode>("trail")

	useMotionValueEvent(y, "change", currentY => {
		const inSnapZone = currentY >= snapThreshold
		setBorderMode(inSnapZone ? "dash" : "trail")
	})

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
					setTriggerKey(1)
				}, 300)
			} else {
				setTriggerKey(0)
			}
		}, 200)
	}

	return (
		<div className="w-full h-full" ref={layoutRef}>
			{/* SVG Motion Blur Filter */}
			<svg width="0" height="0" className="absolute">
				<defs>
					<filter id="card-motion-blur" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur ref={blurFilterRef} in="SourceGraphic" stdDeviation="0,0" />
					</filter>
				</defs>
			</svg>
			<WaterRippleEffect
				width={layoutBounds.width}
				height={layoutBounds.height}
				triggerKey={triggerKey}
				center={{
					x: 0.5,
					y: 0.95,
				}}
				onComplete={() => {
					router.navigate({ to: "/redeem" })
				}}
				frequency={40}
				amplitude={0.08}
				speed={6}
				decay={3}
				shadowStrength={0.1}
			>
				<Layout>
					<div
						ref={constrainsRef}
						className="flex items-center w-full @container flex-col h-full relative justify-between"
					>
						<motion.div
							drag="y"
							ref={cardRef}
							style={{ y, rotate }}
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
							<motion.div
								className="pointer-events-none"
								style={{
									y: entryY,
									filter: "url(#card-motion-blur)",
								}}
								initial={{ rotate: "10deg", x: "-30px" }}
								animate={{ rotate: "0deg", x: "0px" }}
								transition={{
									type: "tween",
									duration: 3,
									ease: [0.16, 1, 0.3, 1],
									delay: 1.2,
								}}
							>
								<WaterRippleExclude>
									<Giftcard>
										<Giftcard.ContentWrapper>
											<div className="flex w-full justify-between">
												<Giftcard.MerchantLogo />
												<Giftcard.Logo />
											</div>
										</Giftcard.ContentWrapper>
									</Giftcard>
								</WaterRippleExclude>
							</motion.div>
						</motion.div>

						{/* Snap zone target area */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 20,
								delay: 2,
							}}
							style={{
								width: cardBounds.width + 14,
								height: cardBounds.height + 14,
								translateY: 7,
								opacity: !cardBounds.width ? 0 : 1,
							}}
							className="bottom-0 pointer-events-none absolute bg-muted/15 rounded-[31.5px] flex items-center justify-center p-6"
						>
							{cardBounds.width && (
								<SVGBorder
									mode={borderMode}
									borderRadius={29.5}
									className={cn(
										"text-muted-foreground/10 absolute inset-0 pointer-events-none",
										borderMode === "dash" && "text-primary"
									)}
									glow={0}
								/>
							)}

							<TextShimmer className="text-[24px] text-center text-pretty">
								drag to activate it
							</TextShimmer>
						</motion.div>

						<Heading className="relative   top-1/2 -translate-y-1/2 h-full flex flex-col items-center  justify-center select-none pointer-events-none w-full">
							<Heading.Title
								as={motion.div}
								style={{ clipPath: clipPath1 }}
								className="text-center  z-10 absolute inset-0  flex items-center"
							>
								<div className="inline w-full px-4">
									<TextEffect
										per="word"
										delay={0.7}
										// segmentWrapperClassName="overflow-hidden align-top"
										variants={{
											container: {
												hidden: {
													y: "20%",
												},
												visible: {
													y: "0%",
													transition: {
														staggerChildren: 0.02,
														stiffness: 200,
														damping: 10,
														delay: 0.3,
													},
												},
											},
											item: {
												hidden: {
													y: "100%",
													filter: "blur(4px)",
													opacity: 0,
												},
												visible: {
													y: "0%",
													filter: "blur(0px)",
													opacity: 1,
													transition: {
														type: "spring",
														stiffness: 100,
														damping: 8,
													},
												},
											},
										}}
									>
										You've been gifted a digital giftcard from Matt.
									</TextEffect>
								</div>
							</Heading.Title>
							<Heading.Title
								as={motion.div}
								className="text-center absolute inset-0  flex items-center"
								style={{ clipPath: clipPath2 }}
							>
								<div className="inline w-full">
									You are&nbsp;
									<TextRoll
										className="inline"
										activeClassName="text-primary"
										duration={0.5}
										trigger={borderMode === "dash"}
										oneWay
									>
										activating
									</TextRoll>
									&nbsp;a Wine R$50 digital giftcard.
								</div>
							</Heading.Title>
						</Heading>
					</div>
				</Layout>
			</WaterRippleEffect>
		</div>
	)
}
