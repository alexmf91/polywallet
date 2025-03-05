import { getDefaultConfig } from 'connectkit'
import { createConfig, http } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { env } from './env'

export const config = createConfig(
	getDefaultConfig({
		appName: env.APP_NAME,
		appDescription: env.APP_DESCRIPTION,
		appUrl: 'https://polywallet.vercel.app',
		appIcon: 'https://polywallet.vercel.app/polygon-logo.svg',

		walletConnectProjectId: env.WALLETCONNECT_PROJECT_ID || '',
		chains: [polygon],
		transports: {
			[polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${env.ALCHEMY_API_KEY}`)
		},
		ssr: true
	})
)
