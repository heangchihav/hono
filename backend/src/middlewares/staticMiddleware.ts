import { serveStatic } from 'hono/bun';
import { join } from 'path';
import type { MiddlewareHandler } from 'hono';

/**
 * Middleware to serve static files from the frontend build directory
 * @param options Configuration options
 */
export const staticMiddleware = (options: { root: string }): MiddlewareHandler => {
  return serveStatic({
    root: options.root,
    rewriteRequestPath: (path) => {
      // Handle SPA routing - serve index.html for all non-file requests
      if (!path.includes('.')) {
        return '/index.html';
      }
      return path;
    }
  });
};
