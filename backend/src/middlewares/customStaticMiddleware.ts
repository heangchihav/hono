import { Context, MiddlewareHandler, Next } from 'hono';
import { join, resolve } from 'path';
import { existsSync, statSync } from 'fs';
import { readFile } from 'fs/promises';

interface StaticOptions {
  root: string;
}

/**
 * Custom static file middleware that works with older versions of Bun
 * @param options Configuration options
 */
export const customStaticMiddleware = (options: StaticOptions): MiddlewareHandler => {
  const { root } = options;
  
  // Log the root directory for debugging
  console.log(`Static middleware initialized with root directory: ${root}`);
  
  return async (c: Context, next: Next) => {
    // Skip if the request is not a GET or HEAD request
    if (c.req.method !== 'GET' && c.req.method !== 'HEAD') {
      return next();
    }
    
    // Skip API routes - let them be handled by the API handlers
    if (c.req.path.startsWith('/api/')) {
      console.log(`Skipping static middleware for API route: ${c.req.path}`);
      return next();
    }

    // Get the path from the URL
    let path = c.req.path;
    console.log(`Request path: ${path}`);
    
    // Handle SPA routing - serve index.html for paths without extensions
    if (!path.includes('.') && path !== '/') {
      path = '/index.html';
      console.log(`Rewriting to: ${path} (SPA route)`);
    } else if (path === '/') {
      path = '/index.html';
      console.log(`Rewriting to: ${path} (root path)`);
    }

    // Construct the full file path
    const filePath = join(root, path);
    console.log(`Looking for file at: ${filePath}`);
    
    // Check if the directory exists first
    if (!existsSync(root)) {
      console.error(`Static root directory does not exist: ${root}`);
      return next();
    }
    
    try {
      // Check if the file exists
      if (existsSync(filePath)) {
        const stats = statSync(filePath);
        if (stats.isFile()) {
          console.log(`Found file: ${filePath}, size: ${stats.size} bytes`);
          
          // Read the file content
          const content = await readFile(filePath);
          
          // Set the content type based on file extension
          const ext = path.split('.').pop() || '';
          const contentType = getContentType(ext);
          
          console.log(`Serving ${path} with content type: ${contentType}`);
          
          // Return the file content with appropriate content type
          return new Response(content, {
            headers: {
              'Content-Type': contentType
            }
          });
        } else {
          console.log(`Path exists but is not a file: ${filePath}`);
        }
      } else {
        console.log(`File not found: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error serving static file: ${filePath}`, error);
    }
    
    // If the file doesn't exist or there was an error, continue to the next middleware
    return next();
  };
};

// Helper function to get content type based on file extension
function getContentType(ext: string): string {
  const contentTypes: Record<string, string> = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'txt': 'text/plain'
  };
  
  return contentTypes[ext.toLowerCase()] || 'application/octet-stream';
}
