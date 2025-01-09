import { HTTP_STATUS } from '../data/http-status'

export class ValidationError extends Error {
	public readonly statusCode: number = HTTP_STATUS.BAD_REQUEST
	public readonly metadata: any

	constructor(message: string, metadata?: any) {
		super(message)
		this.name = 'ValidationError'
		this.metadata = metadata

		Error.captureStackTrace(this, this.constructor)
	}
}
