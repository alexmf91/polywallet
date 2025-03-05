import { env } from '@app/lib/env'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

type Params = {
	params: Promise<{
		walletAddress: string
	}>
}

export async function GET(_req: NextRequest, { params }: Params) {
	const { walletAddress } = await params // Next.js requires to await params https://nextjs.org/docs/messages/sync-dynamic-apis
	const authHeader = (await headers()).get('Authorization')

	if (!authHeader) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const nftsRes = await fetch(`${env.API_URL}/wallet/nfts/${walletAddress}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: authHeader
		}
	})

	if (!nftsRes.ok) {
		return NextResponse.json(
			{ error: "Failed to fetch NFT's balances" },
			{ status: nftsRes.status }
		)
	}

	const nftsJson = await nftsRes.json()

	return NextResponse.json(nftsJson)
}
