import {
	IconBanFillDuo18,
	IconCircleDollarInFillDuo18,
	IconCircleDollarOutFillDuo18,
	IconMenuFillDuo18,
	IconShieldCheckFillDuo18,
} from "nucleo-ui-fill-duo-18"
import { useMemo, useState } from "react"
import { Button } from "../Button"
import { ConfirmButton } from "../ConfirmButton"
import Drawer, { type DrawerProps } from "../Drawer"
import KeyValueList from "../KeyValueList"

type View = "confirmation" | "topup"

function RedeemDrawer(props: DrawerProps) {
	const [view, setView] = useState<View>("confirmation")

	const content = useMemo(() => {
		switch (view) {
			case "confirmation":
				return <ConfirmationView setView={setView} />
			case "topup":
				return <TopupView setView={setView} />
		}
	}, [view])

	return (
		<Drawer activeElementKey={view} onAnimationEnd={() => setView("confirmation")} {...props}>
			{content}
		</Drawer>
	)
}

function ConfirmationView({ setView }: { setView: (view: View) => void }) {
	return (
		<>
			<Drawer.Header>
				<Drawer.Header.Title
					icon={<IconCircleDollarOutFillDuo18 className="size-10 text-success" />}
				>
					Redeeming
				</Drawer.Header.Title>
			</Drawer.Header>
			<Drawer.Content>
				<KeyValueList
					items={[
						{ key: "Wine Store Ltda", value: "R$80.00" },
						{ key: "Balance", value: "R$100.00" },
						{
							key: "Balance after redemption",
							value: <span className="text-success">R$20.00</span>,
							dividerBefore: true,
						},
					]}
				/>
			</Drawer.Content>
			<Drawer.Footer>
				<ConfirmButton>Hold to redeem</ConfirmButton>
			</Drawer.Footer>
		</>
	)
}

function TopupView({ setView }: { setView: (view: View) => void }) {
	return (
		<>
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
				<Button>Proceed</Button>
			</Drawer.Footer>
		</>
	)
}

function _List() {
	return (
		<ul className="mt-6 space-y-4 border-t border-[#F5F5F5] pt-6">
			<li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
				<IconShieldCheckFillDuo18 className="size-6" />
				Keep your Secret Phrase safe
			</li>
			<li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
				<IconMenuFillDuo18 className="size-6" />
				Don’t share it with anyone else
			</li>
			<li className="flex items-center gap-3 text-[15px] font-semibold text-[#999999] md:font-medium">
				<IconBanFillDuo18 className="size-6" />
				If you lose it, we can’t recover it
			</li>
		</ul>
	)
}

export default RedeemDrawer
