import { Injectable } from '@nestjs/common'
import { BlockchainService } from 'src/modules/blockchain'

@Injectable()
export class WalletService {
	constructor(private readonly blockchainService: BlockchainService) {}

	getTokenBalances(address: string) {
		return this.blockchainService.getTokenBalances(address)
	}

	getNFTs(address: string) {
		return this.blockchainService.getNFTs(address)
	}
}
