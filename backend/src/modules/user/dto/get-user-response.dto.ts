import { ApiProperty } from '@nestjs/swagger'

export class GetUserResponseDto {
	@ApiProperty({ description: 'Wallet address of the user', example: '0xabc123...xyz' })
	walletAddress: string

	@ApiProperty({ description: 'Username of the user', example: 'john_doe', nullable: true })
	username: string | null
}
