import { Hono } from 'hono';
import * as userController from '../controllers/userController';
import { validateRequest } from '../middlewares/validationMiddleware';
import { createUserSchema, updateUserSchema } from '../schemas/userSchema';
import { z } from 'zod';

// Create a router for user routes
const userRouter = new Hono();

// ID parameter validation schema
const idParamSchema = z.object({
  id: z.string().transform(val => Number(val))
});

// Define routes with validation
userRouter.get('/', userController.getUsers);

// Validate ID parameter
userRouter.get('/:id', async (c, next) => {
  const id = c.req.param('id');
  const result = idParamSchema.safeParse({ id });
  
  if (!result.success) {
    return c.json({ success: false, error: 'Invalid ID format' }, 400);
  }
  
  await next();
}, userController.getUserById);

// Validate request body for user creation
userRouter.post('/', validateRequest(createUserSchema), userController.createUser);

// Validate ID parameter and request body for user update
userRouter.put('/:id', async (c, next) => {
  const id = c.req.param('id');
  const result = idParamSchema.safeParse({ id });
  
  if (!result.success) {
    return c.json({ success: false, error: 'Invalid ID format' }, 400);
  }
  
  await next();
}, validateRequest(updateUserSchema), userController.updateUser);

// Validate ID parameter for user deletion
userRouter.delete('/:id', async (c, next) => {
  const id = c.req.param('id');
  const result = idParamSchema.safeParse({ id });
  
  if (!result.success) {
    return c.json({ success: false, error: 'Invalid ID format' }, 400);
  }
  
  await next();
}, userController.deleteUser);

export default userRouter;
