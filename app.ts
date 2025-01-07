import { PORT } from './src/config/envd'
import { ServerRouter } from './src/routes'
import { Server } from './src/server'

;(() => {
	main()
})()

async function main() {
	new Server({
		port: PORT,
		routes: ServerRouter.routes,
	}).start()
}
