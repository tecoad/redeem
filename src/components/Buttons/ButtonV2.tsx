import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"
import { cn } from "@/lib/utils"

const shareButtonVariants = cva(
	[
		// Base classes (shared)
		"group relative inline-flex items-center justify-center gap-2",
		"rounded-full cursor-pointer overflow-hidden",
		"transition-all duration-200 font-medium tracking-tight",
	],
	{
		variants: {
			variant: {
				outline: [
					// Border
					"border-[1.5px] border-solid border-[#d4d4d4]",
					// Background
					"bg-[rgba(221,221,221,0.2)]",
					// Text color
					"text-[#383838]",
					// Idle shadow (glassmorphism)
					"shadow-[inset_0_1px_2px_3px_rgba(255,255,255,0.7),inset_0_-0.362176px_1.2314px_-1.625px_rgba(0,0,0,0.61),inset_0_-3px_10.2px_-3.25px_rgba(0,0,0,0.35),0_24px_16px_-10px_rgba(0,0,0,0.03),0_0.636953px_2.92999px_0_rgba(0,0,0,0.01),0_1.9316px_8.88538px_0_rgba(0,0,0,0.02),0_5.10612px_23.4882px_0_rgba(0,0,0,0.05),0_16px_73.6px_0_rgba(0,0,0,0.15),inset_0_-4px_18.8px_0_rgb(255,255,255),inset_0_6px_16px_0_rgba(116,116,116,0.25),inset_0_0_8px_2px_rgba(255,255,255,0.44)]",
					// Hover shadow (purple glow)
					"hover:shadow-[inset_0_1px_2px_3px_rgba(255,255,255,0.7),inset_0_-0.362176px_1.2314px_-1.625px_rgba(0,0,0,0.61),inset_0_-3px_10.2px_-3.25px_rgba(0,0,0,0.35),0_24px_16px_-10px_rgba(0,0,0,0.03),0_0.636953px_2.92999px_0_rgba(168,87,255,0.01),0_1.9316px_8.88538px_0_rgba(168,87,255,0.03),0_5.10612px_23.4882px_0_rgba(168,87,255,0.08),0_16px_73.6px_0_rgba(168,87,255,0.25),inset_0_-4px_18.8px_0_rgb(255,255,255),inset_0_6px_16px_0_rgba(116,116,116,0.25),inset_0_0_8px_2px_rgba(255,255,255,0.44)]",
					// Active/pressed shadow (inverted inset)
					"active:shadow-[inset_0_1px_2px_3px_rgba(255,255,255,0.7),inset_0_0.362176px_1.2314px_-1.625px_rgba(0,0,0,0.61),inset_0_3px_10.2px_-3.25px_rgba(0,0,0,0.35),0_24px_16px_-10px_rgba(0,0,0,0.03),0_0.48175px_2.21605px_-0.333333px_rgba(168,87,255,0.06),0_1.83083px_8.4218px_-0.666667px_rgba(168,87,255,0.08),0_8px_36.8px_-1px_rgba(168,87,255,0.2),inset_0_-4px_18.8px_0_rgb(255,255,255),inset_0_6px_16px_0_rgba(116,116,116,0.25),inset_0_0_8px_2px_rgba(255,255,255,0.44)]",
				],
				filled: [
					// Border - mesma do outline
					"border-[1.5px] border-solid border-[#d4d4d4]",
					// Background - igual outline
					// "bg-[rgba(221,221,221,0.2)]",
					// Text color - igual outline
					"text-white",
					// Idle shadow (glassmorphism)
					"shadow-[inset_0_1px_2px_3px_rgba(255,255,255,0.7),inset_0_-0.362176px_1.2314px_-1.625px_rgba(0,0,0,0.61),inset_0_-3px_10.2px_-3.25px_rgba(0,0,0,0.35),0_24px_16px_-10px_rgba(0,0,0,0.03),0_0.636953px_2.92999px_0_rgba(0,0,0,0.01),0_1.9316px_8.88538px_0_rgba(0,0,0,0.02),0_5.10612px_23.4882px_0_rgba(0,0,0,0.05),0_16px_73.6px_0_rgba(0,0,0,0.15),inset_0_-4px_18.8px_0_rgb(255,255,255),inset_0_6px_16px_0_rgba(116,116,116,0.25),inset_0_0_8px_2px_rgba(255,255,255,0.44)]",
					// Hover shadow (purple glow)
					"hover:shadow-[inset_0_1px_2px_3px_rgba(255,255,255,0.7),inset_0_-0.362176px_1.2314px_-1.625px_rgba(0,0,0,0.61),inset_0_-3px_10.2px_-3.25px_rgba(0,0,0,0.35),0_24px_16px_-10px_rgba(0,0,0,0.03),0_0.636953px_2.92999px_0_rgba(168,87,255,0.01),0_1.9316px_8.88538px_0_rgba(168,87,255,0.03),0_5.10612px_23.4882px_0_rgba(168,87,255,0.08),0_16px_73.6px_0_rgba(168,87,255,0.25),inset_0_-4px_18.8px_0_rgb(255,255,255),inset_0_6px_16px_0_rgba(116,116,116,0.25),inset_0_0_8px_2px_rgba(255,255,255,0.44)]",
					// Active/pressed shadow (inverted inset)
					"active:shadow-[inset_0_1px_2px_3px_rgba(255,255,255,0.7),inset_0_0.362176px_1.2314px_-1.625px_rgba(0,0,0,0.61),inset_0_3px_10.2px_-3.25px_rgba(0,0,0,0.35),0_24px_16px_-10px_rgba(0,0,0,0.03),0_0.48175px_2.21605px_-0.333333px_rgba(168,87,255,0.06),0_1.83083px_8.4218px_-0.666667px_rgba(168,87,255,0.08),0_8px_36.8px_-1px_rgba(168,87,255,0.2),inset_0_-4px_18.8px_0_rgb(255,255,255),inset_0_6px_16px_0_rgba(116,116,116,0.25),inset_0_0_8px_2px_rgba(255,255,255,0.44)]",
				],
			},
			size: {
				small: "px-3 py-2 text-sm",
				medium: "px-4 py-3 text-base",
				large: "px-4 py-4 text-lg",
			},
		},
		defaultVariants: {
			variant: "filled",
			size: "large",
		},
	}
)

