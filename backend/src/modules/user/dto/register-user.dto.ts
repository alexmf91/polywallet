import { ApiProperty } from '@nestjs/swagger'
import { IsEthereumAddress, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class RegisterUserDto {
	@ApiProperty({ description: 'Ethereum wallet address', example: '0xabc123...xyz' })
	@IsString()
	@IsNotEmpty()
	@IsEthereumAddress()
	walletAddress: string

	@ApiProperty({
		description: 'Unique username for the user',
		example: 'insomnia',
		nullable: true
	})
	@IsOptional()
	@IsString()
	username?: string

	@ApiProperty({
		description: 'EIP-4361 signature proving ownership',
		example: 'Signed message content'
	})
	@IsString()
	@IsNotEmpty()
	signature: string
}
