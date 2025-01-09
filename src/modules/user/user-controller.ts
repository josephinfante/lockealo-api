import { Request, Response } from 'express'
import { UserService } from './user-service'
import { tryCatch } from '../../utils/try-catch'

export class UserController {
	private userService: UserService

	constructor(userService: UserService) {
		this.userService = userService
	}

	update = tryCatch(async (req: Request, res: Response) => {
		const { id } = res.locals.user
		const { status, message } = await this.userService.update({ id, data: req.body })
		res.status(status).json({ message })
	})

	delete = tryCatch(async (_req: Request, res: Response) => {
		const { id } = res.locals.user
		const { status, message } = await this.userService.delete({ id })
		res.status(status).json({ message })
	})

	findById = tryCatch(async (_req: Request, res: Response) => {
		const { id } = res.locals.user
		const { status, data } = await this.userService.findById({ id })
		res.status(status).json(data)
	})

	findAll = tryCatch(async (req: Request, res: Response) => {
		const { query } = req
		const { status, data } = await this.userService.findAll({ query })
		res.status(status).json(data)
	})
}
