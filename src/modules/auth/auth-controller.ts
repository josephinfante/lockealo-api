import { Request, Response } from 'express'
import { tryCatch } from '../../utils/try-catch'
import { signIn } from './dtos/sign-in'
import { HOST_URL, NODE_ENV } from '../../config/envd'
import { signUp } from './dtos/sign-up'

export class AuthController {
	signIn = tryCatch(async (req: Request, res: Response) => {
		const { status, data } = await signIn({ email: req.body.email, password: req.body.password })

		res.cookie('token', data?.token, {
			httpOnly: true,
			...(NODE_ENV === 'production' ? { sameSite: 'none' } : { sameSite: 'lax' }),
			secure: NODE_ENV === 'production',
			maxAge: 5 * 60 * 1000, // 5 minutes in milliseconds
			path: '/',
			...(NODE_ENV === 'production' && { domain: `.${HOST_URL}` }),
		})
		res.status(status).json(data?.user)
	})

	signUp = tryCatch(async (req: Request, res: Response) => {
		const { status, data } = await signUp({ data: req.body })

		res.cookie('token', data?.token, {
			httpOnly: true,
			...(NODE_ENV === 'production' ? { sameSite: 'none' } : { sameSite: 'lax' }),
			secure: NODE_ENV === 'production',
			maxAge: 5 * 60 * 1000, // 5 minutes in milliseconds
			path: '/',
			...(NODE_ENV === 'production' && { domain: `.${HOST_URL}` }),
		})
		res.status(status).json(data?.user)
	})
}
