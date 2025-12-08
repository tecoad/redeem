import { useMemo, useState } from "react"
import { Button } from "../Buttons/Button"
import Drawer, { type DrawerProps } from "../Drawer"

type View = "email" | "sent"

function SendReceiptDrawer(props: DrawerProps) {
	const [view, setView] = useState<View>("email")

	const content = useMemo(() => {
		switch (view) {
			case "email":
				return <EmailView setView={setView} />
			case "sent":
				return <SentView />
		}
	}, [view])

	return (
		<Drawer activeElementKey={view} onAnimationEnd={() => setView("email")} {...props}>
			{content}
		</Drawer>
	)
}

function EmailView({ setView }: { setView: (view: View) => void }) {
	return (
		<>
			<Drawer.Header>
				<Drawer.Header.Title>Receive receipt</Drawer.Header.Title>
				<Drawer.Header.Description>
					Insert your email to receive the receipt.
				</Drawer.Header.Description>
			</Drawer.Header>

			<Drawer.Content>input comes here</Drawer.Content>
			<Drawer.Footer>
				<Drawer.Close asChild>
					<Button>Dismiss</Button>
				</Drawer.Close>
				<Button onClick={() => setView("sent")}>Continue</Button>
			</Drawer.Footer>
		</>
	)
}

function SentView() {
	return (
		<>
			<Drawer.Header>
				<Drawer.Header.Title>Confirmation</Drawer.Header.Title>
				<Drawer.Header.Description>Has been sent to your email XXXXX.</Drawer.Header.Description>
			</Drawer.Header>

			<Drawer.Footer>
				<Drawer.Close asChild>
					<Button>Close</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</>
	)
}

export default SendReceiptDrawer
