import { type ReactNode, useId } from "react"
import { cn } from "@/lib/utils"

type KeyValueItem = {
	key: ReactNode
	value: ReactNode
	dividerBefore?: boolean
}

type KeyValueListProps = {
	items: KeyValueItem[]
	className?: string
}

function KeyValueList({ items, className }: KeyValueListProps) {
	const id = useId()
	return (
		<dl className={cn("grid grid-cols-[1fr_auto] gap-y-1.5  ", className)}>
			{items.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={`${id}-${index}`} className="contents">
					{item.dividerBefore && <hr className="col-span-2 my-1.5" />}
					<dt>{item.key}</dt>
					<dd className="text-left">{item.value}</dd>
				</div>
			))}
		</dl>
	)
}

export default KeyValueList
