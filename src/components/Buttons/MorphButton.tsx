import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react"
import { TextMorph } from "@/components/TextMorph"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./Button"

export function MorphButton({
	icon,
	state,
	className,
	children,
	...props
}: {
	icon?: React.ReactNode
	children: string
} & HTMLMotionProps<"button"> &
	ButtonProps) {
	return (
		<Button
			layout="position"
			as={motion.button}
			className={cn("overflow-hidden origin-[30%_center]", className)}
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
			<TextMorph as="span" className="line-clamp-1">
				{children}
			</TextMorph>
		</Button>
	)
}
