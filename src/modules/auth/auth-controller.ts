import { Request, Response } from 'express'
import { tryCatch } from '../../utils/try-catch'
import { signIn } from './dtos/sign-in'
import { HOST_URL, NODE_ENV } from '../../config/envd'
import { signUp } from './dtos/sign-up'
import { HTTP_STATUS } from '../../data/http-status'
import { sendOtpCode } from './dtos/send-otp-code'
import { verifyAccount } from './dtos/verify-account'
import { verifyAccountStatus } from './dtos/verify-account-status'
import { verifyToken } from './dtos/verify-token'

export class AuthController {
	signIn = tryCatch(async (req: Request, res: Response) => {
		const { status, data } = await signIn({ email: req.body.email, password: req.body.password })

		res.cookie('token', data?.token, {
			httpOnly: true,
			sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
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
			sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
			secure: NODE_ENV === 'production',
			maxAge: 5 * 60 * 1000, // 5 minutes in milliseconds
			path: '/',
			...(NODE_ENV === 'production' && { domain: `.${HOST_URL}` }),
		})
		res.status(status).json(data?.user)
	})

	logout = tryCatch(async (_req: Request, res: Response) => {
		res.clearCookie('token', {
			httpOnly: true,
			sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
			secure: NODE_ENV === 'production',
			path: '/',
			...(NODE_ENV === 'production' && { domain: `.${HOST_URL}` }),
		})
		res.status(HTTP_STATUS.OK).json({ message: 'You have been logged out.' })
	})

	otp = tryCatch(async (_req: Request, res: Response) => {
		const { status, message } = await sendOtpCode({
			id: res.locals.user.id,
			first_name: res.locals.user.first_name,
			email: res.locals.user.email,
		})

		res.status(status).json({ message })
	})

	verifyAccount = tryCatch(async (req: Request, res: Response) => {
		const { status, message } = await verifyAccount({ id: res.locals.user.id, code: req.body.code })

		res.status(status).json({ message })
	})

	verifyStatus = tryCatch(async (_req: Request, res: Response) => {
		const { status, data } = await verifyAccountStatus({ id: res.locals.user.id })
		res.status(status).json(data)
	})

	verifyToken = tryCatch(async (req: Request, res: Response) => {
		const { status } = await verifyToken({ token: req.params.token })

		res.status(status).send()
	})
}
