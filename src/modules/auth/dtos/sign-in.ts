import { AppError } from '../../../errors/app-error'
import { AuthError } from '../../../errors/auth-error'
import { ISignIn } from '../../../interfaces/auth-interface'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { Bcrypt } from '../../../utils/bcrypt'
import { JWT } from '../../../utils/jwt'
import { UserRepository } from '../../user/user-repository.impl'
import { UserService } from '../../user/user-service'

export const signIn = async ({
	email,
	password,
}: {
	email: string
	password: string
}): Promise<MethodReponse<ISignIn>> => {
	const userRepository = new UserRepository()
	const userService = new UserService(userRepository)
	const { data } = await userService.findByEmail(email)

	if (!data) throw new AuthError('Invalid email or password.')

	const is_valid_password = await Bcrypt.compare(password, data.password as string)
	if (!is_valid_password) throw new AuthError('Invalid email or password.')

	const token = await JWT.sign({
		first_name: data.first_name,
		last_name: data.last_name,
		email: data.email,
	})

	if (!token) throw new AppError('Internal server error while signing in.', 500)

	await userService.updateLastLogin({ id: data.id })

	return {
		status: 200,
		data: {
			user: {
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
			},
			token,
		},
	}
}
