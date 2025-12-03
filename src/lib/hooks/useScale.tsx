"use client"

import { createContext, useContext, useMemo } from "react"
import type { RectReadOnly } from "react-use-measure"
import useMeasure, { type Options } from "react-use-measure"

interface ScaleContextValue {
	scale: number
	unscale: (value: number) => number
}

const ScaleContext = createContext<ScaleContextValue>({
	scale: 1,
	unscale: value => value,
})

export function ScaleProvider({ scale, children }: { scale: number; children: React.ReactNode }) {
	const value = useMemo<ScaleContextValue>(
		() => ({
			scale,
			unscale: v => v / scale,
		}),
		[scale]
	)

	return <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
}

export function useScale() {
	return useContext(ScaleContext)
}

type UnscaledBounds = {
	[K in keyof RectReadOnly]: RectReadOnly[K]
}

export function useUnscaledMeasure(
	options?: Options
): [React.RefCallback<Element>, UnscaledBounds] {
	const { scale } = useScale()
	const [ref, bounds] = useMeasure(options)

	const unscaledBounds = useMemo<UnscaledBounds>(
		() => ({
			x: bounds.x / scale,
			y: bounds.y / scale,
			width: bounds.width / scale,
			height: bounds.height / scale,
			top: bounds.top / scale,
			right: bounds.right / scale,
			bottom: bounds.bottom / scale,
			left: bounds.left / scale,
		}),
		[bounds, scale]
	)

	return [ref, unscaledBounds]
}
