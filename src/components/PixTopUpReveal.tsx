import { Button } from "./Button"
import Giftcard from "./Giftcard"

const PixTopUpReveal = () => {
	return (
		<div className="flex flex-col gap-8 w-full items-center justify-center">
			<Giftcard view="flipped" />
			<Button variant="ghost" className="w-auto">
				Read qrcode
			</Button>
		</div>
	)
}

export default PixTopUpReveal
