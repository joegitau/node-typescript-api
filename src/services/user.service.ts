import { DocumentDefinition } from 'mongoose';

import User, { UserDocument } from '../models/User.model';

export const createUser = async (input: DocumentDefinition<
	Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >) => {
  try {
    return await User.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
};
