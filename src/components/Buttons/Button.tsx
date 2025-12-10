import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
	[
		"group relative w-full rounded-full overflow-clip transition-all duration-300 font-semibold select-none",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0",
		// Highlight: Bringing front gives a metallic effect
		"before:absolute  before:rounded-[inherit] before:mix-blend-plus-lighter before:transition-all before:duration-200 before:inset-px before:bg-linear-to-br before:z-0",
		// Inner embossed effect will become a pseud after element
		"after:absolute  after:rounded-[inherit]  after:transition-all after:duration-500 after:inset-[2px]",
	],
	{
		variants: {
			variant: {
				primary: [
					// Base
					"from-white to-white via-primary text-shadow-[0px_1px_0px_rgb(0_0_0/0.10)] text-white bg-linear-to-br hover:text-shadow-[0px_1px_0px_rgb(255_255_255/0.2)]",
					// Before: highlight
					"before:inset-[10px]  before:from-white before:to-white before:via-black before:blur-[1px]",
					// After: inner emboss
					"active:after:from-primary active:after:bg-radial-[at_50%_63%]  active:after:from-65% active:after:to-black/40 hover:after:bg-[oklch(from_var(--primary)_calc(l-0.05)_c_h)] hover:after:blur-[3px] after:blur-1px after:bg-primary after:inset-[2px]",
				],
				outline: [
					// Base
					"from-black/6 to-black/6 via-transparent bg-linear-to-br text-[#929292] text-shadow-[0px_1px_0px_rgb(255_255_255/0.10)]",
					// Before: highlight
					"before:bg-[#F8F8F8] before:inset-[3px] before:from-[white] before:to-transparent before:to-50% before:mix-blend-normal before:blur-[1px] before:bg-linear-to-t before:z-1",
					// After: inner emboss
					"after:bg-[white] after:inset-[1px]",
				],
				muted: [
					// Base
					"from-[#858585] to-[#8F8F8F] bg-linear-to-br text-shadow-[0px_1px_0px_rgb(0_0_0/0.10)] text-white",
					// Before: highlight
					"before:bg-[#858585] before:inset-[5px] before:from-black/20 before:to-transparent before:to-80% before:mix-blend-normal before:blur-[1px] before:bg-linear-to-b before:z-1",
					// After: inner emboss
					"after:bg-[#8F8F8F] after:inset-[1px] after:from-black/30 after:to-transparent after:to-30% after:bg-linear-to-b",
				],
				ghost: [""],
			},
			state: {
				idle: "",
				pending: "opacity-90 cursor-wait",
				success: "bg-green-500 text-white border-green-600",
				error: "bg-red-500 text-white border-red-600",
			},
			size: {
				sm: "px-3 py-2 text-sm",
				md: "px-4 py-3 text-base [&_svg:not([class*='size-'])]:size-5",
				lg: "px-6 py-4 text-lg [&_svg:not([class*='size-'])]:size-6",
				state: "idle",
			},
		},
		defaultVariants: {
			variant: "muted",
			size: "lg",
		},
	}
)

export type ButtonProps<T extends React.ElementType = "button"> = {
	className?: string
	as?: T
	children?: React.ReactNode
} & VariantProps<typeof buttonVariants> &
	Omit<React.ComponentPropsWithoutRef<T>, "className" | "as" | "children">

function Button<T extends React.ElementType = "button">({
	className,
	as,
	size,
	children,
	variant,
	...props
}: ButtonProps<T>) {
	const Component = as || "button"

	return (
		<Component className={cn(buttonVariants({ variant, size }), className)} {...props}>
			{/* Div to hold the text position for shadow effect */}
			<div className="relative z-1">
				<div className="flex items-center justify-center gap-2 whitespace-nowrap">{children}</div>
				{/* Inset shadow effect */}
				<div className="text-transparent absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap [&_svg]:hidden ">
					{children}
				</div>
			</div>
		</Component>
	)
}

type ButtonVariantProps = VariantProps<typeof buttonVariants>
type ButtonStates = NonNullable<ButtonVariantProps["state"]>

export { Button, buttonVariants, type ButtonVariantProps, type ButtonStates }
