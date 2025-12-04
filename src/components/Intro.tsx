import { animate, motion, stagger, useAnimate, useScroll } from "motion/react"
import { splitText } from "motion-plus"
import {
	forwardRef,
	type ReactNode,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react"
import { cn } from "@/lib/utils"
import { Icon } from "../Icons"
import { useLayout } from "../LayoutProviders"
import { Section } from "../Section"

// Ref interface to allow external control of the Line animation
interface LineRef {
	startAnimation: () => void
	reset: () => void
}

export const Intro = ({ onComplete }: { onComplete?: () => void }) => {
	const dotRef = useRef<HTMLDivElement>(null)
	const lineRefs = useRef<(LineRef | null)[]>([])
	const maskAreaRef = useRef<HTMLDivElement>(null)
	const [isCalculated, setIsCalculated] = useState(false)
	const [hasTextAnimated, setHasTextAnimated] = useState(false)
	const [hasScrolledDown, setHasScrolledDown] = useState(false)
	const [containerRef, animate] = useAnimate()
	const { setMask, containerRef: layoutContainerRef, activeSection } = useLayout()

	const { scrollYProgress } = useScroll({
		container: layoutContainerRef,
	})

	scrollYProgress.on("change", () => {
		setHasScrolledDown(true)
	})

	const setLineRef = useCallback(
		(index: number) => (el: LineRef | null) => {
			lineRefs.current[index] = el
		},
		[]
	)

	const calculateOptimalFontSize = useCallback(() => {
		if (!containerRef.current) return

		const lines = containerRef.current.querySelectorAll("[data-intro-line]")

		const { right: containerRectRight } = containerRef.current.getBoundingClientRect()

		let fontSizeCqw = Number.parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue("--headline-font-size")
		)

		if (!fontSizeCqw) return

		// Find the furthest right element
		const furthestRightElement = [...lines].reduce((furthest, line) => {
			const lineRect = line.getBoundingClientRect()
			const furthestRect = furthest.getBoundingClientRect()
			return lineRect.right > furthestRect.right ? line : furthest
		})

		let { right: furthestRight } = furthestRightElement.getBoundingClientRect()

		// Set the optimal font size in cqw
		do {
			if (furthestRight > containerRectRight) {
				fontSizeCqw = Math.round((fontSizeCqw - 0.1) * 100) / 100
				document.documentElement.style.setProperty("--headline-font-size", `${fontSizeCqw}cqw`)
			} else {
				fontSizeCqw = Math.round((fontSizeCqw + 0.1) * 100) / 100
				document.documentElement.style.setProperty("--headline-font-size", `${fontSizeCqw}cqw`)
			}
			furthestRight = furthestRightElement.getBoundingClientRect().right
		} while (Math.abs(containerRectRight - furthestRight) > 10) // Run the loop until the difference is lower than 10px

		// console.log('>>>>>> final fontSizeCqw', fontSizeCqw)
		return setIsCalculated(true)
	}, [containerRef.current])

	const handleAnimateIntro = useCallback(async () => {
		// Animate the dot
		if (dotRef.current) {
			await animate(
				dotRef.current,
				{ scale: [0.6, 1, 0.6, 1], opacity: [0, 1, 0.8, 1] },
				{ type: "tween", duration: 0.4, ease: "easeInOut" }
			)
		}

		// Trigger line animations sequentially with stagger
		lineRefs.current.forEach((lineRef, index) => {
			setTimeout(() => {
				lineRef?.startAnimation()
			}, index * 150) // 100ms stagger between lines
		})

		await new Promise(resolve => setTimeout(resolve, 600))

		onComplete?.()
	}, [animate, onComplete])

	useEffect(() => {
		document.fonts.ready.then(async () => {
			await calculateOptimalFontSize()
			await handleAnimateIntro()

			setHasTextAnimated(true)
		})
	}, [handleAnimateIntrocalculateOptimalFontSize])

	useEffect(() => {
		if (activeSection === "intro" && hasTextAnimated) {
			setMask(maskAreaRef)
		}
	}, [activeSection, hasTextAnimated, setMask])

	return (
		<Section
			id="intro"
			className="flex h-dvh items-center"
			onSnap={() => {
				if (!hasTextAnimated) return
				setMask(maskAreaRef)
			}}
		>
			<div ref={maskAreaRef} className={cn("relative flex aspect-golden w-full px-[var(--px)]")}>
				<div
					ref={containerRef}
					className="@container flex w-full select-none flex-col items-start justify-center "
				>
					<div className="inline-flex items-baseline gap-2 pl-[5cqw] text-[calc(var(--headline-font-size))] ">
						<motion.div
							ref={dotRef}
							initial={{
								opacity: 0,
							}}
							className="size-[1ex] self-baseline rounded-full bg-primary"
						/>
						<Line ref={setLineRef(0)}>i'm matt, I craft</Line>
					</div>

					<Line ref={setLineRef(1)}>products where design</Line>
					<Line ref={setLineRef(2)} className=" pl-[5cqw]">
						& engineering meet
					</Line>
				</div>

				{/* Scroll down icon */}
				<div
					className={cn(
						"absolute bottom-0 left-0 flex w-full justify-center p-2 opacity-0 transition-opacity duration-500",
						hasTextAnimated && !hasScrolledDown && "opacity-100"
					)}
				>
					<Icon.ScrollDown variant="default" className="size-9" strokeWidth={1} />
				</div>
			</div>
		</Section>
	)
}

const Line = forwardRef<LineRef, { children: ReactNode; className?: string }>(
	({ children, className }, ref) => {
		const elementRef = useRef<HTMLDivElement>(null)
		const [isAnimating, setIsAnimating] = useState(false)

		const startAnimation = useCallback(() => {
			setIsAnimating(true)
		}, [])

		const resetAnimation = useCallback(() => {
			setIsAnimating(false)
		}, [])

		// Expose the startAnimation and reset functions via ref
		useImperativeHandle(ref, () => ({
			startAnimation,
			reset: resetAnimation,
		}))

		const handleAnimate = useCallback(async () => {
			if (!elementRef.current) return

			const { words, chars } = splitText(elementRef.current)

			elementRef?.current?.classList.remove("opacity-0")
			// After animation completes, apply AlphaLyrae contextual alternates
			// await applyAlphaLyraePixelation(chars)

			// Animate the words
			animate(
				words,
				{ y: ["100%", 0], opacity: [0, 1], scale: [0.9, 1] },
				{ delay: stagger(0.1), type: "spring", stiffness: 190, damping: 22 }
			)
		}, [])

		// Trigger animation when isAnimating becomes true
		useEffect(() => {
			if (isAnimating) {
				handleAnimate()
			}
		}, [isAnimating, handleAnimate])

		return (
			<span
				data-intro-line
				ref={elementRef}
				className={cn(" whitespace-nowrap text-headline opacity-0", className)}
			>
				{children}
			</span>
		)
	}
)
