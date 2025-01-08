import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../errors/validation-error'
import { AppError } from '../errors/app-error'
import { COMMON_MESSAGES } from '../data/common-messages'

export async function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): Promise<void> {
	if (err instanceof ValidationError) {
		res.status(err.statusCode).json({
			type: err.name,
			status_code: err.statusCode,
			message: err.message,
			...(err.metadata && { metadata: err.metadata }),
		})
		return
	}
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			type: err.name,
			status_code: err.statusCode,
			message: err.message,
		})
		return
	}
	res.status(500).json({ message: COMMON_MESSAGES.INTERNAL_SERVER_ERROR })
}
