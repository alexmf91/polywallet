import { OwnedNft } from 'alchemy-sdk'

import { env } from './env'
import { ApiErrors, TokenBalance, User } from './types'

export class ApiError extends Error {
	constructor(
		public code: string,
		public message: string,
		public status: number
	) {
		super(message)
		this.name = 'ApiError'
	}
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
	try {
		const res = await fetch(`${env.APP_URL}${endpoint}`, {
			...options,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				...(options.headers || {})
			}
		})

		const data = await res.json()

		if (!res.ok) {
			throw new ApiError(
				data.error || ApiErrors.UNKNOWN_ERROR,
				data.message || 'Something went wrong',
				res.status
			)
		}

		return data
	} catch (error) {
		console.error('API Error:', error)
		throw error instanceof ApiError
			? error
			: new ApiError(ApiErrors.NETWORK_ERROR, 'Failed to connect to server', 0)
	}
}

export const api = {
	// USER
	async genRegisterUserChallenge(walletAddress: string) {
		return fetchApi('/api/user/register/challenge', {
			method: 'POST',
			body: JSON.stringify({ walletAddress })
		})
	},

	async registerUser(walletAddress: string, username: string, signature: string) {
		return fetchApi('/api/user/register', {
			method: 'POST',
			body: JSON.stringify({ walletAddress, username, signature })
		})
	},

	async getAllUsers(): Promise<User[]> {
		return fetchApi('/api/user/list')
	},

	// AUTH
	async genLoginChallenge(walletAddress: string) {
		return fetchApi('/api/auth/challenge', {
			method: 'POST',
			body: JSON.stringify({ walletAddress })
		})
	},

	async login(walletAddress: string, signature: string) {
		return fetchApi('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({ walletAddress, signature })
		})
	},

	async verifyToken(token: string): Promise<{ valid: boolean }> {
		return fetchApi('/api/auth/verify', {
			method: 'POST',
			body: JSON.stringify({ token })
		})
	},

	// WALLET
	async getBalances(walletAddress: string, token: string): Promise<TokenBalance[]> {
		return fetchApi(`/api/wallet/balances/${walletAddress}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	},

	async getNFTs(walletAddress: string, token: string): Promise<OwnedNft[]> {
		return fetchApi(`/api/wallet/nfts/${walletAddress}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}
}
