export type EnvVars = {
	APP_NAME: string
	APP_DESCRIPTION: string
	APP_URL: string
	WALLETCONNECT_PROJECT_ID: string
	ALCHEMY_API_KEY: string
	API_URL: string
}

export const env: EnvVars = {
	APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Web3 Wallet',
	APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
	APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
	ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
	API_URL: process.env.NEXT_PUBLIC_API_URL
} as const
