import type { HTMLMotionProps } from "motion/react"
import Giftcard from "./Giftcard"

function DefaultView({ ...props }: HTMLMotionProps<"div">) {
	return (
		<>
			<div className="flex w-full justify-between">
				<Giftcard.MerchantLogo>Merchant logo</Giftcard.MerchantLogo>
				<Giftcard.Hashcode style={{ opacity: 0 }}>Hashcode</Giftcard.Hashcode>
			</div>

			<div className="flex w-full justify-between">
				<Giftcard.Logo>Gifter</Giftcard.Logo>
				<Giftcard.Expiration style={{ opacity: 0 }}>exp 12/12/2025</Giftcard.Expiration>
			</div>

			<Giftcard.Balance style={{ opacity: 0 }}>balance indicator</Giftcard.Balance>
		</>
	)
}

export default DefaultView
