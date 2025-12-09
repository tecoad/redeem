import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/Buttons/Button"
import { CheckIcon } from "@/components/CheckIcon"
import SendReceiptDrawer from "@/components/Drawers/SendReceiptDrawer"
import Heading from "@/components/Heading"
import KeyValueList from "@/components/KeyValueList"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/redeem/result")({
	component: RouteComponent,
})

function RouteComponent() {
	const [drawerOpen, setDrawerOpen] = useState(false)
	return (
		<>
			<Layout>
				<Heading className="mt-15">
					<CheckIcon className="size-12 mb-5" />
					<Heading.Title>Done</Heading.Title>
					<Heading.Subtitle>Here is your receipt</Heading.Subtitle>
				</Heading>
				<div className="w-full px-4 py-10">
					<KeyValueList
						items={[
							{ key: "Transaction ID", value: "1234567890" },
							{ key: "Amount", value: <span className="strong">R$100.00</span> },
							{ key: "Date", value: "2021-01-01" },
							{ key: "Time", value: "10:00" },
						]}
					/>
				</div>
				<div className="w-full break-all">
					<div className="text-muted-foreground font-semibold">Authorization code</div>
					<div>F646B96B450AA8A4D79A84A3FD34EC20EE5520</div>
				</div>
				<Layout.Footer>
					<Button onClick={() => setDrawerOpen(true)}>Send to my email</Button>
				</Layout.Footer>
			</Layout>
			<SendReceiptDrawer open={drawerOpen} onOpenChange={open => setDrawerOpen(open)} />
		</>
	)
}
