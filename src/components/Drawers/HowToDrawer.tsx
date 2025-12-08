import { useMemo, useState } from "react"
import { Bento1 } from "../Bento/Bento1"
import { Bento2 } from "../Bento/Bento2"
import { Bento3 } from "../Bento/Bento3"
import { Button } from "../Button"
import Drawer, { type DrawerProps } from "../Drawer"

type View = "step1" | "step2" | "step3"

function HowToDrawer(props: DrawerProps) {
	const [view, setView] = useState<View>("step1")

	const content = useMemo(() => {
		switch (view) {
			case "step1":
				return <Step1View setView={setView} />
			case "step2":
				return <Step2View setView={setView} />
			case "step3":
				return <Step3View setView={setView} />
		}
	}, [view])

	return (
		<Drawer activeElementKey={view} onAnimationEnd={() => setView("step1")} {...props}>
			{content}
		</Drawer>
	)
}

function Step1View({ setView }: { setView: (view: View) => void }) {
	return (
		<>
			<Drawer.Header>
				<Drawer.Header.Fullbleed className="flex items-center justify-center">
					<Bento1 />
				</Drawer.Header.Fullbleed>
				<Drawer.Header.Title>Step 1</Drawer.Header.Title>
				<Drawer.Header.Description>
					Instructions are simple and easy to follow.
				</Drawer.Header.Description>
			</Drawer.Header>

			<Drawer.Content>asd</Drawer.Content>
			<Drawer.Footer>
				<Button onClick={() => setView("step2")}>Continue</Button>
			</Drawer.Footer>
		</>
	)
}

function Step2View({ setView }: { setView: (view: View) => void }) {
	return (
		<>
			<Drawer.Header>
				<Drawer.Header.Fullbleed>
					<Bento2 />
				</Drawer.Header.Fullbleed>
				<Drawer.Header.Title>Step 2</Drawer.Header.Title>
				<Drawer.Header.Description>
					Instructions are simple and easy to follow.
				</Drawer.Header.Description>
			</Drawer.Header>

			<Drawer.Content>
				Go to the store and buy the product you want to redeem. Ask the cashier to scan the barcode
				of the product. Then come back here.
			</Drawer.Content>

			<Drawer.Footer>
				<Button onClick={() => setView("step1")}>Back</Button>
				<Button onClick={() => setView("step3")}>Continue</Button>
			</Drawer.Footer>
		</>
	)
}

function Step3View({ setView }: { setView: (view: View) => void }) {
	return (
		<>
			<Drawer.Header>
				<Drawer.Header.Fullbleed>
					<Bento3 />
				</Drawer.Header.Fullbleed>
				<Drawer.Header.Title>Step 3</Drawer.Header.Title>
				<Drawer.Header.Description>
					Instructions are simple and easy to follow.
				</Drawer.Header.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Button onClick={() => setView("step2")}>Back</Button>
				<Drawer.Close asChild>
					<Button>Close</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</>
	)
}

export default HowToDrawer
