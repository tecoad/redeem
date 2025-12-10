import { createFileRoute, type FileRouteTypes, useLocation } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/Buttons/Button"
import Stepper from "@/components/Stepper"

export const Route = createFileRoute("/design-system")({
	component: RouteComponent,
})

function RouteComponent() {
	const location = useLocation()
	const pathname = location.pathname as FileRouteTypes["to"]

	const [step, setStep] = useState<number>(0)

	const handleChangeStep = () => {
		setStep(prev => (prev + 1) % 4)
	}

	return (
		<div className="bg-background w-dvw h-dvh flex items-center justify-center flex flex-col gap-6">
			<div className="flex flex-col gap-4 w-[300px]">
				<Button variant="primary">Primary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="muted">Muted</Button>
				<Button variant="ghost">Ghost</Button>
			</div>
			<div className="w-[300px] bg-muted items-center p-10 rounded-lg shadow-inner flex gap-8 flex-col">
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
		</div>
	)
}
