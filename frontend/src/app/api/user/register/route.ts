import { env } from '@app/lib/env'
import { AppCookies } from '@app/lib/types'
import { NextResponse } from 'next/server'

const COOKIE_EXPIRATION_MS = 60 * 60 * 1000 // 1 hour in milliseconds

export async function POST(req: Request) {
	const { walletAddress, username, signature } = await req.json()

	const registerRes = await fetch(`${env.API_URL}/user/register`, {
		method: 'POST',
		body: JSON.stringify({ walletAddress, username, signature }),
		headers: { 'Content-Type': 'application/json' }
	})

	const data = await registerRes.json()

	if (!registerRes.ok) return NextResponse.json(data)

	const cookiesConfig = {
		httpOnly: process.env.NODE_ENV === 'production',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: COOKIE_EXPIRATION_MS,
		expires: new Date(Date.now() + COOKIE_EXPIRATION_MS)
	}

	const response = NextResponse.json({ success: true })

	response.cookies.set(AppCookies.AUTH_TOKEN, data.token, cookiesConfig)
	response.cookies.set(AppCookies.WALLET_ADDRESS, walletAddress, cookiesConfig)
	response.cookies.set(AppCookies.USERNAME, walletAddress, cookiesConfig)

	return response
}
