import { createFileRoute, useRouter } from "@tanstack/react-router"
import { MotionConfig, motion, useAnimation } from "motion/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/Buttons/Button"
import HowToDrawer from "@/components/Drawers/HowToDrawer"
import Giftcard from "@/components/Giftcard"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/_app/redeem/")({
	component: RouteComponent,
})

function RouteComponent() {
	const router = useRouter()
	const [drawerOpen, setDrawerOpen] = useState(false)
	const hashControls = useAnimation()
	const expirationControls = useAnimation()
	const balanceControls = useAnimation()
	const footerControls = useAnimation()

	useEffect(() => {
		async function run() {
			await hashControls.start("initial")
			await new Promise(r => setTimeout(r, 50))
			await hashControls.start("visible")
			await new Promise(r => setTimeout(r, 200))
			await hashControls.start("hashed")
			await new Promise(r => setTimeout(r, 150))
			balanceControls.start("visible")
			await new Promise(r => setTimeout(r, 50))
			expirationControls.start("visible")
		}
		run()
	}, [hashControls.start, expirationControls.start, balanceControls.start])

	return (
		<>
			<div className="w-full h-full">
				<Layout className="gap-0">
					<div className="w-full h-full relative">
						<motion.div className="absolute w-full top-1/2 -translate-y-1/2">
							<Giftcard>
								<Giftcard.ContentWrapper>
									<div className="flex w-full justify-between flex-1">
										<Giftcard.MerchantLogo className="flex-1 " />

										<Giftcard.Logo />
									</div>

									<div className="flex gap-8 flex-1">
										<MotionConfig
											transition={{
												type: "spring",
												stiffness: 200,
												damping: 20,
											}}
										>
											<div className="flex items-center self-start overflow-hidden">
												<Giftcard.Balance
													initial="hidden"
													animate={balanceControls}
													originalValue={100}
													availableValue={67}
													currency="$"
												/>
											</div>

											<Giftcard.Expiration initial="hidden" animate={expirationControls}>
												{(() => {
													const date = new Date()
													date.setMonth(date.getMonth() + 6)
													const month = String(date.getMonth() + 1).padStart(2, "0")
													const day = String(date.getDate()).padStart(2, "0")
													const year = date.getFullYear()
													return `${month}/${day}/${year}`
												})()}
											</Giftcard.Expiration>
										</MotionConfig>
									</div>

									<div className="flex w-full items-end justify-between relative flex-1">
										<Giftcard.Hashcode
											initial="initial"
											animate={hashControls}
											onHoverStart={() => hashControls.start("visible")}
											onHoverEnd={() => hashControls.start("hashed")}
											className=" pointer-events-auto"
										>
											4821 9374 1203 6682 5517
										</Giftcard.Hashcode>
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
								as={motion.button}
								exit={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.3,
									ease: "easeInOut",
								}}
								variant="ghost"
								className="w-auto"
								onClick={() => setDrawerOpen(true)}
							>
								How to redeem?
							</Button>
							<Button
								className="w-full"
								size="lg"
								onClick={() => router.navigate({ to: "/redeem/initiate", viewTransition: true })}
							>
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
