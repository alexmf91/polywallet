import { ApiProperty } from '@nestjs/swagger'
import { IsEthereumAddress, IsNotEmpty, IsString } from 'class-validator'

export class RegisterUserChallengeDto {
	@ApiProperty({ description: 'Ethereum wallet address', example: '0xabc123...xyz' })
	@IsString()
	@IsNotEmpty()
	@IsEthereumAddress()
	walletAddress: string
}
