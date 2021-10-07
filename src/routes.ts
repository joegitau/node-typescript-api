import { Express } from 'express';

import createUserController from './controllers/user.controller';
import { createSessionController } from './controllers/session.controller';
import { validateResource } from './middleware/validators';
import { createUserSchema } from './schemas/user.schema';
import { createSessionSchema } from './schemas/session.schema';

const routes = (app: Express) => {
  // create user
  app.post('/api/users', validateResource(createUserSchema), createUserController);

  // create user session
  app.post('/api/sessions', validateResource(createSessionSchema), createSessionController);
};

export default routes;
