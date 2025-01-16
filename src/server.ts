import express, { Application, Router } from 'express'
import { errorMiddleware } from './middlewares/error-middleware'
import { corsMiddleware } from './middlewares/cors-middleware'

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
		this.app.use(corsMiddleware)
		this.app.use(this.routes)
		this.app.use(errorMiddleware)
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`)
		})
	}
}
