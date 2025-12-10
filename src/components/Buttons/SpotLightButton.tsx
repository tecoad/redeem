export function SpotLightButton() {
	return (
		<div className="bg-[black] p-10">
			<button
				type="button"
				className="group relative mx-auto inline-flex items-center overflow-hidden rounded-full bg-[oklch(27.4%_0.006_286.033)] px-8 py-3 transition"
			>
				<div className="absolute inset-0 flex items-center [container-type:inline-size]">
					<div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 [animation-duration:3s] group-hover:opacity-100"></div>
				</div>

				<div className="absolute inset-0.5 rounded-full bg-[oklch(21%_0.006_285.885)]"></div>

				<div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>

				<span className="font-mona relative mt-px bg-gradient-to-b from-white/25 to-white bg-clip-text text-lg font-medium text-transparent transition-all duration-200">
					{" "}
					Spotlight Button{" "}
				</span>
			</button>
		</div>
	)
}
