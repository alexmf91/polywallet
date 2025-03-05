import { ApiProperty } from '@nestjs/swagger'
import { IsEthereumAddress, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
	@ApiProperty({ description: 'Ethereum wallet address', example: '0xabc123...xyz' })
	@IsString()
	@IsNotEmpty()
	@IsEthereumAddress()
	walletAddress: string

	@ApiProperty({ description: 'EIP-4361 signature message', example: 'Signed message content' })
	@IsString()
	@IsNotEmpty()
	signature: string
}
