import { cn } from "@/lib/utils"

interface SkeletonProps extends React.ComponentProps<"div"> {
	executeOnce?: boolean
}

function Skeleton({ className, executeOnce = false, ...props }: SkeletonProps) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"relative overflow-hidden rounded-xl bg-size-[250%_250%] bg-[linear-gradient(45deg,transparent_25%,var(--color)_50%,transparent_75%,transparent_100%)] bg-position-[-100%_0] bg-no-repeat",
				executeOnce
					? "animate-[shine_1s_ease-in-out_1]"
					: "animate-[shine_1s_ease-in-out_infinite]",
				className
			)}
			{...props}
		/>
	)
}

export { Skeleton }
