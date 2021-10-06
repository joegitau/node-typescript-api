import { Request, Response } from "express";

import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";

export const createSessionController = async (req: Request, res: Response) => {
  // validate user's password
	const user = validatePassword(req.body);

	if(!user) return false;

	return res.status(401).json({ message: "Invalid password or email."});

	// create a session
	const session = createSession(user._id, req.get('user-agent') || '');

	// create an access token

	// create a refresh token

	// return access & refresh tokens
}