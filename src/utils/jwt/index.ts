import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const signJWT = (object: Object, options?: SignOptions | undefined) => {
	return jwt.sign(
		object, 
		ACCESS_TOKEN_SECRET, 
		{ ...(options && options), algorithm: "HS256"}
	);
} 

export const verifyJWT = (token: string) => {
	try {
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

		return {
			valid: true,
			expired: false,
			decoded
		}
	} catch (e: any) {
		console.log("JWT Verification error: ", e.message)
		return { 
			valid: false,
			expired: e.mesage === 'jwt expired',
			decoded: null
		}
	}
}
