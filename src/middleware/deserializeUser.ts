import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJWT } from '../utils/jwt';

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  // get accessToken if it exists
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  const reqHeader = req.headers['authorization'];
  const accessTok = reqHeader?.split(" ")[1];
  

  if (!accessToken) {
    return next();
  }

  const { expired, decoded } = verifyJWT(accessToken);
  console.log("Decoded: ", decoded);
   
  if (decoded) {
    // attach user to res.locals object
    res.locals.user = decoded;

    return next();
  }

  return next();
}

export default deserializeUser;

/**
 * res.locals is an obejct whose property values are valid for the duration of a req-res cycle lifetime
 * - Ideally useful for setting/ sending variables to client-side
 **/