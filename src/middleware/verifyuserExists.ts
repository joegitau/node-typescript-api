import { Request, Response, NextFunction } from "express";

// verify that user exists for every request
const verifyUserExists = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  console.log("user: ", user);

  if (!user) {
    return res.status(403).json({ message: 'Strictly Forbiden!'});
  }

  return next();
}

export default verifyUserExists;
