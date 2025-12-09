import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"flex w-full items-center justify-center gap-2 whitespace-nowrap  text-lg font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-full ease-in-out duration-300",
	{
		variants: {
			variant: {
				default: "bg-foreground text-background hover:bg-foreground/80",
				outline: "",
				primary: "bg-primary text-primary-foreground hover:bg-primary/90",
				neutral: "bg-muted text-muted-foreground hover:bg-muted/80",
				ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				small: "h-[28px] px-[12px] py-[4px] has-[>svg]:px-[4px] text-[15px]",
				medium: "h-[34px] px-[14px] py-[7px] has-[>svg]:px-[7px] text-[15px]",
				large: "h-[50px] px-[20px] py-[14px] has-[>svg]:px-[14px] text-[17px]",
			},
			// icon: {
			// 	true: "aspect-square w-auto",
			// },
			state: {
				idle: "",
				pending: "opacity-90 cursor-wait",
				success: "bg-green-500 text-white border-green-600",
				error: "bg-red-500 text-white border-red-600",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "large",
			// icon: false,
			state: "idle",
		},
	}
)

export type ButtonProps<T extends React.ElementType = "button"> = {
	className?: string
	as?: T
} & VariantProps<typeof buttonVariants> &
	Omit<React.ComponentPropsWithoutRef<T>, "className" | "as">

function Button<T extends React.ElementType = "button">({
	className,
	as,
	variant,
	size,
	...props
}: ButtonProps<T>) {
	const Component = as || "button"
	return <Component className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

type ButtonVariantProps = VariantProps<typeof buttonVariants>

type ButtonStates = NonNullable<ButtonVariantProps["state"]>

export { Button, buttonVariants, type ButtonVariantProps, type ButtonStates }

{
	/* <button class="group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600"><span class="relative">Hover me</span><div class="animate-shine-infinite absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-[12px]"><div class="relative h-full w-8 bg-white/30"></div></div></button> */
}
