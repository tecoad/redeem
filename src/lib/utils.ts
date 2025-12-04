import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": ["text-large-title", "text-title1", "text-title2", "text-body", "text-caption"],
		},
	},
})

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
