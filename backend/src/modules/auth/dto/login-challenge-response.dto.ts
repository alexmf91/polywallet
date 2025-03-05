import { ApiProperty } from '@nestjs/swagger'

export class LoginChallengeResponseDto {
	@ApiProperty({
		description: 'Message to be signed by the wallet',
		example: 'Sign this message to authenticate...'
	})
	message: string

	@ApiProperty({
		description: 'Nonce stored for verification',
		example: 'abc123'
	})
	nonce: string

	@ApiProperty({
		description: 'Timestamp of the challenge',
		example: 'Wed, 21 Oct 2015 07:28:00 GMT'
	})
	timestamp: string
}
