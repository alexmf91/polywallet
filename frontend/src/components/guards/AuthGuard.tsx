'use client'

import { useAuth } from '@app/contexts'
import { PrivateRoutes, PublicRoutes } from '@app/lib/routes'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface GuardProps {
	children: React.ReactNode
}

const isRoutePrivate = (pathname: string): boolean => {
	const privatePaths: string[] = Object.values(PrivateRoutes)
	return privatePaths.includes(pathname)
}

export default function AuthGuard({ children }: GuardProps) {
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		if (!isAuthenticated && isRoutePrivate(pathname)) {
			console.error('[AuthGuard]: User is not authenticated, redirecting to login...')
			router.push(PublicRoutes.HOME)
		}
	}, [isAuthenticated, pathname, router])

	return <>{children}</>
}
