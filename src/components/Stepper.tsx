import { Link, useMatchRoute } from "@tanstack/react-router"
import { type HTMLMotionProps, MotionConfig, motion } from "motion/react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { FileRouteTypes } from "@/routeTree.gen"

type ValidTo = FileRouteTypes["to"]

function Root({ className, ...props }: HTMLMotionProps<"div">) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={{
				visible: {
					transition: {
						staggerChildren: 0.1,
					},
				},
			}}
			className={cn(
				"flex items-center relative gap-2 w-full justify-center h-10 shrink-0",
				className
			)}
			{...props}
		/>
	)
}

function Step({
	className,
	to,
	disabled,
	children,
	...props
}: HTMLMotionProps<"div"> & { to: ValidTo; disabled?: boolean }) {
	const matchRoute = useMatchRoute()
	const activeRoute = matchRoute({ to })
	const [hasAnimated, setHasAnimated] = useState(false)

	return (
		<MotionConfig
			transition={{
				type: "spring",
				stiffness: 200,
				damping: 15,
				backgroundColor: {
					duration: 0.3,
					ease: [0.4, 0, 0.2, 1],
				},
			}}
		>
			<Link to={to} disabled={disabled || !!activeRoute}>
				<motion.div
					layoutId={`stepper-step-${to}`}
					whileHover={{
						height: activeRoute ? "auto" : "8px",
					}}
					variants={{
						hidden: { translateY: "-50px", filter: "blur(0px)", opacity: 0 },
						visible: { translateY: "0px", filter: "blur(0px)", opacity: 1 },

						interactive: {
							translateY: "0px",
							opacity: 1,
							filter: "blur(0px)",
							width: activeRoute ? "auto" : "8px",
							height: "8px",
							borderRadius: "99px",
							backgroundColor: activeRoute ? "var(--primary)" : "var(--muted-foreground)",
							transition: {
								type: "tween",
								ease: "circInOut",
								duration: 0.6,
								delay: activeRoute ? 0.3 : 0,
							},
						},
					}}
					animate={hasAnimated ? "interactive" : undefined}
					onAnimationComplete={() => setHasAnimated(true)}
					className={cn(
						"flex cursor-pointer group shrink-0 text-nowrap items-center gap-2 overflow-hidden bg-muted-foreground pointer-events-auto uppercase tracking-tighter text-xs font-mono shadow-inner text-white",
						className
					)}
					style={{
						width: "8px",
						height: "8px",
						borderRadius: "99px",
					}}
					{...props}
				>
					<motion.span className="mx-3 group-hover:opacity-100 opacity-0 transition-opacity duration-150">
						{children}
					</motion.span>
				</motion.div>
			</Link>
		</MotionConfig>
	)
}

const Stepper = Object.assign(Root, {
	Step,
})

export default Stepper
