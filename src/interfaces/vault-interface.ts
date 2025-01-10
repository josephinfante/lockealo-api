export interface IVaultCreate {
	data: string
	salt: string
	iv: string
	[key: string]: any
}

export interface IVaultUpdate extends IVaultCreate {}

export interface IVault {
	id: string
	data: string
	salt: string
	iv: string
	user_id: string
	created_at: Date
	updated_at: Date
	[key: string]: any
}
