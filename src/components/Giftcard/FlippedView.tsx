import Giftcard from "./Giftcard"

function FlippedView() {
	return (
		<>
			<div className="flex w-full justify-between">
				<Giftcard.MerchantLogo style={{ opacity: 0 }}>Merchant logo</Giftcard.MerchantLogo>
				<Giftcard.Hashcode style={{ opacity: 0 }}>Hashcode</Giftcard.Hashcode>
			</div>

			<div className="flex w-full justify-between">
				<Giftcard.Logo style={{ opacity: 0 }}>Gifter</Giftcard.Logo>
				<Giftcard.Expiration style={{ opacity: 0 }}>exp 12/12/2025</Giftcard.Expiration>
			</div>

			<Giftcard.Balance style={{ opacity: 0 }}>balance indicator</Giftcard.Balance>
		</>
	)
}

export default FlippedView
