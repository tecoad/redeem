import { cn } from "@/lib/utils"

function Root({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div
			className={cn("p-4 flex gap-4 w-full h-full items-start justify-between flex-col", className)}
		>
			{children}
		</div>
	)
}

function Header({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn(!className ? "contents" : className)}>{children}</div>
}

function Content({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn(!className ? "contents" : className)}>{children}</div>
}

function Footer({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={cn("self-stretch flex items-center justify-center flex-col gap-2", className)}>
			{children}
		</div>
	)
}

const Layout = Object.assign(Root, {
	Header,
	Content,
	Footer,
})

export default Layout
