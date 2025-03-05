import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty } from 'class-validator'

export class VerifyTokenResponseDto {
	@ApiProperty({ description: 'Indicates whether the token is valid', example: true })
	@IsBoolean()
	@IsNotEmpty()
	valid: boolean
}
