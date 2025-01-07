import express, { Application, Router } from 'express'
import cors from 'cors'
import { ACCEPTED_ORIGINS } from './config/envd'

interface ServerOption {
	port?: number
	routes: Router
}

export class Server {
	public readonly app: Application = express()
	public readonly port: number
	public readonly routes: Router

	constructor(options: ServerOption) {
		const { port = 3000, routes } = options
		this.port = port
		this.routes = routes
	}

	async start() {
		this.app.set('trust proxy', true)
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(
			cors({
				origin: (origin, callback) => {
					if (!origin) return callback(null, true)
					if (ACCEPTED_ORIGINS.includes(origin)) {
						callback(null, true)
						return
					}
					return callback(new Error('Not allowed by CORS'))
				},
				credentials: true,
			}),
		)
		this.app.use(this.routes)
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`)
		})
	}
}
