import { HTTP_STATUS } from '../data/http-status'

export class AuthError extends Error {
	public readonly statusCode: number = HTTP_STATUS.UNAUTHORIZED

	constructor(message: string) {
		super(message)
		this.name = 'AuthError'

		Error.captureStackTrace(this, this.constructor)
	}
}
