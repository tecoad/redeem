import { type HTMLMotionProps, motion } from "motion/react"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./Button"

type View = "default" | "detailed" | "blank" | "flipped"

// Between default and detailed will ocurr an animation like revealing some data
const views: View[] = ["default", "detailed", "blank", "flipped"]

function Giftcard<T extends React.ElementType = "div">({
	className,
	as,
	...props
}: { className?: string; as?: T; view?: View } & Omit<
	React.ComponentPropsWithoutRef<T>,
	"className" | "as" | "view"
>) {
	const [view, setView] = useState<View>(props.view || "default")

	const currentIndex = views.indexOf(view)
	const nextIndex = (currentIndex + 1) % views.length
	const nextView = views[nextIndex]

	const cycleView = () => {
		setView(nextView)
	}

	const Component = useMemo(() => {
		switch (view) {
			case "default":
				return <DefaultView />
			case "blank":
				return <BlankView />
			case "detailed":
				return <DetailedView />
			case "flipped":
				return <FlippedView />
		}
	}, [view])

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

function Root({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div
			className={cn(
				"w-full aspect-card flex p-4 pointer-events-none select-none flex-col justify-between rounded-[24px] bg-[blue] relative",
				className
			)}
			{...props}
		/>
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

function MerchantLogo({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div layoutId="merchant-logo" className={cn(className)} {...props} />
}

function Hashcode({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div layoutId="hashcode" className={cn(className)} {...props} />
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
