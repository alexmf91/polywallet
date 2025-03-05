import { PrivateRoutes, PublicRoutes } from '@app/lib/routes'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

import { AppCookies } from './lib/types'

export function middleware(req: NextRequest) {
	const token = req.cookies.get(AppCookies.AUTH_TOKEN)?.value
	const loginRedirectResponse = NextResponse.redirect(new URL(PublicRoutes.SIGN_IN, req.url))

	if (!token && req.nextUrl.pathname.startsWith(PrivateRoutes.DASHBOARD)) {
		console.log('🔴 Token is missing, redirecting to login...')
		return loginRedirectResponse
	}

	if (token) {
		const decoded = jwt.decode(token) as { exp: number } | null
		if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
			console.log('🔴 Token expired, redirecting to login...')
			loginRedirectResponse.cookies.delete(AppCookies.AUTH_TOKEN)
			loginRedirectResponse.cookies.delete(AppCookies.WALLET_ADDRESS)
			loginRedirectResponse.cookies.delete(AppCookies.USERNAME)

			return loginRedirectResponse
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/api/wallet/:path*']
}
