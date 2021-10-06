import { DocumentDefinition } from 'mongoose';
import { omit } from 'lodash';

import User, { UserDocument } from '../models/User.model';

interface Auth {
 email: string;
 password: string;
}

export const createUser = async (
    input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>
  ) => {
  try {
    const user = await User.create(input);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
};

export const validatePassword = async ({ email, password }: Auth) => {
  const user = await User.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  // return user, alebit omit the password
  return omit(user.toJSON(), 'password');
}
