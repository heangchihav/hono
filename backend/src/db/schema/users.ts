import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

// Users table schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User type based on the schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
