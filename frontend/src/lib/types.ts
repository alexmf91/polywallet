export enum ApiErrors {
	UNKNOWN_ERROR = 'UNKNOWN_ERROR',
	NETWORK_ERROR = 'NETWORK_ERROR',
	USER_NOT_REGISTERED = 'USER_NOT_REGISTERED',
	USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS',
	INVALID_SIGNATURE = 'INVALID_SIGNATURE',
	NONCE_EXPIRED_OR_NOT_FOUND = 'NONCE_EXPIRED_OR_NOT_FOUND'
}

export enum AppCookies {
	AUTH_TOKEN = 'pw_token',
	WALLET_ADDRESS = 'pw_wallet_address',
	USERNAME = 'pw_username'
}

export interface User {
	walletAddress: string
	username: string | null
}

export interface RegisterUser extends User {
	signature: string
}

export interface TokenBalance {
	contractAddress: string
	tokenBalance: string | null
	name: string | null
	symbol: string | null
	decimals: number | null
	logo: string | null
	priceUsd: number | null
}

export interface GenerateNftTxDto {
	recipient: string
	contractAddress: string
	tokenId: string
	tokenType: 'ERC721' | 'ERC1155'
}
