import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { LoggerMiddleware } from './common/middleware'

import { AuthModule } from './modules/auth'
import { UserModule } from './modules/user'
import { WalletModule } from './modules/wallet'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		AuthModule,
		UserModule,
		WalletModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('')
	}
}
