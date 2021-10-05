import { Express } from 'express';

import createUserController from './controllers/user.controller';
import { validate } from './middleware/validate';
import { createUserSchema } from './schemas/user.schema';

const routes = (app: Express) => {
	// create user
	app.post('/api/users', validate(createUserSchema), createUserController);
}

export default routes;
