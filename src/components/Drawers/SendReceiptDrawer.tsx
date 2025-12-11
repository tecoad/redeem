import { motion } from "motion/react"
import { useMemo, useState } from "react"
import { Button } from "../Buttons/Button"
import Drawer, { type DrawerProps } from "../Drawer"

type View = "email" | "sent"

function SendReceiptDrawer(props: DrawerProps) {
	const [view, setView] = useState<View>("email")
	const [email, setEmail] = useState("")
	const content = useMemo(() => {
		switch (view) {
			case "email":
				return <EmailView setView={setView} email={email} setEmail={setEmail} />
			case "sent":
				return <SentView email={email} setEmail={setEmail} />
		}
	}, [view, email])

	return (
		<Drawer activeElementKey={view} onAnimationEnd={() => setView("email")} {...props}>
			{content}
		</Drawer>
	)
}

function EmailView({
	setView,
	email,
	setEmail,
}: {
	setView: (view: View) => void
	email: string
	setEmail: (email: string) => void
}) {
	return (
		<>
			<Drawer.Header>
				<Drawer.Header.Title>Receive receipt</Drawer.Header.Title>
				<Drawer.Header.Description>
					Insert your email to receive the receipt.
				</Drawer.Header.Description>
			</Drawer.Header>

			<Drawer.Content>
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					className="w-full focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-primary  p-2 border border-gray-300 rounded-md"
					type="email"
					onKeyDown={e => {
						if (e.key === "Enter") {
							e.preventDefault()
							if (!email) return
							setView("sent")
						}
					}}
					placeholder="Email"
				/>
			</Drawer.Content>
			<Drawer.Footer>
				<Drawer.Close asChild>
					<Button variant="outline">Dismiss</Button>
				</Drawer.Close>
				<Button
					as={motion.button}
					layoutId="send-button"
					disabled={!email}
					onClick={() => setView("sent")}
				>
					Send
				</Button>
			</Drawer.Footer>
		</>
	)
}

function SentView({ email, setEmail }: { email: string; setEmail: (email: string) => void }) {
	return (
		<>
			<Drawer.Header>
				<Drawer.Header.Title>Confirmation</Drawer.Header.Title>
			</Drawer.Header>
			<Drawer.Content>
				<div>
					Has been sent to your email <span className=" font-medium text-foreground">{email}</span>.
				</div>
			</Drawer.Content>
			<Drawer.Footer>
				<Drawer.Close onClick={() => setEmail("")} asChild>
					<Button as={motion.button} layoutId="send-button">
						Close
					</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</>
	)
}

export default SendReceiptDrawer
