import { motion, stagger } from "motion/react"
import { cn } from "@/lib/utils"

function DotPulseLoading({ className }: { className?: string }) {
	return (
		<motion.div
			initial="initial"
			animate="pulse"
			className={cn("flex items-center justify-center gap-1")}
			transition={{
				delayChildren: stagger(0.1),
			}}
		>
			{Array.from({ length: 3 }).map((_, index) => {
				return (
					<motion.div
						variants={{
							initial: {
								scale: 0.9,
								opacity: 0.9,
							},
							pulse: {
								scale: 1.5,
								opacity: 1,
								transition: {
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "reverse",
									duration: 0.3,
									ease: "easeInOut",
								},
							},
						}}
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className={cn("size-1.5 bg-muted-foreground rounded-full origin-center", className)}
					/>
				)
			})}
		</motion.div>
	)
}

export default DotPulseLoading
