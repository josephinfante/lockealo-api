export interface ISignIn {
	user: {
		first_name: string
		last_name: string
		email: string
	}
	token: string
}

export interface ISignUp extends ISignIn {}
