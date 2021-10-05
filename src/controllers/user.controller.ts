import { Request, Response} from 'express';
import { omit } from 'lodash';

import { createUser } from '../services/user.service';
import { CreateUserInput } from '../schemas/user.schema';
import log from '../utils/logger';

const createUserController = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
	try {
		const user = await createUser(req.body);
		return res.status(201).send(omit(user.toJSON(), 'password'));
	} catch (e: any) {
		log.error(e.message);

		res.status(409).json({ error: e.message }); // CONFLICT ERROR: 409! -> most likely duplicate emails
	}
}

export default createUserController;
