import { Module } from '@nestjs/common'

import { AuthGuard } from '../auth'
import { DatabaseService } from '../database'
import { RedisService } from '../redis'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	controllers: [UserController],
	providers: [DatabaseService, RedisService, UserService, AuthGuard],
	exports: [UserService]
})
export class UserModule {}
