import { Router } from 'express'
import { VaultRepository } from './vault-repository.impl'
import { VaultService } from './vault-service'
import { VaultController } from './vault-controller'
import { authMiddleware } from '../../middlewares/auth-middleware'

export class VaultRouter {
	static get routes(): Router {
		const router = Router()

		const repository = new VaultRepository()
		const service = new VaultService(repository)
		const controller = new VaultController(service)

		router.post('/', authMiddleware, controller.create.bind(controller))
		router.put('/:id', authMiddleware, controller.update.bind(controller))
		router.delete('/:id', authMiddleware, controller.delete.bind(controller))
		router.get('/', authMiddleware, controller.findAll.bind(controller))

		return router
	}
}
