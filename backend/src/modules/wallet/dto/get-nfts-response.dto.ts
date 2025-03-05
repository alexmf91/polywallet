import { ApiProperty } from '@nestjs/swagger'

export class NftContractForNftDto {
	@ApiProperty({
		description: 'The NFT contract address',
		example: '0x1234567890abcdef1234567890abcdef12345678'
	})
	address: string
}

export class NftImageDto {
	@ApiProperty({
		description: 'URL of the NFT image',
		example: 'https://example.com/nft-image.png',
		nullable: true
	})
	url: string | null
}

export class NftRawMetadataDto {
	@ApiProperty({
		description: 'Raw metadata for the NFT',
		example: {
			attributes: [
				{ trait_type: 'Background', value: 'Blue' },
				{ trait_type: 'Eyes', value: 'Laser' }
			]
		},
		nullable: true
	})
	metadata: Record<string, any> | null
}

export class GetNftsResponseDto {
	@ApiProperty({
		description: 'The NFT contract details',
		type: NftContractForNftDto
	})
	contract: NftContractForNftDto

	@ApiProperty({
		description: 'The NFT token ID as an integer string',
		example: '12345'
	})
	tokenId: string

	@ApiProperty({
		description: 'The type of NFT',
		example: 'ERC721'
	})
	tokenType: string

	@ApiProperty({
		description: 'The NFT name',
		example: 'CryptoPunk #123',
		nullable: true
	})
	name: string | null

	@ApiProperty({
		description: 'The NFT description',
		example: 'A rare CryptoPunk with sunglasses',
		nullable: true
	})
	description: string | null

	@ApiProperty({
		description: 'Media URLs and information for the NFT',
		type: NftImageDto
	})
	image: NftImageDto

	@ApiProperty({
		description: 'The raw metadata for the NFT',
		type: NftRawMetadataDto
	})
	raw: NftRawMetadataDto

	@ApiProperty({
		description: 'Metadata URI of the NFT',
		example: 'https://example.com/nft-metadata.json',
		nullable: true
	})
	tokenUri: string | null

	@ApiProperty({
		description: 'Timestamp when the NFT was last updated in the blockchain (ISO-8601 format)',
		example: '2023-01-01T12:00:00Z'
	})
	timeLastUpdated: string

	@ApiProperty({
		description: 'Time at which the NFT was most recently acquired by the user',
		example: '2023-01-01T12:00:00Z',
		nullable: true
	})
	acquiredAt: string | null

	@ApiProperty({
		description: 'Collection metadata for the NFT, if available',
		example: {
			name: 'Bored Ape Yacht Club',
			slug: 'bored-ape-yacht-club'
		},
		nullable: true
	})
	collection: Record<string, any> | null

	@ApiProperty({
		description: 'Mint information for the NFT',
		example: {
			minter: '0x1234567890abcdef1234567890abcdef12345678',
			transactionHash: '0xabcdefabcdefabcdefabcdefabcdefabcdef'
		},
		nullable: true
	})
	mint: Record<string, any> | null

	@ApiProperty({
		description: 'The token balance of the NFT',
		example: '1'
	})
	balance: string
}
