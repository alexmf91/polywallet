import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { verifyMessage } from 'ethers'

import type { EnvironmentVariables } from 'env'
import { REDIS_STORAGE_TIME } from 'src/common/constants'
import {
	InvalidSignatureException,
	NonceExpiredOrNotFoundException,
	UsernameAlreadyExistsException
} from 'src/common/exceptions'
import { DatabaseService } from '../database'
import { RedisService } from '../redis'
import { RegisterUserDto } from './dto'

@Injectable()
export class UserService {
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

	private createRegisterMessage(walletAddress: string, timestamp: string, nonce: string): string {
		return `To protect your ${this.appName} privacy, sign this message to register/update your username. Signing in on ${timestamp}. For your safety, only sign this message on ${this.appName}! Nonce: ${nonce} Wallet: ${walletAddress}`
	}

	async generateRegisterChallenge(
		walletAddress: string
	): Promise<{ message: string; timestamp: string; nonce: string }> {
		const timestamp = new Date().toUTCString()
		const nonce = Math.random().toString(36).substring(2, 15)
		const message = this.createRegisterMessage(walletAddress, timestamp, nonce)

		await this.redisService.set(
			walletAddress,
			JSON.stringify({ nonce, timestamp }),
			REDIS_STORAGE_TIME // Store nonce and timestamp for 5 minutes
		)
		return { message, timestamp, nonce }
	}

	async registerUser(dto: RegisterUserDto) {
		const { walletAddress, username, signature } = dto
		const storedData = await this.redisService.get(walletAddress)

		if (!storedData) {
			throw new NonceExpiredOrNotFoundException()
		}

		const { nonce, timestamp } = JSON.parse(storedData)
		const expectedMessage = this.createRegisterMessage(walletAddress, timestamp, nonce)
		const recoveredAddress = verifyMessage(expectedMessage, signature)

		if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
			throw new InvalidSignatureException()
		}

		await this.redisService.del(walletAddress) // Invalidate nonce after use

		if (username) {
			const existingUserWithUsername = await this.databaseService.user.findUnique({
				where: { username }
			})

			if (
				existingUserWithUsername &&
				existingUserWithUsername.walletAddress !== walletAddress
			) {
				throw new UsernameAlreadyExistsException()
			}
		}

		const user = await this.databaseService.user.upsert({
			where: { walletAddress },
			update: { username },
			create: { walletAddress, username }
		})

		const token = this.jwtService.sign({ walletAddress: user.walletAddress, id: user.id })

		return { token, walletAddress: user.walletAddress, username: user.username }
	}

	async getUserByWallet(walletAddress: string) {
		return this.databaseService.user.findUnique({ where: { walletAddress } })
	}

	async getUserByUsername(username: string) {
		return this.databaseService.user.findUnique({ where: { username } })
	}

	async getAllUsers(search?: string) {
		const users = await this.databaseService.user.findMany({
			where: search
				? {
						OR: [
							{ username: { contains: search, mode: 'insensitive' } },
							{ walletAddress: { contains: search, mode: 'insensitive' } }
						]
					}
				: undefined
		})
		return users.map(({ walletAddress, username }) => ({ walletAddress, username }))
	}
}
