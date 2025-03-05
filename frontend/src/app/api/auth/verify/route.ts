import { NextResponse } from 'next/server'

import { env } from '@app/lib/env'

export async function POST(req: Request) {
	const { token } = await req.json()

	const verifyTokenRes = await fetch(`${env.API_URL}/auth/verify`, {
		method: 'POST',
		body: JSON.stringify({ token }),
		headers: { 'Content-Type': 'application/json' }
	})

	const data = await verifyTokenRes.json()

	return NextResponse.json(data)
}
