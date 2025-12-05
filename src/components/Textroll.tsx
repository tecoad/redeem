import {
	motion,
	type Target,
	type TargetAndTransition,
	type Transition,
	type VariantLabels,
} from "motion/react"
import { useEffect, useRef } from "react"

export type TextRollProps = {
	children: string
	trigger?: boolean
	oneWay?: boolean
	duration?: number
	getEnterDelay?: (index: number) => number
	getExitDelay?: (index: number) => number
	className?: string
	transition?: Transition
	variants?: {
		enter: {
			initial: Target | VariantLabels | boolean
			animate: TargetAndTransition | VariantLabels
		}
		exit: {
			initial: Target | VariantLabels | boolean
			animate: TargetAndTransition | VariantLabels
		}
	}
	onAnimationComplete?: () => void
}

export function TextRoll({
	children,
	trigger = false,
	oneWay = false,
	duration = 0.5,
	getEnterDelay = i => i * 0.1,
	getExitDelay = i => i * 0.1 + 0.2,
	className,
	transition = { ease: "easeIn" },
	variants,
	onAnimationComplete,
}: TextRollProps) {
	const prevTrigger = useRef(trigger)

	// Reset instantâneo quando oneWay está ativo e trigger vai de true → false
	const isInstantReset = oneWay && prevTrigger.current && !trigger

	useEffect(() => {
		prevTrigger.current = trigger
	}, [trigger])

	const effectiveDuration = isInstantReset ? 0 : duration

	const defaultVariants = {
		enter: {
			initial: { rotateX: 0 },
			animate: { rotateX: 90 },
		},
		exit: {
			initial: { rotateX: 90 },
			animate: { rotateX: 0 },
		},
	} as const

	const letters = children.split("")

	return (
		<span className={className}>
			{letters.map((letter, i) => {
				return (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={i}
						className="relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]"
						aria-hidden="true"
					>
						<motion.span
							className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
							initial={variants?.enter?.initial ?? defaultVariants.enter.initial}
							animate={
								trigger
									? (variants?.enter?.animate ?? defaultVariants.enter.animate)
									: (variants?.enter?.initial ?? defaultVariants.enter.initial)
							}
							transition={{
								...transition,
								duration: effectiveDuration,
								delay: isInstantReset ? 0 : getEnterDelay(i),
							}}
						>
							{letter === " " ? "\u00A0" : letter}
						</motion.span>
						<motion.span
							className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
							initial={variants?.exit?.initial ?? defaultVariants.exit.initial}
							animate={
								trigger
									? (variants?.exit?.animate ?? defaultVariants.exit.animate)
									: (variants?.exit?.initial ?? defaultVariants.exit.initial)
							}
							transition={{
								...transition,
								duration: effectiveDuration,
								delay: isInstantReset ? 0 : getExitDelay(i),
							}}
							onAnimationComplete={letters.length === i + 1 ? onAnimationComplete : undefined}
						>
							{letter === " " ? "\u00A0" : letter}
						</motion.span>
						<span className="invisible">{letter === " " ? "\u00A0" : letter}</span>
					</span>
				)
			})}
			<span className="sr-only">{children}</span>
		</span>
	)
}
