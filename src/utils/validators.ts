export class Validators {
	static isEmail(email: string): boolean {
		return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
	}

	static isPassword(password: string): Object | boolean {
		let errors: any = {}

		if (password.length < 8)
			errors.length = { value: password.length, message: 'Password must be at least 8 characters.' }
		if (!/[a-z]/.test(password))
			errors.lowercase = { value: password, message: 'Password must contain at least one lowercase letter.' }
		if (!/[A-Z]/.test(password))
			errors.uppercase = { value: password, message: 'Password must contain at least one uppercase letter.' }
		if (!/\d/.test(password)) errors.number = { value: password, message: 'Password must contain at least one number.' }
		if (!/[@$!%*?&]/.test(password))
			errors.special = { value: password, message: 'Password must contain at least one special character.' }

		return Object.keys(errors).length > 0 ? errors : true
	}
}
