import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, client } from './connection';

// Run migrations
async function runMigrations() {
  console.log('Running migrations...');
  
  try {
    await migrate(db, { migrationsFolder: './src/db/migrations' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.end();
  }
}

runMigrations();
