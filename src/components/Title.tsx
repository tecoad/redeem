function Title({ title, subtitle }: { title: string; subtitle: string }) {
	return (
		<div className="flex flex-col gap-1">
			<h1 className="text-large-title font-bold text-foreground">{title}</h1>
			<h2 className="text-title1 text-muted-foreground">{subtitle}</h2>
		</div>
	)
}

export default Title
