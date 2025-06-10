import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { dbConfig } from '../config/database';

// Create PostgreSQL connection
const connectionString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
const client = postgres(connectionString);

// Create Drizzle ORM instance
export const db = drizzle(client);

// Export client for use in migrations
export { client };
