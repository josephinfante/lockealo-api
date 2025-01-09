import { Router } from 'express'
import { UserRepository } from './user-repository.impl'
import { UserService } from './user-service'
import { UserController } from './user-controller'
import { authMiddleware } from '../../middlewares/auth-middleware'

export class UserRouter {
	static get routes(): Router {
		const router = Router()

		const repository = new UserRepository()
		const service = new UserService(repository)
		const controller = new UserController(service)

		router.patch('/:id', authMiddleware, controller.update.bind(controller))
		router.delete('/:id', authMiddleware, controller.delete.bind(controller))
		router.get('/:id', authMiddleware, controller.findById.bind(controller))

		return router
	}
}
