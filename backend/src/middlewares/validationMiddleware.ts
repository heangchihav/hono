import type { Context, MiddlewareHandler, Next } from 'hono';
import { ZodSchema } from 'zod';

/**
 * Creates a middleware to validate request body against a Zod schema
 * @param schema Zod schema to validate against
 */
export const validateRequest = (schema: ZodSchema): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      const result = schema.safeParse(body);
      
      if (!result.success) {
        const errors = result.error.errors.map(error => ({
          path: error.path.join('.'),
          message: error.message,
        }));
        
        return c.json({ 
          success: false, 
          error: 'Validation failed', 
          details: errors 
        }, 400);
      }
      
      // Store validated data in the context for handlers to use
      c.set('validated', result.data);
      await next();
    } catch (error) {
      return c.json({ 
        success: false, 
        error: 'Invalid JSON payload' 
      }, 400);
    }
  };
};

/**
 * Creates a middleware to validate URL parameters against a Zod schema
 * @param schema Zod schema to validate against
 */
export const validateParams = (schema: ZodSchema): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    try {
      const params = c.req.param();
      const result = schema.safeParse(params);
      
      if (!result.success) {
        const errors = result.error.errors.map(error => ({
          path: error.path.join('.'),
          message: error.message,
        }));
        
        return c.json({ 
          success: false, 
          error: 'Invalid parameters', 
          details: errors 
        }, 400);
      }
      
      // Store validated params in the context
      c.set('validatedParams', result.data);
      await next();
    } catch (error) {
      return c.json({ 
        success: false, 
        error: 'Invalid parameters' 
      }, 400);
    }
  };
};

/**
 * Creates a middleware to validate query parameters against a Zod schema
 * @param schema Zod schema to validate against
 */
export const validateQuery = (schema: ZodSchema): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    try {
      const query = c.req.query();
      const result = schema.safeParse(query);
      
      if (!result.success) {
        const errors = result.error.errors.map(error => ({
          path: error.path.join('.'),
          message: error.message,
        }));
        
        return c.json({ 
          success: false, 
          error: 'Invalid query parameters', 
          details: errors 
        }, 400);
      }
      
      // Store validated query in the context
      c.set('validatedQuery', result.data);
      await next();
    } catch (error) {
      return c.json({ 
        success: false, 
        error: 'Invalid query parameters' 
      }, 400);
    }
  };
};
