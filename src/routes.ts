import { Router } from 'express'
import { UserRouter } from './modules/user/user-routes'
import { AuthRouter } from './modules/auth/auth-routes'

export class ServerRouter {
	static get routes(): Router {
		const router = Router()

		router.use('/api/users', UserRouter.routes)

		router.use('/api/auth', AuthRouter.routes)

		return router
	}
}
