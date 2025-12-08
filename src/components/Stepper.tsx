import { Link, useMatchRoute } from "@tanstack/react-router"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"
import type { FileRouteTypes } from "@/routeTree.gen"

type ValidTo = FileRouteTypes["to"]

function Root({ className, ...props }: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn("flex items-center gap-1 w-full justify-center h-10", className)}
			{...props}
		/>
	)
}

function Step({
	className,
	to,
	disabled,
	...props
}: ComponentPropsWithoutRef<"div"> & { to: ValidTo; disabled?: boolean }) {
	const matchRoute = useMatchRoute()
	const activeRoute = matchRoute({ to })

	return (
		<Link to={to} disabled={disabled || !!activeRoute}>
			<div
				className={cn(
					"flex shrink-0 items-center gap-2 h-2 w-2 overflow-hidden bg-muted-foreground rounded-full",
					activeRoute && "bg-primary w-10",
					className
				)}
				{...props}
			/>
		</Link>
	)
}

const Stepper = Object.assign(Root, {
	Step,
})

export default Stepper
