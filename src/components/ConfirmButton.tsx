import {
	animate,
	type HTMLMotionProps,
	motion,
	useMotionTemplate,
	useMotionValue,
} from "motion/react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./Buttons/Button"
import DotPulseLoading from "./DotPulseLoading"

const INITIAL = 100

export function ConfirmButton({
	className,
	onSuccessConfirm,
	duration = 1,
	disabled,
	...props
}: {
	className?: string
	onSuccessConfirm?: () => void
	duration?: number
} & ButtonProps &
	HTMLMotionProps<"button">) {
	const clip = useMotionValue(INITIAL)
	const [hasConfirmed, setHasConfirmed] = useState(false)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (hasConfirmed) {
			// Emulate server response
			const timeout = setTimeout(() => {
				onSuccessConfirm?.()
			}, 1500)
			return () => clearTimeout(timeout)
		}
	}, [hasConfirmed])

	function startConfirm() {
		if (disabled) return

		animate(clip, 0, {
			ease: "linear",
			duration,
			onComplete: () => {
				setHasConfirmed(true)
			},
		})
	}

	function stopConfirm() {
		animate(clip, INITIAL, {
			type: "spring",
			stiffness: 500,
			damping: 50,
		})
	}

	const clipPath = useMotionTemplate`inset(0px ${clip}% 0px 0px round 0px)`

	return (
		<div className="w-full relative">
			<Button
				aria-hidden
				as={motion.button}
				key="bar"
				variant="primary"
				className="absolute inset-0 z-10 pointer-events-none transition-none"
				size="lg"
				style={{
					clipPath: !hasConfirmed ? clipPath : undefined,
				}}
			>
				<motion.div
					initial="ready"
					animate={hasConfirmed ? "processing" : "ready"}
					className="grid overflow-hidden size-full"
				>
					<motion.div
						className="[grid-area:1/1] size-full flex items-center justify-center"
						variants={{
							ready: {
								translateY: "0%",
							},
							processing: {
								translateY: "-100%",
							},
						}}
					>
						To process
					</motion.div>
					<motion.div
						className="[grid-area:1/1] size-full flex items-center justify-center"
						variants={{
							ready: {
								translateY: "100%",
							},
							processing: {
								translateY: "0%",
							},
						}}
					>
						<DotPulseLoading className="bg-white" />
					</motion.div>
				</motion.div>
			</Button>

			{/* <DotPulseLoading className="bg-white" /> */}

			<Button
				as={motion.button}
				className={cn("", className)}
				onPointerDown={startConfirm}
				onPointerUp={stopConfirm}
				size="lg"
				disabled={disabled}
				onMouseLeave={() => {
					stopConfirm()
				}}
				onKeyDown={e => {
					if (e.key === "Enter") {
						startConfirm()
					}
				}}
				onKeyUp={e => {
					if (e.key === "Enter") {
						stopConfirm()
					}
				}}
				{...props}
			/>
		</div>
	)
}
