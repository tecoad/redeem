import { Slot } from "@radix-ui/react-slot"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

interface Props extends React.HTMLAttributes<HTMLElement> {
	asChild?: boolean
}

function Root({ className, ...props }: ComponentPropsWithoutRef<"div">) {
	return <div className={cn("flex flex-col gap-1", className)} {...props} />
}

// Polymorphic component
function Title({ className, asChild, ...props }: Props) {
	const Comp = asChild ? Slot : "h1"
	return <Comp className={cn("text-large-title font-bold text-foreground", className)} {...props} />
}

// Polymorphic component
function Subtitle({ className, asChild, ...props }: Props) {
	const Comp = asChild ? Slot : "h2"
	return <Comp className={cn("text-title1 text-muted-foreground", className)} {...props} />
}

const Heading = Object.assign(Root, {
	Title,
	Subtitle,
})

export default Heading
