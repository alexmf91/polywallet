import { env } from '@app/lib/env'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const { walletAddress } = await req.json()

	const challengeRes = await fetch(`${env.API_URL}/auth/challenge`, {
		method: 'POST',
		body: JSON.stringify({ walletAddress }),
		headers: { 'Content-Type': 'application/json' }
	})

	const challengeJson = await challengeRes.json()

	return NextResponse.json(challengeJson)
}
