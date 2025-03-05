import { Button } from '@app/components/ui'
import { PublicRoutes } from '@app/lib/routes'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="flex h-full flex-col items-center justify-center p-4">
			<h1 className="mb-4 text-4xl font-bold md:text-6xl">404 - Page Not Found</h1>
			<p className="mb-8 text-lg md:text-xl">
				Oops! We couldn&apos;t find the page you&apos;re looking for.
			</p>
			<Link href={PublicRoutes.HOME} legacyBehavior passHref>
				<Button asChild>
					<a>Back to Home</a>
				</Button>
			</Link>
		</div>
	)
}
