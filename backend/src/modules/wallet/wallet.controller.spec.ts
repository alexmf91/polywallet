import { Test, TestingModule } from '@nestjs/testing'
import { NftTokenType } from 'alchemy-sdk'

import { WalletController } from './wallet.controller'
import { WalletService } from './wallet.service'
import { AuthGuard } from '../auth'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

describe('WalletController', () => {
	let controller: WalletController
	let service: WalletService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WalletController],
			providers: [
				{
					provide: AuthGuard,
					useValue: {
						canActivate: jest.fn().mockReturnValue(true)
					}
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn()
					}
				},
				{
					provide: JwtService,
					useValue: {
						sign: jest.fn(),
						verify: jest.fn()
					}
				},
				{
					provide: WalletService,
					useValue: {
						getTokenBalances: jest.fn(),
						getNFTs: jest.fn()
					}
				}
			]
		}).compile()

		controller = module.get<WalletController>(WalletController)
		service = module.get<WalletService>(WalletService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	describe('getTokenBalances', () => {
		it('should return address token balances', async () => {
			const address = '0xTEST'
			const expected = [
				{
					contractAddress: '0xTESTNFT',
					decimals: 18,
					name: 'Test Token',
					symbol: 'TEST',
					logo: 'https://test.com/logo.png',
					priceUsd: 2,
					tokenBalance: '100000000000000000'
				}
			]
			jest.spyOn(service, 'getTokenBalances').mockResolvedValue(expected)

			const result = await controller.getTokenBalances({ address })

			expect(result).toEqual(expected)
			expect(service.getTokenBalances).toHaveBeenCalledWith(address)
		})
	})

	describe('getNFTs', () => {
		it('should return address NFTs', async () => {
			const address = '0xTEST'
			const expected = [
				{
					balance: '1000',
					contract: {
						address: '0xTESTNFT',
						openSeaMetadata: {
							lastIngestedAt: '19/11/2021'
						},
						spamClassifications: [],
						tokenType: NftTokenType.ERC721
					},
					image: {},
					raw: {
						metadata: {}
					},
					timeLastUpdated: '19/11/2021',
					tokenId: '1',
					tokenType: NftTokenType.ERC721
				}
			]
			jest.spyOn(service, 'getNFTs').mockResolvedValue(expected)

			const result = await controller.getNFTs({ address })

			expect(result).toEqual(expected)
		})
	})
})
