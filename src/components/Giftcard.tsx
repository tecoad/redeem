import { type HTMLMotionProps, motion } from "motion/react"
import { useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./Button"

type View = "default" | "detailed" | "blank" | "flipped"

// Between default and detailed will ocurr an animation like revealing some data
const views: View[] = ["default", "detailed", "blank", "flipped"]

function Giftcard({ view = "default" }: { view: View }) {
	const [internalView, setInternalView] = useState<View>(view)

	const currentIndex = views.indexOf(internalView)
	const nextIndex = (currentIndex + 1) % views.length
	const nextView = views[nextIndex]

	const cycleView = () => {
		setInternalView(nextView)
	}

	const Component = useMemo(() => {
		switch (internalView) {
			case "blank":
				return <BlankView />
			case "detailed":
				return <DetailedView />
			case "flipped":
				return <FlippedView />
			default:
				return <DefaultView />
		}
	}, [internalView])

	return (
		<>
			<Button
				size="small"
				variant="neutral"
				className="absolute top-0 right-0 z-10 w-auto"
				onClick={cycleView}
			>
				Flip {nextView}
			</Button>

			{Component}
		</>
	)
}

function DefaultView({ ...props }: HTMLMotionProps<"div">) {
	return (
		<Root {...props}>
			<div className="flex w-full justify-between">
				<MerchantLogo>Merchant logo</MerchantLogo>
				<Hashcode animate={{ opacity: 0 }}>Hashcode</Hashcode>
			</div>

			<div className="flex w-full justify-between">
				<Logo>Gifter</Logo>
				<Expiration animate={{ opacity: 0 }}>exp 12/12/2025</Expiration>
			</div>

			<Balance animate={{ opacity: 0 }}>balance indicator</Balance>
		</Root>
	)
}

function DetailedView({ ...props }: HTMLMotionProps<"div">) {
	const elementRef = useRef<HTMLDivElement>(null)

	// if (!elementRef.current) return null
	// const { words, chars } = splitText(elementRef.current)

	return (
		<Root {...props} className="border-2! border-[red]!">
			<div className="relative flex flex-col justify-between h-full">
				<div className="flex w-full justify-between ">
					<MerchantLogo>Merchant logo</MerchantLogo>
					<motion.div
						className="absolute"
						variants={{
							initial: { top: "50%", right: "50%", translateY: "-50%", translateX: "50%" },
							final: { top: "0%", right: "0%", translateY: "0%", translateX: "0%" },
						}}
						transition={{
							ease: "easeInOut",
							duration: 0.3,
							delay: 1,
						}}
					>
						<Hashcode ref={elementRef} className="whitespace-nowrap">
							•••• •••• •••• •••• 230345
						</Hashcode>
					</motion.div>
				</div>

				<div className="flex w-full justify-between">
					<Logo>Gifter</Logo>

					<Expiration className="border border-[red]! overflow-hidden">
						<motion.div
							initial={{
								translateY: "100%",
							}}
							transition={{
								delay: 1.5,
							}}
							animate={{
								translateY: "0%",
							}}
						>
							exp 12/12/2025
						</motion.div>
					</Expiration>
				</div>
			</div>

			<Balance
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					delay: 2,
				}}
			>
				balance indicator
			</Balance>
		</Root>
	)
}

function BlankView({ ...props }: HTMLMotionProps<"div">) {
	return (
		<Root {...props}>
			<div className="flex w-full justify-between">
				<MerchantLogo animate={{ opacity: 0 }}>Merchant logo</MerchantLogo>
				<Hashcode animate={{ opacity: 0 }}>Hashcode</Hashcode>
			</div>

			<div className="flex w-full justify-between">
				<Logo animate={{ opacity: 0 }}>Gifter</Logo>
				<Expiration animate={{ opacity: 0 }}>exp 12/12/2025</Expiration>
			</div>

			<Balance animate={{ opacity: 0 }}>balance indicator</Balance>
		</Root>
	)
}

function FlippedView({ ...props }: HTMLMotionProps<"div">) {
	return (
		<Root {...props}>
			<div className="flex w-full justify-between">
				<MerchantLogo animate={{ opacity: 0 }}>Merchant logo</MerchantLogo>
				<Hashcode animate={{ opacity: 0 }}>Hashcode</Hashcode>
			</div>

			<div className="flex w-full justify-between">
				<Logo animate={{ opacity: 0 }}>Gifter</Logo>
				<Expiration animate={{ opacity: 0 }}>exp 12/12/2025</Expiration>
			</div>

			<Balance animate={{ opacity: 0 }}>balance indicator</Balance>
		</Root>
	)
}

function Root({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div
			layoutId="giftcard"
			className={cn(
				"w-full aspect-card flex p-4 pointer-events-none select-none flex-col justify-between rounded-[24px] bg-[blue] relative",
				className
			)}
			{...props}
		/>
	)
}

function MerchantLogo({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div layoutId="merchant-logo" className={cn(className)} {...props} />
}

function Hashcode({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div layout className={cn(className)} {...props} />
}

function Logo({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div layoutId="logo" className={cn(className)} {...props} />
}

function Expiration({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div layoutId="expiration" className={cn(className)} {...props} />
}

function Balance({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div
			layoutId="balance"
			className={cn(
				"absolute inset-0 flex z-10 items-center justify-center pointer-events-none",
				className
			)}
			{...props}
		/>
	)
}

export default Giftcard
