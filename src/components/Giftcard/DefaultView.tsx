import type { HTMLMotionProps } from "motion/react"
import { GifterLogo, WineLogo } from "../Logos"
import Giftcard from "./Giftcard"

function DefaultView({ ...props }: HTMLMotionProps<"div">) {
	return (
		<>
			<div className="flex w-full justify-between">
				<Giftcard.MerchantLogo>
					<WineLogo className="w-24 text-[white]" />
				</Giftcard.MerchantLogo>
				<Giftcard.Hashcode style={{ opacity: 0 }}>Hashcode</Giftcard.Hashcode>
			</div>

			<div className="flex w-full justify-between">
				<Giftcard.Logo>
					<GifterLogo className="w-22 text-[white] opacity-50" />
				</Giftcard.Logo>
				<Giftcard.Expiration style={{ opacity: 0 }}>exp 12/12/2025</Giftcard.Expiration>
			</div>

			<Giftcard.Balance style={{ opacity: 0 }}>balance indicator</Giftcard.Balance>
		</>
	)
}

export default DefaultView
