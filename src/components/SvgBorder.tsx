import { motion, useSpring, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export type BorderMode = "dash" | "trail"

interface SvgBorderProps {
	mode?: BorderMode
	className?: string
	glow?: number
	borderRadius?: number
	strokeWidth?: number
}

export default function SvgBorder({
	mode = "trail",
	className,
	strokeWidth = 2,
	glow = 3,
	borderRadius = 0,
}: SvgBorderProps) {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
	const containerRef = useRef<HTMLDivElement>(null)
	const blurRef = useRef<SVGFEGaussianBlurElement>(null)

	const isTrail = mode === "trail"

	// Spring value that goes from 0 (dash) to 1 (trail)
	const trailProgress = useSpring(isTrail ? 1 : 0, {
		stiffness: 100,
		damping: 18,
		mass: 0.8,
	})

	// Opacities for crossfade between the two rects
	const trailOpacity = useTransform(trailProgress, [0, 1], [0, 1])
	const dashOpacity = useTransform(trailProgress, [0, 1], [1, 0])

	// Transforms for the gradient stops opacities
	const stop1Opacity = useTransform(trailProgress, [0, 1], [1, 0])
	const stop2Opacity = useTransform(trailProgress, [0, 1], [1, 0.5])
	const stop3Opacity = useTransform(trailProgress, [0, 1], [1, 1])
	const stop4Opacity = useTransform(trailProgress, [0, 1], [1, 0.5])
	const stop5Opacity = useTransform(trailProgress, [0, 1], [1, 0])

	// Transform for the glow blur
	const glowBlur = useTransform(trailProgress, [0, 1], [0, glow])

	// Manually updates the blur stdDeviation
	useEffect(() => {
		const unsubscribe = glowBlur.on("change", value => {
			if (blurRef.current) {
				blurRef.current.setAttribute("stdDeviation", String(value))
			}
		})
		return unsubscribe
	}, [glowBlur])

	// Observes container size changes
	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect
				setDimensions({ width, height })
			}
		})

		resizeObserver.observe(container)
		return () => resizeObserver.disconnect()
	}, [])

	const { width, height } = dimensions

	const rectWidth = width - strokeWidth
	const rectHeight = height - strokeWidth
	const perimeter = 2 * (rectWidth + rectHeight) - 8 * borderRadius + 2 * Math.PI * borderRadius

	// Updates the spring when mode changes
	useEffect(() => {
		trailProgress.set(isTrail ? 1 : 0)
	}, [isTrail, trailProgress])

	return (
		<div ref={containerRef} className={cn("relative w-full h-full", className)}>
			{width > 0 && height > 0 && (
				<svg
					viewBox={`0 0 ${width} ${height}`}
					xmlns="http://www.w3.org/2000/svg"
					className="absolute inset-0 w-full h-full overflow-visible"
				>
					<defs>
						{/* Gradient with animated stops */}
						<linearGradient
							id="trailGradient"
							gradientUnits="userSpaceOnUse"
							x1="0"
							y1="0"
							x2={width}
							y2={height}
						>
							<motion.stop
								offset="0%"
								stopColor="currentColor"
								style={{ stopOpacity: stop1Opacity }}
							/>
							<motion.stop
								offset="30%"
								stopColor="currentColor"
								style={{ stopOpacity: stop2Opacity }}
							/>
							<motion.stop
								offset="50%"
								stopColor="currentColor"
								style={{ stopOpacity: stop3Opacity }}
							/>
							<motion.stop
								offset="70%"
								stopColor="currentColor"
								style={{ stopOpacity: stop4Opacity }}
							/>
							<motion.stop
								offset="100%"
								stopColor="currentColor"
								style={{ stopOpacity: stop5Opacity }}
							/>

							<animateTransform
								attributeName="gradientTransform"
								type="rotate"
								from={`0 ${width / 2} ${height / 2}`}
								to={`360 ${width / 2} ${height / 2}`}
								dur="2s"
								repeatCount="indefinite"
							/>
						</linearGradient>

						{/* Filter for glow with animated blur */}
						<filter
							id="glow"
							filterUnits="userSpaceOnUse"
							x="-50%"
							y="-50%"
							width="200%"
							height="200%"
						>
							<feGaussianBlur
								ref={blurRef}
								in="SourceGraphic"
								result="coloredBlur"
								stdDeviation={isTrail ? glow : 0}
							/>
							<feMerge>
								<feMergeNode in="coloredBlur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					{/* Dash rect - always animating with dashed pattern */}
					<motion.rect
						x={strokeWidth / 2}
						y={strokeWidth / 2}
						width={rectWidth}
						height={rectHeight}
						rx={borderRadius}
						fill="none"
						stroke="currentColor"
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						vectorEffect="non-scaling-stroke"
						style={{ opacity: dashOpacity }}
						strokeDasharray="0.1 10"
						animate={{
							strokeDashoffset: [0, -300],
						}}
						transition={{
							strokeDashoffset: {
								duration: 8,
								ease: "linear",
								repeat: Number.POSITIVE_INFINITY,
							},
						}}
					/>

					{/* Trail rect - always animating with solid line */}
					<motion.rect
						x={strokeWidth / 2}
						y={strokeWidth / 2}
						width={rectWidth}
						height={rectHeight}
						rx={borderRadius}
						fill="none"
						stroke="url(#trailGradient)"
						strokeWidth={strokeWidth}
						filter="url(#glow)"
						style={{ opacity: trailOpacity }}
						strokeDasharray={`${perimeter} 0`}
						animate={{
							strokeDashoffset: [0, -perimeter],
						}}
						transition={{
							strokeDashoffset: {
								duration: 2.5,
								ease: "linear",
								repeat: Number.POSITIVE_INFINITY,
							},
						}}
					/>
				</svg>
			)}
		</div>
	)
}
