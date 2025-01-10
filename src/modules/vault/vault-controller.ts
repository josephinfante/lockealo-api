import { Request, Response } from 'express'
import { tryCatch } from '../../utils/try-catch'
import { VaultService } from './vault-service'

export class VaultController {
	private vaultService: VaultService

	constructor(vaultService: VaultService) {
		this.vaultService = vaultService
	}

	create = tryCatch(async (req: Request, res: Response) => {
		const { status, message } = await this.vaultService.create({ data: req.body, user_id: res.locals.user.id })
		res.status(status).json({ message })
	})

	update = tryCatch(async (req: Request, res: Response) => {
		const { status, message } = await this.vaultService.update({
			id: req.params.id,
			data: req.body,
			user_id: res.locals.user.id,
		})
		res.status(status).json({ message })
	})

	delete = tryCatch(async (req: Request, res: Response) => {
		const { status } = await this.vaultService.delete({
			id: req.params.id,
			user_id: res.locals.user.id,
		})
		res.status(status).send()
	})

	findAll = tryCatch(async (req: Request, res: Response) => {
		const { query } = req
		const { status, data } = await this.vaultService.findAll({ query, user_id: res.locals.user.id })
		res.status(status).json(data)
	})
}
