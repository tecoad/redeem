import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./Button"

export function SlideYButton({
	icon,
	state,
	className,
	children,
	...props
}: {
	icon?: React.ReactNode
} & HTMLMotionProps<"button"> &
	ButtonProps) {
	return (
		<Button
			layout="position"
			as={motion.button}
			className={cn("overflow-hidden origin-[center_30%]", className)}
			transition={{
				type: "spring",
				bounce: 0.3,
				duration: 0.6,
			}}
			{...props}
		>
			<AnimatePresence mode="popLayout" initial={false}>
				{icon && (
					<motion.span
						key={state}
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{
							type: "spring",
							bounce: 0.2,
							duration: 0.4,
						}}
						className="block size-6 shrink-0"
					>
						{icon}
					</motion.span>
				)}
			</AnimatePresence>
			<AnimatePresence mode="popLayout" initial={false}>
				<motion.span
					key={state}
					initial={{ y: (state === "pending" ? -1 : 1) * 48, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{
						y: (state === "pending" ? -1 : 1) * 48,
						opacity: 0,
					}}
					transition={{
						type: "spring",
						bounce: 0.3,
						duration: 0.6,
					}}
					className="line-clamp-1"
				>
					{children}
				</motion.span>
			</AnimatePresence>
		</Button>
	)
}
