import type { HttpException } from '@nestjs/common'

export const getExceptionErrorMessage = (exception: HttpException): string => {
	const response = exception.getResponse()

	if (typeof response === 'object' && response !== null) {
		const responseBody = response as Record<string, any>
		return responseBody.message || 'Internal server error'
	}

	return typeof exception.message === 'string' ? exception.message : 'Internal server error'
}

export const getExceptionError = (exception: HttpException): string => {
	const response = exception.getResponse()

	if (typeof response === 'object' && response !== null) {
		const responseBody = response as Record<string, any>
		return responseBody.error || 'Internal server error'
	}

	return 'Internal server error'
}
