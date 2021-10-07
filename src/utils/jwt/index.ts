import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
import dotenv from 'dotenv';

dotenv.config();

// const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const PRIVATE_KEY = config.get<string>("PRIVATE_KEY");
const PUBLIC_KEY = config.get<string>("PUBLIC_KEY");

export const signJWT = (object: Object, options?: SignOptions | undefined) => {
	return jwt.sign(
		object, 
		PRIVATE_KEY, 
		{ ...(options && options), 
			algorithm: 'RS256' 
		}
	);
} 

export const verifyJWT = (token: string) => {
	try {
		const decoded = jwt.verify(token, PUBLIC_KEY);

		return {
			valid: true, 
			expired: false, 
			decoded
		}
	} catch (e: any) {
		return { 
			valid: false, 
			expired: e.mesage === 'JWT is expired.',
			decoded: null
		}
	}
}
