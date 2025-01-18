export interface IUserCreate {
	first_name: string
	last_name: string
	email: string
	password: string
	[key: string]: any
}

export interface IUserUpdate {
	first_name?: string
	last_name?: string
	password?: string
	hidden?: boolean
	deleted?: boolean
	[key: string]: any
}

export interface IUser {
	id: string
	first_name: string
	last_name: string
	email: string
	password: string
	is_verified: boolean
	last_login_at: Date | null
	hidden: boolean
	deleted: boolean
	created_at: Date
	updated_at: Date
	[key: string]: any
}
