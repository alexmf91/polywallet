import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import {
	LoginChallengeDto,
	LoginChallengeResponseDto,
	LoginDto,
	LoginResponseDto,
	VerifyTokenDto,
	VerifyTokenResponseDto
} from './dto'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('challenge')
	@ApiOperation({
		summary: 'Generate login challenge',
		description: 'Creates a nonce message for wallet signing.'
	})
	@ApiResponse({ status: 200, type: LoginChallengeResponseDto })
	async generateLoginChallenge(@Body() dto: LoginChallengeDto) {
		return this.authService.generateLoginChallenge(dto)
	}

	@Post('login')
	@ApiOperation({
		summary: 'Login with wallet',
		description: 'Verifies the signed message and returns a JWT.'
	})
	@ApiResponse({ status: 200, type: LoginResponseDto })
	async login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}

	@Post('verify')
	@ApiOperation({
		summary: 'Verify JWT token',
		description: 'Validates the authentication token and returns user details.'
	})
	@ApiResponse({ status: 200, type: VerifyTokenResponseDto })
	async verify(@Body() dto: VerifyTokenDto) {
		return this.authService.verifyToken(dto.token)
	}
}
