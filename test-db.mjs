// Database connection test script
// Supports both MySQL and PostgreSQL

import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not set in .env file');
  process.exit(1);
}

// Detect database type from connection string
const isPostgres = DATABASE_URL.startsWith('postgres://') || DATABASE_URL.startsWith('postgresql://');
const isMySQL = DATABASE_URL.startsWith('mysql://');

if (!isPostgres && !isMySQL) {
  console.error('❌ DATABASE_URL must start with postgres://, postgresql://, or mysql://');
  process.exit(1);
}

async function testDatabase() {
  try {
    if (isPostgres) {
      console.log('🐘 Testing PostgreSQL connection...');
      const { default: postgres } = await import('postgres');
      const sql = postgres(DATABASE_URL);
      
      try {
        const products = await sql`SELECT COUNT(*) as count FROM products`;
        console.log('✅ Products in DB:', products[0].count);
        
        const portfolio = await sql`SELECT COUNT(*) as count FROM "portfolioItems"`;
        console.log('✅ Portfolio items:', portfolio[0].count);
        
        const workshops = await sql`SELECT COUNT(*) as count FROM workshops`;
        console.log('✅ Workshops:', workshops[0].count);
        
        console.log('\n🎉 PostgreSQL connection successful!');
      } finally {
        await sql.end();
      }
    } else if (isMySQL) {
      console.log('🐬 Testing MySQL connection...');
      const { createConnection } = await import('mysql2/promise');
      const connection = await createConnection(DATABASE_URL);
      
      try {
        const [products] = await connection.execute('SELECT COUNT(*) as count FROM products');
        console.log('✅ Products in DB:', products[0].count);
        
        const [portfolio] = await connection.execute('SELECT COUNT(*) as count FROM portfolioItems');
        console.log('✅ Portfolio items:', portfolio[0].count);
        
        const [workshops] = await connection.execute('SELECT COUNT(*) as count FROM workshops');
        console.log('✅ Workshops:', workshops[0].count);
        
        console.log('\n🎉 MySQL connection successful!');
      } finally {
        await connection.end();
      }
    }
  } catch (err) {
    console.error('❌ Database error:', err.message);
    process.exit(1);
  }
}

testDatabase();
