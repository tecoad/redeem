import { type HTMLMotionProps, motion, stagger } from "motion/react"
import { useId } from "react"
import { cn } from "@/lib/utils"
import { GifterLogo, WineLogo } from "./Logos"

function Root({ className, children, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div
			className={cn(
				"w-full aspect-card flex pointer-events-none select-none  rounded-[24px] bg-[#48B69C] relative overflow-hidden",
				"[view-transition-name:giftcard] ",
				className
			)}
			{...props}
		>
			{children}
		</motion.div>
	)
}

function ContentWrapper({
	className,
	children,
	...props
}: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div className={cn("px-5 py-7 w-full h-full", className)} {...props}>
			<motion.div className="@container-[size] flex flex-col justify-between relative h-full w-full">
				{children}
			</motion.div>
		</motion.div>
	)
}

function MerchantLogo({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div className={cn(className)} {...props}>
			<WineLogo className="w-24 text-[white]" />
		</motion.div>
	)
}

function Hashcode({
	children,
	className,
	...props
}: { children: string } & HTMLMotionProps<"div">) {
	const parts = children.split(" ")
	const id = useId()

	return (
		<motion.div
			transition={{
				delayChildren: stagger(0.02),
			}}
			className={cn("flex  font-mono text-lg gap-1.5 text-white", className)}
			{...props}
		>
			{parts.map((part, i) => {
				const isLast = i === parts.length - 1
				const isLastButOne = i === parts.length - 2

				return (
					<motion.div key={id} className="grid overflow-hidden  shrink-0">
						<motion.div
							variants={{
								initial: { translateY: "0%" },
								visible: { translateY: "-100%" },
								hashed: { translateY: "-100%" },
								final: isLast || isLastButOne ? { translateY: "-100%" } : { translateY: "-200%" },
							}}
							style={{ gridArea: "1/1", translateY: "0%" }}
						>
							&nbsp;&nbsp;&nbsp;&nbsp;
						</motion.div>

						<motion.div
							variants={{
								initial: { translateY: "100%" },
								visible: { translateY: "0%" },
								hashed: isLast ? { translateY: "0%" } : { translateY: "-100%" },
								final: isLast ? { translateY: "0%" } : { translateY: "-100%" },
							}}
							style={{ gridArea: "1/1", translateY: "100%" }}
						>
							{part}
						</motion.div>

						<motion.div
							variants={{
								initial: { translateY: "200%" },
								visible: { translateY: "100%" },
								hashed: isLast ? { translateY: "100%" } : { translateY: "0%" },
								final: isLastButOne
									? { translateY: "0%" }
									: isLast
										? { translateY: "100%" }
										: { translateY: "-100%" },
							}}
							style={{ gridArea: "1/1", translateY: "200%" }}
						>
							••••
						</motion.div>
					</motion.div>
				)
			})}
		</motion.div>
	)
}

function Logo({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div className={cn(className)} {...props}>
			<GifterLogo className="w-22 text-[white] opacity-50" />
		</motion.div>
	)
}

function Expiration({
	className,
	children,
	...props
}: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div className={cn("flex text-white gap-0 flex-col ", className)} {...props}>
			<motion.div className="overflow-hidden  text-[14px] uppercase font-medium">
				<motion.div
					variants={{
						initial: { translateY: "-100%" },
						final: { translateY: "0%" },
					}}
					transition={{
						duration: 0.2,
						type: "spring",
						stiffness: 100,
						damping: 10,
					}}
				>
					Expires on
				</motion.div>
			</motion.div>
			<motion.div className="overflow-hidden text-[16px] font-semibold">
				<motion.div
					variants={{
						initial: { translateY: "100%" },
						final: { translateY: "0%" },
					}}
					transition={{
						duration: 0.2,
						type: "spring",
						stiffness: 100,
						damping: 10,
					}}
				>
					{children}
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

function Balance({
	className,
	children,
	originalValue,
	availableValue,
	currency,
	...props
}: {
	className?: string
	originalValue: number
	availableValue: number
	currency: string
} & HTMLMotionProps<"div">) {
	const originalValueString = originalValue.toFixed(2)
	const availableValueString = availableValue.toFixed(2)

	return (
		<motion.div
			initial="available"
			whileHover="original"
			className={cn("flex flex-col gap-0.5 pointer-events-auto", className)}
			transition={{
				type: "spring",
				stiffness: 200,
				damping: 50,
			}}
			{...props}
		>
			<div className="text-white overflow-hidden text-[14px] uppercase font-medium grid">
				<motion.div
					variants={{
						available: { translateY: "0%" },
						original: { translateY: "-100%" },
					}}
					className="[grid-area:1/1]"
				>
					Balance
				</motion.div>
				<motion.div
					variants={{
						available: { translateY: "100%" },
						original: { translateY: "0%" },
					}}
					className="[grid-area:1/1]"
				>
					Initial Balance
				</motion.div>
			</div>

			<motion.div
				className={cn("flex text-[16px] group tracking-tight font-semibold h-7 items-center")}
			>
				<div className="aspect-square h-full font-semibold tracking-tight align-super bg-white rounded-l-sm p-1.5 ">
					<sup>{currency}</sup>
				</div>

				<div className=" relative  h-full flex items-center">
					{/* Spacer */}
					<div className="flex items-center h-full opacity-0" aria-hidden="true">
						<span className="opacity-0">{originalValueString}</span>
						<div className="h-full aspect-square" />
					</div>

					<motion.div
						className=" bg-white absolute inset-0  flex items-center justify-start"
						variants={{
							available: { clipPath: "inset(0 25px 0 0)" },
							original: { clipPath: "inset(0 100% 0 0)" },
						}}
					>
						<div>{availableValueString}</div>
					</motion.div>
					<motion.div
						className=" absolute overflow-hidden inset-0 flex items-center justify-end text-white bg-[url(/lightshade.svg)] bg-contain bg-repeat-x"
						variants={{
							available: {
								clipPath: "inset(0 0 0 calc(100% - 25px))",
								maskImage: "linear-gradient(to right, transparent calc(100% - 25px), black 90%)",
							},
							original: {
								clipPath: "inset(0 0 0 0px)",
								maskImage: "linear-gradient(to right, transparent calc(0% - 0px), black 10%)",
							},
						}}
					>
						<div className="pr-2">{originalValueString}</div>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	)
}

const Giftcard = Object.assign(Root, {
	Balance,
	Expiration,
	Logo,
	Hashcode,
	MerchantLogo,
	ContentWrapper,
})

export default Giftcard
