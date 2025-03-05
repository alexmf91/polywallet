import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { verifyMessage } from 'ethers'

import type { EnvironmentVariables } from 'env'
import { REDIS_STORAGE_TIME } from 'src/common/constants'
import {
	InvalidSignatureException,
	InvalidTokenException,
	NonceExpiredOrNotFoundException,
	UserNotRegisteredException
} from 'src/common/exceptions'
import { DatabaseService } from '../database'
import { RedisService } from '../redis'
import { LoginChallengeDto, LoginDto } from './dto'

@Injectable()
export class AuthService {
	private readonly appName: string

	constructor(
		private readonly configService: ConfigService<EnvironmentVariables>,
		private readonly jwtService: JwtService,
		private readonly databaseService: DatabaseService,
		private readonly redisService: RedisService
	) {
		const appName = this.configService.get('APP', { infer: true })
		if (!appName) {
			throw new Error('APP environment variable is required')
		}
		this.appName = appName
	}

	private createAuthMessage(nonce: string, timestamp: string): string {
		return `To protect your ${this.appName} privacy, we ask you to sign in with your wallet to see your data.
  Signing in on ${timestamp}. For your safety, only sign this message on ${this.appName}! 
  Nonce: ${nonce}`
	}

	async generateLoginChallenge(
		dto: LoginChallengeDto
	): Promise<{ message: string; nonce: string; timestamp: string }> {
		const nonce = Math.random().toString(36).substring(2, 15)
		const timestamp = new Date().toUTCString()

		const message = this.createAuthMessage(nonce, timestamp)

		await this.redisService.set(
			dto.walletAddress,
			JSON.stringify({ nonce, timestamp }),
			REDIS_STORAGE_TIME // Store nonce and timestamp for 5 minutes
		)
		return { message, nonce, timestamp }
	}

	async login(dto: LoginDto): Promise<{
		token: string
		walletAddress: string
		username: string | null
	}> {
		const { walletAddress, signature } = dto
		const storedData = await this.redisService.get(walletAddress)

		if (!storedData) {
			throw new NonceExpiredOrNotFoundException()
		}

		const { nonce, timestamp } = JSON.parse(storedData)
		const expectedMessage = this.createAuthMessage(nonce, timestamp)
		const recoveredAddress = verifyMessage(expectedMessage, signature)

		if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
			throw new InvalidSignatureException()
		}

		await this.redisService.del(walletAddress) // Invalidate nonce after use

		const user = await this.databaseService.user.findUnique({ where: { walletAddress } })

		if (!user) {
			throw new UserNotRegisteredException()
		}

		const token = this.jwtService.sign({ walletAddress: user.walletAddress, id: user.id })

		return { token, walletAddress: user.walletAddress, username: user.username }
	}

	async verifyToken(token: string): Promise<{ valid: boolean }> {
		try {
			const decoded = this.jwtService.verify(token)

			if (!decoded.walletAddress) {
				throw new InvalidTokenException()
			}

			return { valid: true }
		} catch (error) {
			return { valid: false }
		}
	}
}
