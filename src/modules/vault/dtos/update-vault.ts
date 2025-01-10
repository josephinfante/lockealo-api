import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'
import { AppError } from '../../../errors/app-error'
import { ValidationError } from '../../../errors/validation-error'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { IVaultUpdate } from '../../../interfaces/vault-interface'
import { VaultsModel } from '../../../models/vaults-model'

export const updateVault = async ({
	id,
	data,
	user_id,
}: {
	id: string
	data: IVaultUpdate
	user_id: string
}): Promise<MethodReponse> => {
	if (!id) throw new ValidationError(COMMON_MESSAGES.NO_ID)

	const vault = await VaultsModel.findOne({ where: { id, user_id } })
	if (!vault) throw new AppError(COMMON_MESSAGES.NOT_PROCESS, HTTP_STATUS.NOT_FOUND)

	const missing_fields: any[] = []

	if (!data.data) missing_fields.push('data')
	if (!data.salt) missing_fields.push('salt')
	if (!data.iv) missing_fields.push('iv')

	if (missing_fields.length > 0)
		throw new ValidationError('Invalid data', { ...(missing_fields.length > 0 && { missing_fields }) })

	vault.set({
		data: data.data,
		salt: data.salt,
		iv: data.iv,
		updated_at: new Date(),
	})
	await vault.save()

	return { status: HTTP_STATUS.OK, message: 'Vault updated successfully.' }
}
