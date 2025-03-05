import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import type { EnvironmentVariables } from 'env'
import { DatabaseService } from '../database'
import { RedisService } from '../redis'
import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

@Global()
@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService<EnvironmentVariables>) => {
				const secret = configService.get<string>('JWT_SECRET')

				if (!secret) {
					throw new Error('JWT_SECRET is not defined')
				}

				return {
					secret,
					signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION', '1h') }
				}
			}
		})
	],
	controllers: [AuthController],
	providers: [AuthService, AuthGuard, ConfigService, DatabaseService, RedisService],
	exports: [AuthService, JwtModule, AuthGuard]
})
export class AuthModule {}
