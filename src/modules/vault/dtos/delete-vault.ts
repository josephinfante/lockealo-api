import { COMMON_MESSAGES } from '../../../data/common-messages'
import { HTTP_STATUS } from '../../../data/http-status'
import { AppError } from '../../../errors/app-error'
import { ValidationError } from '../../../errors/validation-error'
import { MethodReponse } from '../../../interfaces/method_response-interface'
import { VaultsModel } from '../../../models/vaults-model'

export const deleteVault = async ({ id, user_id }: { id: string; user_id: string }): Promise<MethodReponse> => {
	if (!id) throw new ValidationError(COMMON_MESSAGES.NO_ID)

	const vault = await VaultsModel.findOne({ where: { id, user_id } })
	if (!vault) throw new AppError(COMMON_MESSAGES.NOT_PROCESS, HTTP_STATUS.NOT_FOUND)

	await vault.destroy()

	return { status: HTTP_STATUS.NO_CONTENT }
}
