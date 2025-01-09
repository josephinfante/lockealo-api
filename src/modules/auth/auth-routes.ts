import { Router } from 'express'
import { AuthController } from './auth-controller'

export class AuthRouter {
	static get routes(): Router {
		const router = Router()
		const controller = new AuthController()

		router.post('/sign-in', controller.signIn.bind(controller))
		router.post('/sign-up', controller.signUp.bind(controller))

		return router
	}
}
