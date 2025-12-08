import { useRouter } from "@tanstack/react-router"
import { IconCircleDollarInFillDuo18 } from "nucleo-ui-fill-duo-18"
import { Button } from "../Buttons/Button"
import Drawer, { type DrawerProps } from "../Drawer"
import KeyValueList from "../KeyValueList"

function TopupDrawer(props: DrawerProps) {
	const router = useRouter()
	return (
		<Drawer {...props}>
			<Drawer.Header>
				<Drawer.Header.Title
					icon={<IconCircleDollarInFillDuo18 className="size-10 text-destructive" />}
				>
					Top up required
				</Drawer.Header.Title>
				<Drawer.Header.Description>
					The amount you are trying to redeem is greater than the amount you have available.
				</Drawer.Header.Description>
			</Drawer.Header>
			<Drawer.Content>
				<KeyValueList
					items={[
						{ key: "Wine Store Ltda", value: "R$120.00" },
						{ key: "Balance", value: "R$100.00" },
					]}
				/>
				<KeyValueList
					className="border-t mt-1.5 pt-1.5"
					items={[
						{ key: "Required topup", value: <span className="text-destructive">R$20.00</span> },
					]}
				/>
			</Drawer.Content>
			<Drawer.Footer>
				<Drawer.Close asChild>
					<Button variant="neutral">Dismiss</Button>
				</Drawer.Close>
				<Button onClick={() => router.navigate({ to: "/redeem/topup" })}>Proceed</Button>
			</Drawer.Footer>
		</Drawer>
	)
}

export default TopupDrawer
