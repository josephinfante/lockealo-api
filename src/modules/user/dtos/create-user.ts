import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'
import { AppError } from '../../../errors/app-error'
import { ValidationError } from '../../../errors/validation-error'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { IUser, IUserCreate } from '../../../interfaces/user-interface'
import { UsersModel } from '../../../models/users-model'
import { Bcrypt } from '../../../utils/bcrypt'
import { Generate } from '../../../utils/data-generator'
import { Validators } from '../../../utils/validators'

export const createUser = async ({ data }: { data: IUserCreate }): Promise<MethodReponse<IUser>> => {
	const { first_name, last_name, email, password } = data

	const missing_fields: any[] = []
	const validation_errors: any = {}

	if (!first_name) missing_fields.push('first_name')

	if (!last_name) missing_fields.push('last_name')

	if (!email) missing_fields.push('email')
	if (email) {
		if (!Validators.isEmail(email)) validation_errors.email = { value: email, message: 'Invalid email format.' }
	}

	if (!password) missing_fields.push('password')
	if (password) {
		const password_validation_errors = Validators.isPassword(password)
		if (password_validation_errors !== true) validation_errors.password = password_validation_errors
	}

	if (missing_fields.length > 0 || Object.keys(validation_errors).length > 0)
		throw new ValidationError('Invalid data', {
			...(missing_fields.length > 0 && { missing_fields }),
			...(Object.keys(validation_errors).length > 0 && { validation_errors }),
		})

	const hashed_password = await Bcrypt.hash(password)

	const [user, created] = await UsersModel.findOrCreate({
		where: { email },
		defaults: {
			id: Generate.id(),
			first_name,
			last_name,
			email,
			password: hashed_password,
			last_login_at: null,
			hidden: false,
			deleted: false,
			created_at: new Date(),
			updated_at: null,
		},
	})

	if (!created && user?.dataValues.deleted) {
		user.set({
			first_name,
			last_name,
			password: hashed_password,
			deleted: false,
			updated_at: new Date(),
		})
		await user.save()
	} else if (!created) throw new AppError(COMMON_MESSAGES.NOT_PROCESS, HTTP_STATUS.CONFLICT)

	return { status: HTTP_STATUS.CREATED, data: user.dataValues }
}
