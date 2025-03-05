import { Test, TestingModule } from '@nestjs/testing'
import { WalletService } from './wallet.service'
import { BlockchainService } from '../blockchain'

describe('WalletService', () => {
	let service: WalletService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WalletService,
				{
					provide: BlockchainService,
					useValue: {
						getTokenBalances: jest.fn(),
						getNFTs: jest.fn()
					}
				}
			]
		}).compile()

		service = module.get<WalletService>(WalletService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
