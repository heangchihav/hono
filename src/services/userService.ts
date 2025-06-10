import { db } from '../db/connection';
import { users } from '../db/schema';
import type { User, NewUser } from '../db/schema';
import { eq } from 'drizzle-orm';

/**
 * Get all users from the database
 */
export const getAllUsers = async (): Promise<User[]> => {
  return await db.select().from(users);
};

/**
 * Get a user by ID
 */
export const getUserById = async (id: number): Promise<User | undefined> => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0];
};

/**
 * Create a new user
 */
export const createUser = async (userData: NewUser): Promise<User> => {
  const result = await db.insert(users).values(userData).returning();
  if (!result[0]) throw new Error('Failed to create user');
  return result[0];
};

/**
 * Update an existing user
 */
export const updateUser = async (id: number, userData: Partial<NewUser>): Promise<User | undefined> => {
  const result = await db
    .update(users)
    .set({ ...userData, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
  return result[0];
};

/**
 * Delete a user by ID
 */
export const deleteUser = async (id: number): Promise<boolean> => {
  const result = await db.delete(users).where(eq(users.id, id)).returning();
  return result.length > 0;
};
