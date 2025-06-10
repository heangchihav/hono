import type { Context, MiddlewareHandler, Next } from 'hono';

/**
 * Global error handler middleware
 */
export const errorHandler: MiddlewareHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error('Caught error in middleware:', error);
    
    // Determine status code based on error type
    let status = 500;
    let message = 'Internal server error';
    
    if (error instanceof Error) {
      message = error.message;
      
      // You can add custom error handling based on error types
      // if (error instanceof CustomError) status = 400;
    }
    
    return c.json({ success: false, error: message }, status as any);
  }
};
