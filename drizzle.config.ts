import type { Config } from 'drizzle-kit';
import { dbConfig } from './src/config/database';

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user,
    password: dbConfig.password,
  },
} satisfies Config;
