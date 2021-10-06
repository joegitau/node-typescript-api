import { Request, Response } from "express";
import config from 'config';

import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJWT} from '../utils/jwt/index';

export const createSessionController = async (req: Request, res: Response) => {
  // validate user's password
	const user = await validatePassword(req.body);

	if(!user) {
		return false 
	} else {
		res.status(401).json({ message: "Invalid password or email."});
	}

	// create a session
	const session = await createSession(user._id, req.get('user-agent') || '');

	// create an access token
	const ACCESS_TOKEN_EXPIRY = config.get<string>("ACCESS_TOKEN_EXPIRY");

	const accessToken = signJWT(
		{ ...user, session: session._id }, 
		{ expiresIn: ACCESS_TOKEN_EXPIRY }
	);

	// create a refresh token
	const REFRESH_TOKEN_EXPIRY = config.get<string>("REFRESH_TOKEN_EXPIRY");

	const refreshToken = signJWT(
		{ ...user, session: session._id }, 
		{ expiresIn: REFRESH_TOKEN_EXPIRY }
	);

	// return access & refresh tokens
	return res.json({ accessToken, refreshToken });
}
