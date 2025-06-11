import { z } from 'zod';

// User schema for validation
export const userSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  email: z.string().email('Invalid email format').max(255),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Schema for creating a new user (without id and timestamps)
export const createUserSchema = userSchema.omit({ id: true, createdAt: true, updatedAt: true });

// Schema for updating a user (all fields optional except id)
export const updateUserSchema = userSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

// Schema for user login
export const loginUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Types derived from schemas
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
