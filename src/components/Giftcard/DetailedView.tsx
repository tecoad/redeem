import { type HTMLMotionProps, motion } from "motion/react"
import Giftcard from "./Giftcard"

function DetailedView(_: HTMLMotionProps<"div">) {
	return (
		<>
			<div className="relative flex flex-col justify-between h-full bg-[red]">
				<div className="flex w-full justify-between">
					<Giftcard.MerchantLogo>Merchant logo</Giftcard.MerchantLogo>

					<motion.div
						data-hashcode-wrapper
						className="absolute border border-[yellow]! w-full flex justify-end"
						style={{
							top: "50%",
							right: "50%",
							translateY: "-50%",
							translateX: "50%",
						}}
					>
						<Giftcard.Hashcode>2323 2323 2323 2323 2323</Giftcard.Hashcode>
					</motion.div>
				</div>

				<div className="flex w-full justify-between">
					<Giftcard.Logo>Gifter</Giftcard.Logo>

					<Giftcard.Expiration>03/12/2025</Giftcard.Expiration>
				</div>
			</div>

			{/* Balance - starts invisible */}
			<Giftcard.Balance
				style={{
					opacity: 0,
				}}
			>
				balance indicator
			</Giftcard.Balance>
		</>
	)
}

export default DetailedView
