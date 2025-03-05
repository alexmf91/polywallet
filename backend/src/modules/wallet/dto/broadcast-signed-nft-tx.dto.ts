import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class BroadcastSignedNftTxDto {
	@ApiProperty({
		description: 'Signed transaction hex string',
		example: '0xf86b8084...'
	})
	@IsString()
	@IsNotEmpty()
	signedTransaction: string
}
