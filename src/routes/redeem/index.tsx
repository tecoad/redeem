import { createFileRoute, useRouter } from "@tanstack/react-router"
import { motion, stagger, useAnimate } from "motion/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/Button"
import HowToDrawer from "@/components/Drawers/HowToDrawer"
import Giftcard from "@/components/Giftcard/Giftcard"
import Layout from "@/components/Layout"

export const Route = createFileRoute("/redeem/")({
	component: RouteComponent,
})

function RouteComponent() {
	const router = useRouter()
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [scope, animate] = useAnimate()

	useEffect(() => {
		// Espera as fontes carregarem e o DOM estar pronto
		animate([
			// 1. empty → real (TODOS revelam o valor)
			["[data-hashcode-empty]", { translateY: "-100%" }, { delay: stagger(0.04), at: 0.3 }],
			["[data-hashcode-real]", { translateY: "0%" }, { delay: stagger(0.04), at: 0.3 }],
			["[data-hashcode-masked]", { translateY: "100%" }, { delay: stagger(0.04), at: 0.3 }],

			// 2. real → masked (apenas 4 PRIMEIROS)
			[
				"[data-hashcode-part]:nth-child(-n+4) [data-hashcode-real]",
				{ translateY: "-100%" },
				{ delay: stagger(0.05), at: 2.5 },
			],
			[
				"[data-hashcode-part]:nth-child(-n+4) [data-hashcode-masked]",
				{ translateY: "0%" },
				{ delay: stagger(0.05), at: 2.5 },
			],

			// 3. masked → empty (apenas 3 PRIMEIROS)
			[
				"[data-hashcode-part]:nth-child(-n+3) [data-hashcode-masked]",
				{ translateY: "-100%" },
				{ delay: stagger(0.08), at: 4.5 },
			],
			[
				"[data-hashcode-part]:nth-child(-n+3) [data-hashcode-empty]",
				{ translateY: "0%" },
				{ delay: stagger(0.08), at: 4.5 },
			],

			["[data-expiration]", { translateY: "0%" }, { at: 4.75 }],
			[
				"[data-hashcode-wrapper]",
				{ top: "0%", translateY: "0%" },
				{ at: 4.75, type: "spring", stiffness: 200, damping: 20 },
			],
			[
				"[data-card-wrapper]",
				{ top: "0%", translateY: "0%" },
				{ at: 4.95, type: "spring", stiffness: 200, damping: 20 },
			],
			[
				"[data-footer]",
				{ height: [0, "auto"] },
				{ at: 5.1, type: "spring", stiffness: 200, damping: 20 },
			],
		])
	}, [animate])

	return (
		<>
			<div ref={scope} className="w-full h-full">
				<Layout className="gap-0">
					<div className="w-full h-full relative">
						<motion.div
							data-card-wrapper
							className="absolute w-full"
							style={{
								top: "50%",
								translateY: "-50%",
							}}
						>
							<Giftcard>
								<div className="flex w-full justify-between">
									<Giftcard.MerchantLogo />

									<motion.div
										data-hashcode-wrapper
										className="absolute  w-full flex justify-end"
										style={{
											top: "50%",
											right: "50%",
											translateY: "-50%",
											translateX: "50%",
										}}
									>
										<Giftcard.Hashcode className="font-mono text-[#fafafa] text-lg">
											2323 2323 2323 2323 2323
										</Giftcard.Hashcode>
									</motion.div>
								</div>

								<div className="flex w-full justify-between">
									<Giftcard.Logo />

									<Giftcard.Expiration>03/12/2025</Giftcard.Expiration>
								</div>

								{/* Balance - starts invisible */}
								<Giftcard.Balance
									style={{
										opacity: 0,
									}}
								>
									balance indicator
								</Giftcard.Balance>
							</Giftcard>
						</motion.div>
					</div>

					<Layout.Footer
						as={motion.div}
						initial={{ height: 0 }}
						animate={{ height: "auto" }}
						transition={{ delay: 5.1, duration: 0.3 }}
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
