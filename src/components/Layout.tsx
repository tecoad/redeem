import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type RootProps<T extends React.ElementType = "div"> = {
	children: React.ReactNode
	className?: string
	as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, "children" | "className" | "as">

const Root = forwardRef<HTMLDivElement, RootProps>(({ children, className, as, ...props }, ref) => {
	const Component = as || "div"
	return (
		<Component
			ref={ref}
			className={cn("p-4 flex gap-4 w-full h-full items-start justify-between flex-col", className)}
			{...props}
		>
			{children}
		</Component>
	)
})

function Header({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn(!className ? "contents" : className)}>{children}</div>
}

function Content({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn(!className ? "contents" : className)}>{children}</div>
}

function Footer<T extends React.ElementType = "div">({
	children,
	className,
	as,
	...props
}: {
	children: React.ReactNode
	className?: string
	as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, "children" | "className" | "as">) {
	const Component = as || "div"
	return (
		<Component
			className={cn("self-stretch flex items-center justify-center flex-col gap-2", className)}
			{...props}
		>
			{children}
		</Component>
	)
}

const Layout = Object.assign(Root, {
	Header,
	Content,
	Footer,
})

export default Layout
