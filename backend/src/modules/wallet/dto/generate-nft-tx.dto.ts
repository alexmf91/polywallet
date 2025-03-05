import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString, Matches, IsEthereumAddress } from 'class-validator'

export class GenerateNftTxDto {
	@ApiProperty({
		description: 'Recipient wallet address or username',
		example: '0xRecipientWalletOrUsername'
	})
	@IsString()
	@IsNotEmpty()
	recipient: string

	@ApiProperty({
		description: 'Contract address of the NFT',
		example: '0xContractAddress'
	})
	@IsString()
	@IsNotEmpty()
	@IsEthereumAddress()
	contractAddress: string

	@ApiProperty({
		description: 'Token ID of the NFT',
		example: '123'
	})
	@IsString()
	@IsNotEmpty()
	tokenId: string

	@ApiProperty({
		description: 'Token type (ERC721 or ERC1155)',
		example: 'ERC721'
	})
	@IsEnum(['ERC721', 'ERC1155'])
	tokenType: 'ERC721' | 'ERC1155'
}
