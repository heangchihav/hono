import { z } from 'zod';

// Define the environment schema
export const envSchema = z.object({
  // Server configuration
  PORT: z.string().default('3000').transform(Number),
  
  // Database configuration
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('5432').transform(Number),
  DB_NAME: z.string().default('hono_db'),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('postgres'),
  
  // Frontend configuration
  FRONTEND_BUILD_DIR: z.string().default('../../frontend/dist'),
});

// Parse and validate environment variables
export const env = envSchema.parse(process.env);

// Type for the validated environment
export type Env = z.infer<typeof envSchema>;
