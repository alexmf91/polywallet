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

	const balanceRes = await fetch(`${env.API_URL}/wallet/balances/${walletAddress}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: authHeader
		}
	})

	if (!balanceRes.ok) {
		return NextResponse.json(
			{ error: 'Failed to fetch token balances' },
			{ status: balanceRes.status }
		)
	}

	const balancesJson = await balanceRes.json()

	return NextResponse.json(balancesJson)
}
