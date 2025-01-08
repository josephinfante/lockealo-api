import { Router } from 'express'
import { UserRouter } from './modules/user/user-router'

export class ServerRouter {
	static get routes(): Router {
		const router = Router()

		router.use('/api/users', UserRouter.routes)

		return router
	}
}
