import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * Custom exception for handling specific user authentication errors.
 */
export class UserNotRegisteredException extends HttpException {
	constructor() {
		super(
			{
				statusCode: HttpStatus.UNAUTHORIZED,
				error: 'USER_NOT_REGISTERED',
				message: 'User is not registered. Please register first.'
			},
			HttpStatus.UNAUTHORIZED
		)
	}
}
/**
 * Custom exception for handling username conflicts.
 */
export class UsernameAlreadyExistsException extends HttpException {
	constructor() {
		super(
			{
				statusCode: HttpStatus.CONFLICT,
				error: 'USERNAME_ALREADY_EXISTS',
				message: 'This username is already taken. Please choose a different one.'
			},
			HttpStatus.CONFLICT
		)
	}
}
/**
 * Custom exception for handling invalid signatures during authentication.
 */
export class InvalidSignatureException extends HttpException {
	constructor() {
		super(
			{
				statusCode: HttpStatus.UNAUTHORIZED,
				error: 'INVALID_SIGNATURE',
				message: 'The provided signature is invalid.'
			},
			HttpStatus.UNAUTHORIZED
		)
	}
}
/**
 * Custom exception for handling missing or expired nonces.
 */
export class NonceExpiredOrNotFoundException extends HttpException {
	constructor() {
		super(
			{
				statusCode: HttpStatus.UNAUTHORIZED,
				error: 'NONCE_EXPIRED_OR_NOT_FOUND',
				message: 'Nonce expired or not found. Please try again.'
			},
			HttpStatus.UNAUTHORIZED
		)
	}
}
/**
 * Custom exception for handling invalid tokens during token verification.
 */
export class InvalidTokenException extends HttpException {
	constructor() {
		super(
			{
				statusCode: HttpStatus.UNAUTHORIZED,
				error: 'INVALID_TOKEN',
				message: 'The provided token is invalid.'
			},
			HttpStatus.UNAUTHORIZED
		)
	}
}
