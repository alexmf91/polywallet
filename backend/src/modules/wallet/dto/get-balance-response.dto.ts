import { ApiProperty } from '@nestjs/swagger'

export class GetTokenBalancesResponseDto {
	@ApiProperty({
		description: 'Contract address of the token',
		example: '0x514910771AF9Ca656af840dff83E8264EcF986CA'
	})
	contractAddress: string

	@ApiProperty({
		description: 'Token balance of the wallet',
		example: '1000000000000000000',
		nullable: true
	})
	tokenBalance: string | null

	@ApiProperty({
		description: 'Token name',
		example: 'Tokens',
		nullable: true
	})
	name: string | null

	@ApiProperty({
		description: 'Token symbol',
		example: 'LINK',
		nullable: true
	})
	symbol: string | null

	@ApiProperty({
		description: 'Number of decimals the token uses',
		example: 18,
		nullable: true
	})
	decimals: number | null

	@ApiProperty({
		description: 'Logo URL of the token',
		example: 'https://cryptologos.cc/logos/tokens-link-logo.png',
		nullable: true
	})
	logo: string | null

	@ApiProperty({
		description: 'Price of the token in USD',
		example: '10.5',
		nullable: true
	})
	priceUsd: number | null
}
