import { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { ACCEPTED_ORIGINS } from '../config/envd'
import { AppError } from '../errors/app-error'
import { HTTP_STATUS } from '../data/http-status'

// Dynamically set the CORS options
const corsOptionsDelegate = (req: Request, callback: Function) => {
	const tauri_app = req?.headers['x-tauri-app']

	// Bypass CORS for Tauri app
	if (tauri_app === 'true') {
		return callback(null, { origin: true }) // Allow all for Tauri apps
	}

	const origin = req.headers.origin || '' // Get the origin from request headers

	if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
		// If the origin is allowed
		callback(null, { origin: true, credentials: true }) // Allow origin and credentials
	} else {
		// If the origin is not allowed
		callback(new AppError('Not allowed by CORS', HTTP_STATUS.FORBIDDEN), { origin: false })
	}
}

// The middleware function
export async function corsMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		// Use the cors middleware with dynamic options
		cors(corsOptionsDelegate)(req, res, next)
	} catch (error) {
		next(error) // Forward the error to the next middleware or error handler
	}
}
