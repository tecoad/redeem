import {
	animate,
	type HTMLMotionProps,
	motion,
	useMotionTemplate,
	useMotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./Buttons/Button"

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

	function startConfirm() {
		if (disabled) return
		console.log("Starting with duration:", duration)
		animate(clip, 0, {
			ease: "linear",
			duration,
			onComplete: () => {
				onSuccessConfirm?.()
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
					clipPath,
				}}
			>
				Confirming
			</Button>

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
