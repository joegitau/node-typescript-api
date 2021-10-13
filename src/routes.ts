import { Express } from 'express';

import { createUserSchema } from './schemas/user.schema';
import { validateResource } from './middleware/validators';
import verifyUserExists from './middleware/verifyuserExists';
import { createSessionSchema } from './schemas/session.schema';
import createUserController from './controllers/user.controller';
import { createSessionController, getSessionsController } from './controllers/session.controller';

const routes = (app: Express) => {
  // create user
  app.post('/api/users', validateResource(createUserSchema), createUserController);

  // create user session
  app.post('/api/sessions', validateResource(createSessionSchema), createSessionController);

  // fetch user sessions
  app.get('/api/sessions', verifyUserExists, getSessionsController);
};

export default routes;
