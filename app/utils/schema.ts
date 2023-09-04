import { z } from 'zod';

export const signUpFieldsSchema = z.object({
  username: z.string().min(3, "Must be at least three characters long").max(50),
  password: z.string().min(6, "Must be at least 6 characters long").max(50),
})

export type SignUpError = z.inferFlattenedErrors<typeof signUpFieldsSchema>;
