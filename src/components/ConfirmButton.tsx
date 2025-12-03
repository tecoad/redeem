import { animate, motion, useMotionTemplate, useMotionValue } from "motion/react"
import { Button } from "./Button"

const INITIAL = 100

export function ConfirmButton({ children = "Hold to confirm" }) {
	const clip = useMotionValue(INITIAL)

	function startConfirm() {
		animate(clip, 0, {
			ease: "linear",
			duration: 1,
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
		<Button
			variant="filled"
			className="overflow-hidden whitespace-nowrap relative  hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 bg-success hover:bg-muted-foreground"
			onPointerDown={startConfirm}
			onPointerUp={stopConfirm}
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
		>
			<span className="flex items-center justify-center gap-2 relative w-full user-select-none">
				{/* <IconTrash className="translate-y-[-1px]" /> */}
				<span>{children}</span>
			</span>

			<motion.div
				key="bar"
				aria-hidden
				className="flex items-center justify-center absolute left-0 top-0 pointer-events-none w-full h-full rounded-full bg-success text-white"
				style={{ clipPath }}
			>
				<span className="flex items-center gap-2 relative z-2 -nowrap text-white">
					{/* <IconTrash className="translate-y-[-1px]" /> */}
					<span>{children}</span>
				</span>
			</motion.div>
		</Button>
	)
}
