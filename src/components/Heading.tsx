import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

function Root({ className, ...props }: ComponentPropsWithoutRef<"div">) {
	return <div className={cn("flex flex-col gap-1 px-4  mb-4", className)} {...props} />
}

function Title<T extends React.ElementType = "h1">({
	className,
	as,
	...props
}: {
	className?: string
	as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, "className" | "as">) {
	const Component = as || "h1"
	return (
		<Component
			className={cn("text-2xl font-semibold font-display text-foreground", className)}
			{...props}
		/>
	)
}

function Subtitle<T extends React.ElementType = "h2">({
	className,
	as,
	...props
}: {
	className?: string
	as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, "className" | "as">) {
	const Component = as || "h2"
	return (
		<Component className={cn("text-xl font-display text-muted-foreground", className)} {...props} />
	)
}

const Heading = Object.assign(Root, {
	Title,
	Subtitle,
})

export default Heading
