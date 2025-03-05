'use client'

import { Button } from '@app/components/ui'
import { PublicRoutes } from '@app/lib/routes'
import Link from 'next/link'

export default function HomePage() {
	return (
		<div className="relative isolate px-6 pt-14 lg:px-8">
			<div className="mx-auto max-w-2xl pt-10">
				<div className="text-center">
					<h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
						Welcome to Polywallet
					</h1>
					<p className="mt-8 text-lg font-medium text-gray-500">
						Sign In to navigate the innovative features of Polywallet and unlock the
						decentralized future.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link href={PublicRoutes.SIGN_IN} legacyBehavior passHref>
							<Button variant="secondary" size="lg">
								Sign In
							</Button>
						</Link>
						<Link href={PublicRoutes.SIGN_UP} legacyBehavior passHref>
							<Button variant="outline" size="lg">
								Sign Up
							</Button>
						</Link>
					</div>
				</div>
			</div>
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
					}}
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
				/>
			</div>
		</div>
	)
}
