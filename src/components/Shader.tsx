import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react"
import { createPortal } from "react-dom"

export const WaterRippleContext = createContext({ isAnimating: false })

/**
 * Canvas resolution multiplier (lower = better performance, higher = sharper)
 */
const CANVAS_DPI = 0.5

/**
 * Maximum wave radius before ripple is considered complete (normalized coords)
 */
const MAX_WAVE_RADIUS = 1.8

interface RippleInstance {
	id: number
	center: { x: number; y: number }
	startTime: number
}

interface WaterRippleEffectProps {
	children: ReactNode
	width: number
	height: number
	style?: React.CSSProperties
	/** Increment to trigger a new ripple */
	triggerKey?: number
	/** Center point of the ripple (normalized 0-1) */
	center?: { x: number; y: number }
	/** Called when all ripples complete */
	onComplete?: () => void
	/** Wave density (default: 20) */
	frequency?: number
	/** Wave strength (default: 0.012) */
	amplitude?: number
	/** Wave expansion speed (default: 3) */
	speed?: number
	/** Amplitude fade rate (default: 0.8) */
	decay?: number
	/** Shadow intensity along the wave (0-1, default: 0.15) */
	shadowStrength?: number
}

export function WaterRippleEffect({
	children,
	width,
	height,
	style,
	triggerKey = 0,
	center = { x: 0.5, y: 0.5 },
	onComplete,
	frequency = 20,
	amplitude = 0.012,
	speed = 3,
	decay = 0.8,
	shadowStrength = 0.15,
}: WaterRippleEffectProps) {
	const [isAnimating, setIsAnimating] = useState(false)
	const filterId = useId().replace(/[#:]/g, "-")
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const shadowCanvasRef = useRef<HTMLCanvasElement>(null)
	const feImageRef = useRef<SVGFEImageElement>(null)
	const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null)

	const animationFrameRef = useRef<number>(0)
	const prevTriggerKeyRef = useRef(triggerKey)
	const ripplesRef = useRef<RippleInstance[]>([])
	const isAnimatingRef = useRef(false)

	// Store props in ref for animation loop access
	const propsRef = useRef({
		width,
		height,
		amplitude,
		frequency,
		speed,
		decay,
		shadowStrength,
		onComplete,
	})
	propsRef.current = {
		width,
		height,
		amplitude,
		frequency,
		speed,
		decay,
		shadowStrength,
		onComplete,
	}

	const clearEffect = useCallback(() => {
		feDisplacementMapRef.current?.setAttribute("scale", "0")
		// Clear shadow canvas
		const shadowCtx = shadowCanvasRef.current?.getContext("2d")
		if (shadowCtx && shadowCanvasRef.current) {
			shadowCtx.clearRect(0, 0, shadowCanvasRef.current.width, shadowCanvasRef.current.height)
		}
	}, [])

	// Check if ripple is still visible
	const isRippleVisible = useCallback((ripple: RippleInstance, now: number): boolean => {
		const { speed: s } = propsRef.current
		const time = (now - ripple.startTime) / 1000
		const waveRadius = time * s * 0.25
		return waveRadius < MAX_WAVE_RADIUS
	}, [])

	// Animation loop
	const animateRef = useRef<() => void>(() => {})
	animateRef.current = () => {
		const canvas = canvasRef.current
		const shadowCanvas = shadowCanvasRef.current
		const feImage = feImageRef.current
		const feDisplacementMap = feDisplacementMapRef.current
		const context = canvas?.getContext("2d")
		const shadowContext = shadowCanvas?.getContext("2d")

		if (!canvas || !shadowCanvas || !feImage || !feDisplacementMap || !context || !shadowContext) {
			if (ripplesRef.current.length > 0) {
				animationFrameRef.current = requestAnimationFrame(animateRef.current)
			}
			return
		}

		const {
			width: w,
			height: h,
			amplitude: amp,
			frequency: freq,
			speed: spd,
			decay: dec,
			shadowStrength: shadow,
			onComplete: complete,
		} = propsRef.current
		const now = performance.now()
		const canvasW = Math.floor(w * CANVAS_DPI)
		const canvasH = Math.floor(h * CANVAS_DPI)

		// Filter completed ripples
		ripplesRef.current = ripplesRef.current.filter(r => isRippleVisible(r, now))

		// Stop if no ripples remain
		if (ripplesRef.current.length === 0) {
			clearEffect()
			isAnimatingRef.current = false
			setIsAnimating(false)
			complete?.()
			return
		}

		// Generate displacement map and shadow
		const rawValues: number[] = []
		const shadowValues: number[] = []
		let maxScale = 0.001

		for (let py = 0; py < canvasH; py++) {
			for (let px = 0; px < canvasW; px++) {
				const uvX = px / canvasW
				const uvY = py / canvasH
				let offsetX = 0
				let offsetY = 0
				let shadowIntensity = 0

				// Combine all active ripples
				for (const ripple of ripplesRef.current) {
					const time = (now - ripple.startTime) / 1000
					const fadeOut = Math.exp(-time * dec)
					const currentAmp = amp * fadeOut
					const waveRadius = time * spd * 0.25

					// Distance from ripple center
					const dx = uvX - ripple.center.x
					const dy = uvY - ripple.center.y
					const dist = Math.sqrt(dx * dx + dy * dy)

					// Ring falloff (wave is strongest at expanding edge)
					const distFromWave = Math.abs(dist - waveRadius)
					const ringFalloff = Math.exp(-distFromWave * 6)

					// Calculate wave displacement
					const wave = Math.sin(dist * freq - time * spd) * currentAmp * ringFalloff
					const angle = Math.atan2(dy, dx)
					offsetX += Math.cos(angle) * wave
					offsetY += Math.sin(angle) * wave

					// Calculate shadow intensity (follows the ring)
					shadowIntensity += ringFalloff * fadeOut * shadow
				}

				const ddx = offsetX * canvasW
				const ddy = offsetY * canvasH
				maxScale = Math.max(maxScale, Math.abs(ddx), Math.abs(ddy))
				rawValues.push(ddx, ddy)
				shadowValues.push(Math.min(shadowIntensity, 1))
			}
		}

		maxScale *= 2

		// Convert to RGBA pixel data for displacement
		const imageData = context.createImageData(canvasW, canvasH)
		let rawIndex = 0
		for (let i = 0; i < imageData.data.length; i += 4) {
			imageData.data[i] = (rawValues[rawIndex++] / maxScale + 0.5) * 255 // R
			imageData.data[i + 1] = (rawValues[rawIndex++] / maxScale + 0.5) * 255 // G
			imageData.data[i + 2] = 0 // B
			imageData.data[i + 3] = 255 // A
		}

		// Create shadow image data
		const shadowImageData = shadowContext.createImageData(canvasW, canvasH)
		for (let i = 0; i < shadowValues.length; i++) {
			const pixelIndex = i * 4
			const intensity = shadowValues[i]
			shadowImageData.data[pixelIndex] = 0 // R
			shadowImageData.data[pixelIndex + 1] = 0 // G
			shadowImageData.data[pixelIndex + 2] = 0 // B
			shadowImageData.data[pixelIndex + 3] = intensity * 255 // A
		}

		// Apply displacement to SVG filter
		context.putImageData(imageData, 0, 0)
		feImage.setAttribute("href", canvas.toDataURL())
		feDisplacementMap.setAttribute("scale", String(maxScale / CANVAS_DPI))

		// Apply shadow overlay
		shadowContext.putImageData(shadowImageData, 0, 0)

		animationFrameRef.current = requestAnimationFrame(animateRef.current)
	}

	// Handle new ripple triggers
	useEffect(() => {
		if (triggerKey !== prevTriggerKeyRef.current && triggerKey > 0) {
			ripplesRef.current.push({
				id: triggerKey,
				center: { ...center },
				startTime: performance.now(),
			})

			if (!isAnimatingRef.current) {
				isAnimatingRef.current = true
				setIsAnimating(true)
				animationFrameRef.current = requestAnimationFrame(animateRef.current)
			}
		}
		prevTriggerKeyRef.current = triggerKey
	}, [triggerKey, center])

	// Cleanup
	useEffect(() => {
		clearEffect()
		return () => cancelAnimationFrame(animationFrameRef.current)
	}, [clearEffect])

	const canvasWidth = Math.floor(width * CANVAS_DPI)
	const canvasHeight = Math.floor(height * CANVAS_DPI)

	return (
		<WaterRippleContext.Provider value={{ isAnimating }}>
			<svg width={0} height={0} style={{ display: "none" }} aria-hidden="true">
				<defs>
					<filter
						id={`${filterId}_filter`}
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
						x={0}
						y={0}
						width={width}
						height={height}
					>
						<feImage id={`${filterId}_map`} width={width} height={height} ref={feImageRef} />
						<feDisplacementMap
							in="SourceGraphic"
							in2={`${filterId}_map`}
							xChannelSelector="R"
							yChannelSelector="G"
							scale={0}
							ref={feDisplacementMapRef}
						/>
					</filter>
				</defs>
			</svg>

			<div style={{ position: "relative", width, height }}>
				{/* Content with displacement filter */}
				<div
					style={{
						width,
						height,
						overflow: "hidden",
						filter: `url(#${filterId}_filter)`,
						...style,
					}}
				>
					{children}
				</div>

				{/* Shadow overlay */}
				<canvas
					ref={shadowCanvasRef}
					width={canvasWidth}
					height={canvasHeight}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width,
						height,
						pointerEvents: "none",
					}}
				/>
			</div>

			{/* Displacement map canvas (hidden) */}
			<canvas
				ref={canvasRef}
				width={canvasWidth}
				height={canvasHeight}
				style={{ display: "none" }}
			/>
		</WaterRippleContext.Provider>
	)
}

/**
 * A wrapper component that excludes its children from the water ripple effect.
 * During animation, it creates a fixed-position portal clone that appears unaffected.
 */
interface WaterRippleExcludeProps {
	children: ReactNode
	className?: string
}

export function WaterRippleExclude({ children, className }: WaterRippleExcludeProps) {
	const { isAnimating } = useContext(WaterRippleContext)
	const originalRef = useRef<HTMLDivElement>(null)
	const [fixedStyle, setFixedStyle] = useState<React.CSSProperties | null>(null)

	useLayoutEffect(() => {
		if (isAnimating && originalRef.current) {
			const rect = originalRef.current.getBoundingClientRect()
			setFixedStyle({
				position: "fixed",
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height,
				zIndex: 9999,
			})
		} else {
			setFixedStyle(null)
		}
	}, [isAnimating])

	return (
		<>
			<div ref={originalRef} className={className} style={{ opacity: isAnimating ? 0 : 1 }}>
				{children}
			</div>
			{isAnimating &&
				fixedStyle &&
				createPortal(
					<div className={className} style={fixedStyle}>
						{children}
					</div>,
					document.body
				)}
		</>
	)
}

export default WaterRippleEffect
