import { createFileRoute } from "@tanstack/react-router"
import { motion } from "motion/react"
import { IconPaperPlane2FillDuo18 } from "nucleo-ui-fill-duo-18"
import { useState } from "react"
import { Button } from "@/components/Buttons/Button"
import { CheckIcon } from "@/components/CheckIcon"
import SendReceiptDrawer from "@/components/Drawers/SendReceiptDrawer"
import Heading from "@/components/Heading"
import KeyValueList from "@/components/KeyValueList"
import Layout from "@/components/Layout"
import { TextScramble } from "@/components/TextScramble"
import { subtitleMotionConfig, titleMotionConfig } from "@/lib/motionConfigs"

export const Route = createFileRoute("/_app/redeem/result")({
	component: RouteComponent,
})

function RouteComponent() {
	const [drawerOpen, setDrawerOpen] = useState(false)
	return (
		<>
			<Layout>
				<Heading className="mt-15">
					<motion.div
						initial={{ opacity: 0, translateY: 100, filter: "blur(6px)", rotate: 30 }}
						animate={{ opacity: 1, translateY: 0, filter: "blur(0px)", scale: 1, rotate: 0 }}
						transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
					>
						<CheckIcon className="size-16 mb-2 -ml-2 text-success" />
					</motion.div>
					<Heading.Title as={motion.h1} {...titleMotionConfig}>
						Done
					</Heading.Title>
					<Heading.Subtitle as={motion.h2} {...subtitleMotionConfig}>
						Here is your receipt
					</Heading.Subtitle>
				</Heading>
				<motion.div
					initial={{ opacity: 0, translateY: 30, filter: "blur(6px)", rotate: 0 }}
					animate={{ opacity: 1, translateY: 0, filter: "blur(0px)", scale: 1, rotate: 0 }}
					transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
					className="w-full p-4 bg-muted rounded-xl shadow-inner"
				>
					<KeyValueList
						items={[
							{ key: "Transaction ID", value: "1234567890" },
							{ key: "Amount", value: <span className="strong">R$100.00</span> },
							{ key: "Date", value: "2021-01-01" },
							{ key: "Time", value: "10:00" },
						]}
					/>
				</motion.div>
				<motion.div
					initial={{
						opacity: 0,
						translateY: 10,
						filter: "blur(3px)",
						rotate: 0,
					}}
					animate={{
						opacity: 1,
						translateY: 0,
						filter: "blur(0px)",
						rotate: 0,
					}}
					transition={{
						ease: "easeInOut",
						duration: 0.3,
						delay: 0.6,
					}}
					className=" break-all  px-4 mt-4"
				>
					<div className="text-muted-foreground text-sm">Authorization code</div>
					<div className="font-mono text-lg">
						<TextScramble duration={1.5}>F646B96B450AA8A4D79A84A3FD34EC20EE5520</TextScramble>
					</div>
				</motion.div>
				<Layout.Footer>
					<Button size="lg" onClick={() => setDrawerOpen(true)}>
						<IconPaperPlane2FillDuo18 /> Send to my email
					</Button>
				</Layout.Footer>
			</Layout>
			{/* <HowToDrawer open={drawerOpen} onOpenChange={setDrawerOpen} /> */}
			<SendReceiptDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
		</>
	)
}
