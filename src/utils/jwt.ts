import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from 'jose'
import { JWT_SECRET } from '../config/envd'

export class JWT {
	private static secret: Uint8Array = new TextEncoder().encode(JWT_SECRET)
	static async sign(payload: JWTPayload, duration: string = '5d'): Promise<string | null> {
		return new Promise((resolve) => {
			new SignJWT(payload)
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setExpirationTime(duration)
				.sign(JWT.secret)
				.then((token) => {
					return resolve(token)
				})
				.catch((error) => {
					if (error) return resolve(null)
				})
		})
	}
	static async validate(token: string): Promise<JWTVerifyResult<JWTPayload> | null> {
		return new Promise((resolve) => {
			jwtVerify(token, JWT.secret, { algorithms: ['HS256'] })
				.then((payload) => {
					return resolve(payload)
				})
				.catch((error) => {
					if (error) return resolve(null)
				})
		})
	}
}
