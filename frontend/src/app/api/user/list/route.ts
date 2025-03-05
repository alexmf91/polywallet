import { env } from '@app/lib/env'
import { NextResponse } from 'next/server'

export async function GET() {
	const usersRes = await fetch(`${env.API_URL}/user/list`, {
		headers: {
			'Content-Type': 'application/json'
		}
	})

	if (!usersRes.ok) {
		return NextResponse.json(
			{ error: 'Failed to fetch Users list' },
			{ status: usersRes.status }
		)
	}

	const usersJson = await usersRes.json()

	return NextResponse.json(usersJson)
}
