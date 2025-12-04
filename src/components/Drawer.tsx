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
	className?: string
}

function Root({ children, closable = true, activeElementKey, ...props }: DrawerProps) {
	const { fadeFromIndex, snapPoints, className, ...rest } = props
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
			<VaulDrawer.Content
				className={cn(
					"flex px-3 flex-col   absolute bottom-3 overflow-hidden left-0 right-0 [--padding-x:30px]",
					className
				)}
			>
				<motion.div
					animate={{
						height: bounds.height,
						transition: {
							duration: 0.27,
							ease: [0.25, 1, 0.5, 1],
						},
					}}
					className="w-full  corner-squircle bg-white  rounded-[40px] overflow-hidden"
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

					<div className="flex flex-col" ref={elementRef}>
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

function DrawerHeader({ className, children }: { className?: string; children: React.ReactNode }) {
	return <div className={cn("px-(--padding-x)", className)}>{children}</div>
}

function DrawerFullbleed({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return <div className={cn("-mx-(--padding-x)", className)}>{children}</div>
}

function DrawerTitle({
	children,
	icon,
	className,
}: {
	children: React.ReactNode
	icon?: React.ReactNode
	className?: string
}) {
	return (
		<div className={cn("flex flex-col gap-4 mt-10 text-title2 font-semibold", className)}>
			{icon}
			<VaulDrawer.Title>{children}</VaulDrawer.Title>
		</div>
	)
}

function DrawerDescription({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return <p className={cn("mt-3 text-body text-muted-foreground", className)}>{children}</p>
}

function DrawerContent({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn("px-(--padding-x) pt-(--padding-x)", className)}>{children}</div>
}

function DrawerFooter({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={cn("flex shrink-0 gap-4 py-(--padding-x) mx-(--padding-x)", className)}>
			{children}
		</div>
	)
}

const Drawer = Object.assign(Root, {
	Header: Object.assign(DrawerHeader, {
		Fullbleed: DrawerFullbleed,
		Title: DrawerTitle,
		Description: DrawerDescription,
	}),
	Content: DrawerContent,
	Footer: DrawerFooter,
	Close: VaulDrawer.Close,
})

export default Drawer
