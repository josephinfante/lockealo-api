import { HTTP_STATUS } from '../../../data/http-status'
import { ValidationError } from '../../../errors/validation-error'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { IVaultCreate } from '../../../interfaces/vault-interface'
import { VaultsModel } from '../../../models/vaults-model'
import { Generate } from '../../../utils/data-generator'

export const createVault = async ({
	data,
	user_id,
}: {
	data: IVaultCreate
	user_id: string
}): Promise<MethodReponse> => {
	const missing_fields: any[] = []

	if (!data.data) missing_fields.push('data')
	if (!data.salt) missing_fields.push('salt')
	if (!data.iv) missing_fields.push('iv')

	if (missing_fields.length > 0)
		throw new ValidationError('Invalid data', { ...(missing_fields.length > 0 && { missing_fields }) })

	await VaultsModel.create({
		id: Generate.id(),
		data: data.data,
		salt: data.salt,
		iv: data.iv,
		user_id,
		created_at: new Date(),
		updated_at: null,
	})

	return { status: HTTP_STATUS.CREATED, message: 'Vault created successfully.' }
}
