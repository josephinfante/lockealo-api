export class ValidationError extends Error {
	public readonly statusCode: number = 400
	public readonly metadata: any

	constructor(message: string, metadata?: any) {
		super(message)
		this.name = 'ValidationError'
		this.metadata = metadata

		Error.captureStackTrace(this, this.constructor)
	}
}
