import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import userRouter from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { customStaticMiddleware } from './middlewares/customStaticMiddleware';

// Create Hono app
const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', errorHandler);

// Health check route - moved to /api/health to avoid conflict with static files
app.get('/api/health', (c) => c.json({ status: 'ok', message: 'API is running' }));

// Serve static files from admin/dist directory
// This needs to be after API routes to ensure API routes take precedence
// In Docker, the admin files are mounted at /app/admin/dist
// We need to use the absolute path that will work in the Docker container
const adminPath = './admin/dist';
console.log(`Using admin path: ${adminPath}`);

app.use('*', customStaticMiddleware({
  root: adminPath
}));

// Mount routes
app.route('/api/users', userRouter);

// Error handling
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ success: false, error: 'Internal server error' }, 500);
});

// Start the server
const port = parseInt(process.env.PORT || '3000');
console.log(`Server starting on port ${port}...`);

export default {
  port,
  fetch: app.fetch,
};
