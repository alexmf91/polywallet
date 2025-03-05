import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from '../auth'
import { GetUserResponseDto, RegisterUserChallengeDto, RegisterUserDto } from './dto'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('register/challenge')
	@ApiOperation({
		summary: 'Generate registration message',
		description: 'Returns a message the user must sign to register or update their username.'
	})
	async getRegisterChallenge(@Body() dto: RegisterUserChallengeDto) {
		return this.userService.generateRegisterChallenge(dto.walletAddress)
	}

	@Post('register')
	@ApiOperation({
		summary: 'Register user',
		description: 'Registers a new user with their wallet address and username.'
	})
	@ApiResponse({ status: 200, type: GetUserResponseDto })
	async registerUser(@Body() dto: RegisterUserDto) {
		return this.userService.registerUser(dto)
	}

	@Get('list')
	@ApiOperation({
		summary: 'Get all users',
		description: 'Retrieves all users'
	})
	@ApiResponse({ status: 200, type: [GetUserResponseDto] })
	async getAllUsers(@Query('search') search?: string) {
		return this.userService.getAllUsers(search)
	}

	@Get(':username')
	@ApiOperation({
		summary: 'Get user by username',
		description: 'Retrieves user details using their username.'
	})
	@ApiResponse({ status: 200, type: GetUserResponseDto })
	async getUserByUsername(@Param('username') username: string) {
		return this.userService.getUserByUsername(username)
	}

	@UseGuards(AuthGuard)
	@Get()
	@ApiOperation({
		summary: 'Get current user',
		description: 'Retrieves details of the authenticated user.'
	})
	@ApiResponse({ status: 200, type: GetUserResponseDto })
	async getCurrentUser(@Request() req) {
		return this.userService.getUserByWallet(req.user.walletAddress)
	}
}
