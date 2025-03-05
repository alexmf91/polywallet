import { ApiProperty } from '@nestjs/swagger'

export class LoginResponseDto {
	@ApiProperty({ description: 'JWT token for authentication', example: 'eyJhbGciOiJI...' })
	token: string

	@ApiProperty({ description: 'Wallet address of the user', example: '0xabc123...xyz' })
	walletAddress: string

	@ApiProperty({ description: 'Username of the user', example: 'john_doe', nullable: true })
	username: string | null
}
