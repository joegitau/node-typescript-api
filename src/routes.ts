import { Express } from 'express';

import createUserController from './controllers/user.controller';
import { validateResource } from './middleware/validateResource';
import { createUserSchema } from './schemas/user.schema';

const routes = (app: Express) => {
  // create user
  app.post('/api/users', validateResource(createUserSchema), createUserController);
};

export default routes;
