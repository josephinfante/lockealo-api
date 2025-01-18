import { MethodReponse } from '../../../interfaces/method_response-interface'
import { UserRepository } from '../../user/user-repository.impl'
import { UserService } from '../../user/user-service'

export const verifyAccount = async ({ id, code }: { id: string; code: string }): Promise<MethodReponse> => {
	const userRepository = new UserRepository()
	const userService = new UserService(userRepository)
	const { status, message } = await userService.verify({ id, code })

	return { status, message }
}
