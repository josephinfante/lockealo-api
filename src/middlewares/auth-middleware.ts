import { NextFunction, Request, Response } from 'express'
import { AuthError } from '../errors/auth-error'
import { COMMON_MESSAGES } from '../data/common-messages'
import { JWT } from '../utils/jwt'
import { JWTVerifyResult } from 'jose'
import { UserRepository } from '../modules/user/user-repository.impl'
import { UserService } from '../modules/user/user-service'

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const raw_cookies = req.headers?.cookie

		if (!raw_cookies) throw new AuthError(COMMON_MESSAGES.NO_TOKEN)

		const token_cookie = raw_cookies
			.split(';')
			.find((cookie) => cookie.trim().startsWith('token='))
			?.split('=')[1]

		if (!token_cookie || token_cookie.trim() === '' || token_cookie.trim() === 'undefined')
			throw new AuthError(COMMON_MESSAGES.NO_TOKEN)

		const { payload } = (await JWT.validate(token_cookie)) as JWTVerifyResult

		if (payload.exp && typeof payload.exp === 'number' && payload.exp < Date.now() / 1000)
			throw new AuthError(COMMON_MESSAGES.EXPIRED_TOKEN)

		const userRepository = new UserRepository()
		const userService = new UserService(userRepository)
		const { data } = await userService.findByEmail(payload.email as string)

		if (!data) throw new AuthError(COMMON_MESSAGES.NOT_PROCESS)

		res.locals.user = data

		next()
	} catch (error) {
		return next(error)
	}
}
