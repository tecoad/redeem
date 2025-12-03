import { AnimatePresence, motion } from "motion/react"
import { IconXmarkOutline18 } from "nucleo-ui-outline-18"
import { useEffect, useMemo, useRef, useState } from "react"
import { type DialogProps, Drawer as VaulDrawer } from "vaul"
import { useUnscaledMeasure } from "@/lib/hooks/useScale"
import { cn } from "@/lib/utils"

export interface DrawerProps extends Omit<DialogProps, "children"> {
	closable?: boolean
	children?: React.ReactNode
	activeElementKey?: string
}

function Root({ children, closable = true, activeElementKey, ...props }: DrawerProps) {
	const { fadeFromIndex, snapPoints, ...rest } = props
	const [container, setContainer] = useState<HTMLElement | null>(null)
	const [elementRef, bounds] = useUnscaledMeasure()
	const previousHeightRef = useRef<number>(0)

	useEffect(() => {
		const element = document.getElementById("safe_area")
		setContainer(element)
	}, [])

	const opacityDuration = useMemo(() => {
		const MIN_DURATION = 0.15
		const MAX_DURATION = 0.27

		if (!previousHeightRef.current) {
			previousHeightRef.current = bounds.height
			return MIN_DURATION
		}

		const heightDifference = Math.abs(bounds.height - previousHeightRef.current)
		previousHeightRef.current = bounds.height

		const duration = Math.min(Math.max(heightDifference / 500, MIN_DURATION), MAX_DURATION)

		return duration
	}, [bounds.height])

	if (!container) return null

	return (
		<VaulDrawer.Root container={container} {...rest}>
			<VaulDrawer.Overlay className="absolute inset-0 bg-black/40" />
			<VaulDrawer.Content className="flex px-3 flex-col overflow-hidden  absolute bottom-3 left-0 right-0">
				<motion.div
					animate={{
						height: bounds.height,
						transition: {
							duration: 0.27,
							ease: [0.25, 1, 0.5, 1],
						},
					}}
					className="w-full  corner-squircle bg-white  rounded-4xl"
				>
					{closable && (
						<VaulDrawer.Close asChild>
							<button
								type="button"
								data-vaul-no-drag=""
								className="absolute right-8 top-7 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
							>
								<IconXmarkOutline18 />
							</button>
						</VaulDrawer.Close>
					)}

					<div className="p-3 " ref={elementRef}>
						<AnimatePresence initial={false} mode="popLayout" custom={activeElementKey}>
							<motion.div
								initial={{ opacity: 0, scale: 0.96 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.96 }}
								key={activeElementKey}
								transition={{
									duration: opacityDuration,
									ease: [0.26, 0.08, 0.25, 1],
								}}
							>
								{children}
							</motion.div>
						</AnimatePresence>
					</div>
				</motion.div>
			</VaulDrawer.Content>
		</VaulDrawer.Root>
	)
}

function Header({
	icon,
	title,
	description,
	className,
}: {
	title: string
	description?: string
	icon?: React.ReactNode
	className?: string
}) {
	return (
		<VaulDrawer.Title className={cn("mt-[21px] px-2", className)}>
			{icon}
			<h2 className="mt-2.5 text-[22px] font-semibold text-[#222222] md:font-medium">{title}</h2>

			<p className="mt-3 text-[17px] font-medium leading-[24px] text-[#999999] md:font-normal">
				{description}
			</p>
		</VaulDrawer.Title>
	)
}

function Content({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn("px-2", className)}>{children}</div>
}

function Footer({ children }: { children: React.ReactNode }) {
	return <div className="flex gap-4">{children}</div>
}

const Drawer = Object.assign(Root, {
	Header,
	Content,
	Footer,
	Close: VaulDrawer.Close,
})

export default Drawer
