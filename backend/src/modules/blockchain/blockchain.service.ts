import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Alchemy, BigNumber, fromHex, Network, OwnedNftsResponse } from 'alchemy-sdk'

import { SCAM_PATTERNS } from './blockchain.constants'
import { TokenBalance } from './blockchain.types'

@Injectable()
export class BlockchainService {
	private readonly client: Alchemy

	constructor(alchemyApiKey: string) {
		this.client = new Alchemy({
			apiKey: alchemyApiKey,
			network: Network.MATIC_MAINNET
		})
	}

	private isValidToken(token: TokenBalance): boolean {
		if (!token.name || !token.symbol) return false

		if (
			SCAM_PATTERNS.some(
				(regex) =>
					(token.symbol && regex.test(token.symbol)) ||
					(token.name && regex.test(token.name))
			)
		)
			return false

		if (token.symbol.length > 15 || /\s{2,}/.test(token.symbol)) return false

		if (!token.decimals || token.decimals > 18) return false

		return true
	}

	private formatTokenBalance(
		balance: string | BigNumber | null,
		decimals: number | null
	): string {
		if (!balance || decimals === null) return '0'

		const balanceNumber = typeof balance === 'string' ? fromHex(balance) : balance
		return (parseFloat(balanceNumber.toString()) / Math.pow(10, decimals)).toFixed(decimals)
	}

	public async getTokenBalances(walletAddress: string): Promise<TokenBalance[]> {
		try {
			const nativeBalanceHex = await this.client.core.getBalance(walletAddress)
			const nativeBalance = this.formatTokenBalance(nativeBalanceHex, 18)
			const nativePriceData = await this.client.prices.getTokenPriceBySymbol(['POL'])
			const nativeTokenBalance: TokenBalance = {
				contractAddress: '0x0000000000000000000000000000000000000000',
				tokenBalance: nativeBalance,
				name: 'Polygon Ecosystem Token',
				symbol: 'POL',
				decimals: 18,
				logo: 'https://assets.polygon.technology/tokenAssets/pol.png',
				priceUsd: +nativePriceData.data[0].prices[0].value
			}

			const tokenBalances = await this.client.core.getTokenBalances(walletAddress)

			if (!tokenBalances.tokenBalances.length) return []

			const enrichedBalances = await Promise.all(
				tokenBalances.tokenBalances.map(async (token) => {
					const metadata = await this.client.core.getTokenMetadata(token.contractAddress)

					return {
						contractAddress: token.contractAddress,
						tokenBalance: token.tokenBalance,
						name: metadata.name,
						symbol: metadata.symbol,
						decimals: metadata.decimals,
						logo: metadata.logo
					}
				})
			)

			const filteredBalances = enrichedBalances.filter(this.isValidToken)

			const symbols = filteredBalances
				.map((token) => token.symbol)
				.filter((symbol): symbol is string => Boolean(symbol))

			const prices = await this.client.prices.getTokenPriceBySymbol(symbols)

			return [
				nativeTokenBalance,
				...filteredBalances.map((token) => ({
					...token,
					tokenBalance: this.formatTokenBalance(token.tokenBalance, token.decimals),
					priceUsd: token.symbol ? (prices[token.symbol]?.value ?? null) : null
				}))
			]
		} catch (error) {
			console.error('Error in getTokenBalances:', error)
			throw new HttpException(
				{
					message: 'Failed to fetch token balances for wallet address',
					error: error.message || error
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	public async getNFTs(walletAddress: string): Promise<OwnedNftsResponse['ownedNfts']> {
		try {
			const nfts = await this.client.nft.getNftsForOwner(walletAddress)
			return nfts.ownedNfts
		} catch (error) {
			console.error('Error in getNFTs:', error)
			throw new HttpException(
				{
					message: 'Failed to fetch NFTs for wallet address',
					error: error.message || error
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}
}
