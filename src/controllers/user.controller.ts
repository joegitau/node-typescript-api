import { Request, Response } from 'express';

import { createUser } from '../services/user.service';
import { CreateUserInput } from '../schemas/user.schema';
import log from '../utils/logger';

const createUserController = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
  try {
    const user = await createUser(req.body);
    
    return res.status(201).send(user);
  } catch (e: any) {
    log.error(e.message);

    res.status(409).send(e.message); // CONFLICT ERROR: 409! -> likely duplicate emails
  }
};

export default createUserController;
