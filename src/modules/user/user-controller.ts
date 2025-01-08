import { Request, Response } from 'express'
import { UserService } from './user-service'
import { tryCatch } from '../../utils/try-catch'

export class UserController {
	private userService: UserService

	constructor(userService: UserService) {
		this.userService = userService
	}

	create = tryCatch(async (req: Request, res: Response) => {
		const { status, message } = await this.userService.create({ data: req.body })
		res.status(status).json({ message })
	})

	update = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params
		const { status, message } = await this.userService.update({ id, data: req.body })
		res.status(status).json({ message })
	})

	delete = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params
		const { status, message } = await this.userService.delete({ id })
		res.status(status).json({ message })
	})

	findById = tryCatch(async (req: Request, res: Response) => {
		const { id } = req.params
		const { status, message, data } = await this.userService.findById({ id })

		const response = message ? { message } : data
		res.status(status).json(response)
	})

	findAll = tryCatch(async (req: Request, res: Response) => {
		const { query } = req
		const { status, message, data } = await this.userService.findAll({ query })

		const response = message ? { message } : data
		res.status(status).json(response)
	})
}
