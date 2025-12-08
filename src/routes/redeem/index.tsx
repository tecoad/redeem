import { createFileRoute, useRouter } from "@tanstack/react-router"
import { motion, useAnimation } from "motion/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/Button"
import HowToDrawer from "@/components/Drawers/HowToDrawer"
import Giftcard from "@/components/Giftcard"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/redeem/")({
	component: RouteComponent,
})

function RouteComponent() {
	const router = useRouter()
	const [drawerOpen, setDrawerOpen] = useState(false)
	const hashControls = useAnimation()
	const expirationControls = useAnimation()
	const balanceControls = useAnimation()
	const cardControls = useAnimation()
	const footerControls = useAnimation()

	useEffect(() => {
		async function run() {
			await hashControls.start("initial")
			await new Promise(r => setTimeout(r, 100))
			await hashControls.start("visible")
			await new Promise(r => setTimeout(r, 1000))
			await hashControls.start("hashed")
			await new Promise(r => setTimeout(r, 500))
			balanceControls.start("visible")
			await new Promise(r => setTimeout(r, 200))
			expirationControls.start("final")
			cardControls.start("top")
		}
		run()
	}, [hashControls.start, expirationControls.start, balanceControls.start, cardControls.start])

	return (
		<>
			<div className="w-full h-full">
				<Layout className="gap-0">
					<div className="w-full h-full relative">
						<motion.div
							className="absolute w-full"
							animate={cardControls}
							initial="centered"
							variants={{
								centered: {
									top: "50%",
									translateY: "-50%",
								},
								top: {
									top: "0%",
									translateY: "0%",
								},
							}}
							transition={{
								duration: 0.2,
								type: "spring",
								stiffness: 100,
								damping: 10,
							}}
						>
							<Giftcard>
								<Giftcard.ContentWrapper>
									<div className="flex w-full justify-between">
										<Giftcard.MerchantLogo className="flex-1 " />

										<div className="flex items-center self-start overflow-hidden mix-blend-screen ">
											<motion.div
												variants={{
													visible: {
														translateY: "0%",
													},
													initial: {
														translateY: "100%",
													},
												}}
												transition={{
													duration: 0.2,
													type: "spring",
													stiffness: 100,
													damping: 10,
												}}
												animate={balanceControls}
												initial="initial"
											>
												<Giftcard.Balance originalValue={100} availableValue={67} currency="$" />
											</motion.div>
										</div>
									</div>

									<Giftcard.Hashcode
										initial="initial"
										animate={hashControls}
										onHoverStart={() => hashControls.start("visible")}
										onHoverEnd={() => hashControls.start("hashed")}
										className=" pointer-events-auto flex-1 flex items-center justify-center"
									>
										2323 2323 2323 2323 2323
									</Giftcard.Hashcode>

									<div className="flex w-full items-end justify-between relative flex-1">
										<Giftcard.Logo className="self-end" />

										<Giftcard.Expiration initial="initial" animate={expirationControls}>
											{(() => {
												const date = new Date()
												date.setMonth(date.getMonth() + 6)
												const month = String(date.getMonth() + 1).padStart(2, "0")
												const day = String(date.getDate()).padStart(2, "0")
												const year = date.getFullYear()
												return `${month}/${day}/${year}`
											})()}
										</Giftcard.Expiration>
									</div>
								</Giftcard.ContentWrapper>
							</Giftcard>
						</motion.div>
					</div>

					<Layout.Footer
						as={motion.div}
						variants={{
							hidden: { height: 0 },
							visible: { height: "auto" },
						}}
						animate={footerControls}
					>
						<div className="overflow-hidden w-full flex items-center justify-center flex-col gap-2">
							<Button
								size="medium"
								className="w-auto"
								variant="ghost"
								onClick={() => setDrawerOpen(true)}
							>
								How to redeem?
							</Button>
							<Button onClick={() => router.navigate({ to: "/redeem/initiate" })}>
								Redeem now
							</Button>
						</div>
					</Layout.Footer>
				</Layout>
			</div>
			<HowToDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
		</>
	)
}
