import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import type { EnvironmentVariables } from 'env'
import { BlockchainService } from './blockchain.service'

@Global()
@Module({})
export class BlockchainModule {
	static forRootAsync(): DynamicModule {
		return {
			module: BlockchainModule,
			providers: [
				{
					provide: BlockchainService,
					useFactory: (configService: ConfigService<EnvironmentVariables>) => {
						const alchemyApiKey = configService.get('ALCHEMY_API_KEY', {
							infer: true
						})

						if (!alchemyApiKey) {
							throw new Error('ALCHEMY_API_KEY is not defined')
						}

						return new BlockchainService(alchemyApiKey)
					},
					inject: [ConfigService]
				}
			],
			exports: [BlockchainService]
		}
	}
}
