import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run drizzle commands");
}

// Auto-detect database type from connection string
const isPostgres = connectionString.startsWith('postgres://') || connectionString.startsWith('postgresql://');
const isMySQL = connectionString.startsWith('mysql://');

if (!isPostgres && !isMySQL) {
  throw new Error('DATABASE_URL must start with postgres://, postgresql://, or mysql://');
}

const dialect = isPostgres ? 'postgresql' : 'mysql';
console.log(`Drizzle Config: Using ${dialect} dialect`);

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: dialect as 'postgresql' | 'mysql',
  dbCredentials: {
    url: connectionString,
  },
});
