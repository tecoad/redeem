import { useRouter } from "@tanstack/react-router"
import {
	IconBanFillDuo18,
	IconCircleDollarOutFillDuo18,
	IconMenuFillDuo18,
	IconShieldCheckFillDuo18,
} from "nucleo-ui-fill-duo-18"
import { ConfirmButton } from "../ConfirmButton"
import Drawer, { type DrawerProps } from "../Drawer"
import KeyValueList from "../KeyValueList"

function ConfirmationDrawer(props: DrawerProps) {
	const router = useRouter()

	return (
		<Drawer {...props}>
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
				<ConfirmButton onSuccessConfirm={() => router.navigate({ to: "/redeem/result" })}>
					Hold to redeem
				</ConfirmButton>
			</Drawer.Footer>
		</Drawer>
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

export default ConfirmationDrawer
