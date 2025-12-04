/**
 * @desc The 'useBreakpoint()' hook is used to get the current
 *       screen breakpoint based on the TailwindCSS config.
 *
 * @usage
 *    import { useBreakpoint } from "@/hooks/useBreakpoint";
 *
 *    const { isAboveSm, isBelowSm, sm } = useBreakpoint("sm");
 *    console.log({ isAboveSm, isBelowSm, sm });
 *
 *    const { isAboveMd } = useBreakpoint("md");
 *    const { isAboveLg } = useBreakpoint("lg");
 *    const { isAbove2Xl } = useBreakpoint("2xl");
 *    console.log({ isAboveMd, isAboveLg, isAbove2Xl });
 *
 * @see https://stackoverflow.com/a/76630444/6543935
 * @requirements npm install react-responsive
 */
import { useLayoutEffect, useState } from "react"

const breakpoints = {
	xs: "480px",
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
}

export function useBreakpoint<K extends string>(breakpointKey: K) {
	const breakpointValue = breakpoints[breakpointKey as keyof typeof breakpoints]
	const numericValue = Number.parseInt(breakpointValue, 10)

	// Logo: isAbove = false, isBelow = true (Mobile First).
	const [bool, setBool] = useState<boolean | null>(null)

	useLayoutEffect(() => {
		const media = window.matchMedia(`(min-width: ${numericValue}px)`)
		setBool(media.matches)

		const listener = (e: MediaQueryListEvent) => setBool(e.matches)
		media.addEventListener("change", listener)
		return () => media.removeEventListener("change", listener)
	}, [numericValue])

	const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1)

	type KeyAbove = `isAbove${Capitalize<K>}`
	type KeyBelow = `isBelow${Capitalize<K>}`

	return {
		[breakpointKey]: numericValue,
		[`isAbove${capitalizedKey}`]: bool,
		[`isBelow${capitalizedKey}`]: !bool,
	} as Record<K, number> & Record<KeyAbove | KeyBelow, boolean>
}
