import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
	let appController: AppController

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService]
		}).compile()

		appController = app.get<AppController>(AppController)
	})

	describe('root', () => {
		it('returns "server is alive" message with "200" statusCode', () => {
			expect(appController.getHealthCheck()).toEqual({
				statusCode: 200,
				message: 'server is alive'
			})
		})
	})
})
