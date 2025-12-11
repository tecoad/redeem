import { createFileRoute, type FileRouteTypes, useLocation } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/Buttons/Button"
import DotPulseLoading from "@/components/DotPulseLoading"
import Stepper from "@/components/Stepper"

export const Route = createFileRoute("/design-system")({
	component: RouteComponent,
})

const variants = ["primary", "outline", "muted", "ghost"] as const
const sizes = ["lg", "md", "sm"] as const

function RouteComponent() {
	const location = useLocation()
	const pathname = location.pathname as FileRouteTypes["to"]

	const [step, setStep] = useState<number>(0)

	const handleChangeStep = () => {
		setStep(prev => (prev + 1) % 4)
	}

	return (
		<div className="bg-background w-dvw min-h-dvh p-10">
			<div className="rounded-4xl shadow-inner bg-muted p-10 items-center justify-center flex flex-col gap-6">
				{sizes.map(size => (
					<div key={size} className="flex flex-col items-center gap-4 w-[300px]">
						{variants.map(variant => (
							<Button key={variant} variant={variant} size={size} className="w-auto">
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
							</Button>
						))}
					</div>
				))}

				<div className="w-[300px] bg-white items-center p-10 rounded-lg border border-border/80 flex gap-8 flex-col">
					<Stepper>
						<Stepper.Step to={step === 0 ? pathname : "/redeem"}>Implementar</Stepper.Step>
						<Stepper.Step to={step === 1 ? pathname : "/redeem"}>Step 2</Stepper.Step>
						<Stepper.Step to={step === 2 ? pathname : "/redeem/initiate"}>Step 3</Stepper.Step>
						<Stepper.Step to={step === 3 ? pathname : "/redeem/result"}>Step 4</Stepper.Step>
					</Stepper>
					<Button className="w-auto" size="sm" onClick={handleChangeStep}>
						Change step
					</Button>
				</div>
				<DotPulseLoading />
			</div>
		</div>
	)
}
