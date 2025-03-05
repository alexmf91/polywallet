import { Module } from '@nestjs/common'

import { AuthGuard } from '../auth'
import { BlockchainModule } from '../blockchain'
import { WalletController } from './wallet.controller'
import { WalletService } from './wallet.service'

@Module({
	imports: [BlockchainModule.forRootAsync()],
	controllers: [WalletController],
	providers: [WalletService, AuthGuard]
})
export class WalletModule {}
