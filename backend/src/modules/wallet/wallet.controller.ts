import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from '../auth'
import { AddressParamDto, GetNftsResponseDto, GetTokenBalancesResponseDto } from './dto'
import { WalletService } from './wallet.service'

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
	constructor(private readonly walletService: WalletService) {}

	@UseGuards(AuthGuard)
	@Get('balances/:address')
	@ApiOperation({
		summary: 'Retrieves balances for a specified wallet address'
	})
	@ApiResponse({
		status: 200,
		description: 'Balances fetched successfully',
		type: [GetTokenBalancesResponseDto]
	})
	@ApiParam({
		name: 'address',
		required: true,
		description: 'Wallet address to query token balances for',
		type: 'string',
		example: '0x5a821936C1a5606d9Bd870507B52B69964f7318b'
	})
	async getTokenBalances(@Param() params: AddressParamDto) {
		return this.walletService.getTokenBalances(params.address)
	}

	@UseGuards(AuthGuard)
	@Get('nfts/:address')
	@ApiOperation({
		summary: 'Retrieves NFTs for a specified wallet address'
	})
	@ApiResponse({
		status: 200,
		description: 'NFTs fetched successfully',
		type: [GetNftsResponseDto]
	})
	@ApiParam({
		name: 'address',
		required: true,
		description: 'Wallet address to query NFTs for',
		type: 'string',
		example: '0x5a821936C1a5606d9Bd870507B52B69964f7318b'
	})
	async getNFTs(@Param() params: AddressParamDto) {
		return this.walletService.getNFTs(params.address)
	}
}
