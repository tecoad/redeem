function DeviceLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-center items-center  h-screen w-screen  p-10">
			<div className="max-w-lg h-full  aspect-iphone-16">{children}</div>
		</div>
	)
}

export default DeviceLayout
