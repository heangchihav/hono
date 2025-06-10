import type { Context } from 'hono';
import * as userService from '../services/userService';
import type { CreateUser, UpdateUser } from '../schemas/userSchema';

/**
 * Get all users
 */
export const getUsers = async (c: Context) => {
  try {
    const users = await userService.getAllUsers();
    return c.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return c.json({ success: false, error: 'Failed to fetch users' }, 500);
  }
};

/**
 * Get a user by ID
 */
export const getUserById = async (c: Context) => {
  try {
    const id = Number(c.req.param('id'));
    const user = await userService.getUserById(id);
    
    if (!user) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }
    
    return c.json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return c.json({ success: false, error: 'Failed to fetch user' }, 500);
  }
};

/**
 * Create a new user
 */
export const createUser = async (c: Context) => {
  try {
    // Get validated data from middleware
    const validatedData = c.get('validated') as CreateUser;
    const newUser = await userService.createUser(validatedData);
    return c.json({ success: true, data: newUser }, 201);
  } catch (error) {
    console.error('Error creating user:', error);
    return c.json({ success: false, error: 'Failed to create user' }, 500);
  }
};

/**
 * Update a user
 */
export const updateUser = async (c: Context) => {
  try {
    const id = Number(c.req.param('id'));
    // Get validated data from middleware
    const validatedData = c.get('validated') as UpdateUser;
    const updatedUser = await userService.updateUser(id, validatedData);
    
    if (!updatedUser) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }
    
    return c.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return c.json({ success: false, error: 'Failed to update user' }, 500);
  }
};

/**
 * Delete a user
 */
export const deleteUser = async (c: Context) => {
  try {
    const id = Number(c.req.param('id'));
    const success = await userService.deleteUser(id);
    
    if (!success) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }
    
    return c.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return c.json({ success: false, error: 'Failed to delete user' }, 500);
  }
};
