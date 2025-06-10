import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import userRouter from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';

// Create Hono app
const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', errorHandler);

// Health check route
app.get('/', (c) => c.json({ status: 'ok', message: 'API is running' }));

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
