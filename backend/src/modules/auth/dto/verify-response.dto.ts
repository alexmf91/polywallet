import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class VerifyTokenDto {
	@ApiProperty({ description: 'JWT token for authentication', example: 'eyJhbGciOiJI...' })
	@IsString()
	@IsNotEmpty()
	token: string
}
