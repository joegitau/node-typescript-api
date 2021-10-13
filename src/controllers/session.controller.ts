import { Request, Response } from "express";
import config from 'config';

import { createSession, findSessions } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJWT } from '../utils/jwt/index';

export const createSessionController = async (req: Request, res: Response) => {
  // validate user's password
	const user = await validatePassword(req.body);

	if (!user) {
		return res.status(401).send("Invalid password or email.");
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
	return res.status(200).send({ accessToken, refreshToken });
}

export const getSessionsController = async (req: Request, res: Response) => {
	// fetch the userId from res.locals object
	const userId = res.locals.user._id;
	
	const sessions = await findSessions({ user: userId, valid: true });
	console.log("sessions: ", sessions);

	return res.status(200).send(sessions);
}
