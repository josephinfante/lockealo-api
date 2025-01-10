import { ParsedQs } from 'qs'
import { FindAllResponse } from '../../interfaces/find_all_response-interface'
import { MethodReponse } from '../../interfaces/method_response-interface'
import { IVaultCreate, IVault, IVaultUpdate } from '../../interfaces/vault-interface'
import { IVaultRepository } from './vault-repository'
import { createVault } from './dtos/create-vault'
import { updateVault } from './dtos/update-vault'
import { deleteVault } from './dtos/delete-vault'
import { findAllVaults } from './dtos/find-all-vaults'

export class VaultRepository implements IVaultRepository {
	async create({ data, user_id }: { data: IVaultCreate; user_id: string }): Promise<MethodReponse> {
		return await createVault({ data, user_id })
	}
	async update({ id, data, user_id }: { id: string; data: IVaultUpdate; user_id: string }): Promise<MethodReponse> {
		return await updateVault({ id, data, user_id })
	}
	async delete({ id, user_id }: { id: string; user_id: string }): Promise<MethodReponse> {
		return await deleteVault({ id, user_id })
	}
	async findAll({
		query,
		user_id,
	}: {
		query: ParsedQs
		user_id: string
	}): Promise<MethodReponse<FindAllResponse<Partial<IVault>>>> {
		return await findAllVaults({ query, user_id })
	}
}
