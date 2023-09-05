import { z } from 'zod';

export const signUpFieldsSchema = z.object({
  username: z.string().min(3, "Must be at least three characters long").max(50),
  password: z.string().min(6, "Must be at least 6 characters long").max(50),
})

export type SignUpError = z.inferFlattenedErrors<typeof signUpFieldsSchema>;

export const imageUploadSchema = z.object({
  image: z.string().url("Upload a image"),
  title: z.string().min(3, "Must be at least three characters long").max(50),
  description: z.string().max(250, "Description must be less than 250 characters long"),
});

export type ImageUploadError = z.inferFlattenedErrors<typeof imageUploadSchema>;
