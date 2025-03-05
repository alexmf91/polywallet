import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'static.alchemyapi.io'
			},
			{
				protocol: 'https',
				hostname: 'assets.polygon.technology'
			},
			{
				protocol: 'https',
				hostname: 'nft-cdn.alchemy.com'
			},
			{
				protocol: 'https',
				hostname: 'ipfs.io'
			}
		]
	}
}

export default nextConfig
