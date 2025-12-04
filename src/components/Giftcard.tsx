import { type HTMLMotionProps, motion } from "motion/react"
import { useMemo, useState } from "react"
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

function DefaultView({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<Root className={cn(className)} {...props}>
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

function DetailedView({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<Root className={cn(className)} {...props}>
			<div className="flex w-full justify-between">
				<MerchantLogo>Merchant logo</MerchantLogo>
				<Hashcode>Hashcode</Hashcode>
			</div>

			<div className="flex w-full justify-between">
				<Logo>Gifter</Logo>
				<Expiration>exp 12/12/2025</Expiration>
			</div>

			<Balance>balance indicator</Balance>
		</Root>
	)
}

function BlankView({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<Root className={cn(className)} {...props}>
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

function FlippedView({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<Root className={cn(className)} {...props}>
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
	return (
		<motion.div layoutId="merchant-logo" initial={false} className={cn(className)} {...props} />
	)
}

function Hashcode({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div layoutId="hashcode" initial={false} className={cn(className)} {...props} />
}

function Logo({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div layoutId="logo" initial={false} className={cn(className)} {...props} />
}

function Expiration({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div layoutId="expiration" initial={false} className={cn(className)} {...props} />
}

function Balance({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div
			layoutId="balance"
			initial={false}
			className={cn(
				"absolute inset-0 flex z-10 items-center justify-center pointer-events-none",
				className
			)}
			{...props}
		/>
	)
}

export default Giftcard
