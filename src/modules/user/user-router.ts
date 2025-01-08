import { Router } from 'express'
import { UserRepository } from './user-repository.impl'
import { UserService } from './user-service'
import { UserController } from './user-controller'

export class UserRouter {
	static get routes(): Router {
		const router = Router()

		const repository = new UserRepository()
		const service = new UserService(repository)
		const controller = new UserController(service)

		router.post('/', controller.create.bind(controller))
		router.patch('/:id', controller.update.bind(controller))
		router.delete('/:id', controller.delete.bind(controller))
		router.get('/:id', controller.findById.bind(controller))
		router.get('/', controller.findAll.bind(controller))

		return router
	}
}
