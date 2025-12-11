import type { MotionProps } from "motion/react"

export const titleMotionConfig: Pick<MotionProps, "initial" | "animate" | "transition"> = {
	initial: {
		translateY: "-30px",
		filter: "blur(3px)",
		opacity: 0,
		rotate: "-8deg",
	},
	animate: {
		translateY: "0px",
		filter: "blur(0px)",
		opacity: 1,
		rotate: "0deg",
	},
	transition: {
		delay: 0.3,
	},
}

export const subtitleMotionConfig: Pick<MotionProps, "initial" | "animate" | "transition"> = {
	initial: {
		translateY: "-30px",
		filter: "blur(3px)",
		opacity: 0,
		rotate: "8deg",
	},
	animate: {
		translateY: "0px",
		filter: "blur(0px)",
		opacity: 1,
		rotate: "0deg",
	},
	transition: {
		delay: 0.4,
	},
}
