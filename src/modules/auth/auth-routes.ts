import { Router } from 'express'
import { AuthController } from './auth-controller'
import { authMiddleware } from '../../middlewares/auth-middleware'

export class AuthRouter {
	static get routes(): Router {
		const router = Router()
		const controller = new AuthController()

		router.post('/sign-in', controller.signIn.bind(controller))
		router.post('/sign-up', controller.signUp.bind(controller))
		router.get('/logout', controller.logout.bind(controller))
		router.get('/otp', authMiddleware, controller.otp.bind(controller))
		router.put('/verify/account', authMiddleware, controller.verifyAccount.bind(controller))
		router.get('/verify/status', authMiddleware, controller.verifyStatus.bind(controller))
		router.get('/verify/token/:token', controller.verifyToken.bind(controller))

		return router
	}
}