const buttonGradientVariants = cva(
	[
		// Container base - posição e transições (controla opacity unificada)
		"absolute z-1 w-[100px] -top-[10px] -bottom-[50%] translate-x-1/2 right-0",
		"overflow-visible transition-all duration-400",
		"mix-blend-darken  rounded-[inherit]",
		// Pseudo-elements base
		"before:absolute before:rounded-[inherit]",
		"after:absolute after:rounded-[inherit]",
	],
	{
		variants: {
			variant: {
				outline: [
					"opacity-0 group-hover:opacity-90 group-active:opacity-30",
					// ::before - Gradiente colorido
					"before:content-[''] before:top-[2px] before:left-1/2 before:-translate-x-1/2",
					"before:w-[307px] before:h-[270px]",
					"before:blur-[15.6756px]",
					"before:bg-[linear-gradient(rgb(0,136,255)_0%,rgb(84,152,255)_8.56%,rgb(255,62,213)_13.18%,rgb(255,216,0)_20.55%,rgb(255,6,31)_25.34%)]",
					// ::after - Imagem overlay
					"after:content-[''] after:top-0 after:left-[17px]",
					"after:w-[177px] after:h-[174px]",
					"after:blur-[15px]",
					"after:bg-[url('/gradient.png')] after:bg-cover",
				],
				filled: [
					"opacity-80 group-hover:opacity-60 mix-blend-multiply group-active:opacity-30",
					// ::before - Gradiente colorido
					"before:content-[''] before:top-[2px] before:left-1/2 before:-translate-x-1/2",
					"before:w-[307px] before:h-[270px]",
					"before:blur-[15.6756px]",
					"before:bg-[linear-gradient(rgb(0,136,255)_0%,rgb(84,152,255)_8.56%,rgb(255,62,213)_13.18%,rgb(255,216,0)_20.55%,rgb(255,6,31)_25.34%)]",
					// ::after - Imagem overlay
					"after:content-[''] after:top-0 after:left-[17px]",
					"after:w-[177px] after:h-[174px]",
					"after:blur-[15px]",
					"after:bg-[url('/gradient.png')] after:bg-cover",
				],
			},
		},
		defaultVariants: {
			variant: "outline",
		},
	}
)

export type ShareButtonProps<T extends React.ElementType = "button"> = {
	className?: string
	as?: T
	children?: React.ReactNode
} & VariantProps<typeof shareButtonVariants> &
	Omit<React.ComponentPropsWithoutRef<T>, "className" | "as" | "children">

function ShareButton<T extends React.ElementType = "button">({
	className,
	as,
	size,
	children,
	variant,
	...props
}: ShareButtonProps<T>) {
	const Component = as || "button"

	return (
		<Component className={cn(shareButtonVariants({ variant, size }), className)} {...props}>
			<span className="relative z-10 pointer-events-none">{children}</span>
			<div className={buttonGradientVariants({ variant })} />
		</Component>
	)
}

type ButtonGradientVariantProps = VariantProps<typeof buttonGradientVariants>

export { ShareButton, shareButtonVariants, type ButtonGradientVariantProps }
