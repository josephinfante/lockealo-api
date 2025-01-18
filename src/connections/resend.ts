import { Resend } from 'resend'
import { RESEND_API_KEY, RESEND_FROM } from '../config/envd'

interface IEmailOptions {
	to: string[]
	subject: string
	html: string
}

const resend = new Resend(RESEND_API_KEY)

const validateEmailOptions = (options: IEmailOptions): boolean => {
	const { to, subject, html } = options
	if (!to.length || !subject || !html) {
		return false
	}
	return true
}

const sendEmail = async (options: IEmailOptions): Promise<{ data: { id?: string; error?: string } }> => {
	if (!validateEmailOptions(options)) return { data: { error: 'Invalid email options' } }
	const { data, error } = await resend.emails.send({ ...options, from: RESEND_FROM })

	if (error) return { data: { error: error.message } }

	return { data: { id: data?.id } }
}

export default sendEmail
