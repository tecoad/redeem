import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

function Root({ className, ...props }: ComponentPropsWithoutRef<"div">) {
	return <div className={cn("flex items-center gap-2", className)} {...props} />
}

function Step({ className, ...props }: ComponentPropsWithoutRef<"div">) {
	return <div className={cn("flex items-center gap-2", className)} {...props} />
}

const Stepper = Object.assign(Root, {
	Step,
})

export default Stepper
