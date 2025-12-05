import { type HTMLMotionProps, motion } from "motion/react"
import { cn } from "@/lib/utils"

function Root({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div
			data-giftcard
			className={cn(
				"w-full aspect-card flex p-4 pointer-events-none select-none flex-col justify-between rounded-[24px] bg-[#48B69C] relative",
				className
			)}
			{...props}
		/>
	)
}

function MerchantLogo({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div data-merchant-logo className={cn(className)} {...props} />
}

function Hashcode({
	className,
	children,
	...props
}: { className?: string } & HTMLMotionProps<"div">) {
	const parts = typeof children === "string" ? children.split(" ") : [children]
	return (
		<motion.div className={cn("whitespace-nowrap flex gap-1", className)} {...props}>
			{parts.map((part, idx) => (
				<motion.div
					data-hashcode-part
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={idx}
					className="grid overflow-hidden place-items-center"
				>
					{/* Empty - começa visível (0%) */}
					<motion.div data-hashcode-empty style={{ gridArea: "1/1", translateY: "0%" }}>
						&nbsp;&nbsp;&nbsp;&nbsp;
					</motion.div>
					{/* Real - começa abaixo (100%) */}
					<motion.div data-hashcode-real style={{ gridArea: "1/1", translateY: "100%" }}>
						{typeof part === "string" ? part : String(part)}
					</motion.div>
					{/* Masked - começa mais abaixo (200%) */}
					<motion.div data-hashcode-masked style={{ gridArea: "1/1", translateY: "200%" }}>
						••••
					</motion.div>
				</motion.div>
			))}
		</motion.div>
	)
}

function Logo({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return <motion.div data-logo className={cn(className)} {...props} />
}

function Expiration({
	className,
	children,
	...props
}: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div className={cn("overflow-hidden", className)} {...props}>
			<motion.div
				data-expiration
				style={{
					translateY: "100%",
				}}
			>
				{children}
			</motion.div>
		</motion.div>
	)
}

function Balance({ className, ...props }: { className?: string } & HTMLMotionProps<"div">) {
	return (
		<motion.div
			data-balance
			className={cn(
				"absolute inset-0 flex z-10 items-center justify-center pointer-events-none",
				className
			)}
			{...props}
		/>
	)
}

const Giftcard = Object.assign(Root, {
	Balance,
	Expiration,
	Logo,
	Hashcode,
	MerchantLogo,
})

export default Giftcard
