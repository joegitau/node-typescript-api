import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object(
    {
      email: string({ required_error: 'Email is required!' }).email('Not a valid email address!'),
      username: string({ required_error: 'Username is required!' }),
      password: string({ required_error: 'Password is required!' })
        .min(6, 'Password must be at least 6 characters'),
      passwordConfirmation: string({ required_error: 'Please confirm password!' }),
    },
  ).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match!',
    path: ['passwordConfirmation'],
  }),
});

// create a sample interface to cast user
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>;
