#!/usr/bin/env node

/**
 * Setup Validation Script
 * Checks if environment is properly configured before development
 * Run with: node setup-check.mjs
 */

import { readFile, access } from 'fs/promises';
import { createConnection } from 'mysql2/promise';
import postgres from 'postgres';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
};

const { reset, green, red, yellow, blue, bold } = colors;

// Check results
const checks = {
  passed: [],
  warnings: [],
  failed: [],
};

function logSection(title) {
  console.log(`\n${bold}${blue}━━━ ${title} ━━━${reset}`);
}

function logPass(message) {
  console.log(`${green}✓${reset} ${message}`);
  checks.passed.push(message);
}

function logWarn(message) {
  console.log(`${yellow}⚠${reset} ${message}`);
  checks.warnings.push(message);
}

function logFail(message) {
  console.log(`${red}✗${reset} ${message}`);
  checks.failed.push(message);
}

function logInfo(message) {
  console.log(`  ${message}`);
}

// Check if file exists
async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// Check Node.js version
async function checkNodeVersion() {
  logSection('Node.js Version');
  const version = process.version;
  const major = parseInt(version.slice(1).split('.')[0]);
  
  if (major >= 18) {
    logPass(`Node.js ${version} (meets requirement: ≥18)`);
  } else {
    logFail(`Node.js ${version} (requires ≥18)`);
    logInfo('Install from: https://nodejs.org/');
  }
}

// Check if pnpm is installed
async function checkPackageManager() {
  logSection('Package Manager');
  try {
    const { execSync } = await import('child_process');
    const pnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim();
    logPass(`pnpm ${pnpmVersion} installed`);
  } catch {
    logFail('pnpm not found');
    logInfo('Install with: npm install -g pnpm');
  }
}

// Check if node_modules exists
async function checkDependencies() {
  logSection('Dependencies');
  const exists = await fileExists(join(__dirname, 'node_modules'));
  
  if (exists) {
    logPass('node_modules/ exists');
  } else {
    logFail('node_modules/ not found');
    logInfo('Run: pnpm install');
  }
}

// Check .env file
async function checkEnvFile() {
  logSection('Environment Configuration');
  const envPath = join(__dirname, '.env');
  const exists = await fileExists(envPath);
  
  if (!exists) {
    logFail('.env file not found');
    logInfo('Copy .env.example to .env and configure it');
    logInfo('Run: cp .env.example .env  (Mac/Linux)');
    logInfo('Run: copy .env.example .env  (Windows)');
    return null;
  }
  
  logPass('.env file exists');
  
  // Parse .env
  try {
    const content = await readFile(envPath, 'utf-8');
    const env = {};
    content.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        env[match[1].trim()] = match[2].trim();
      }
    });
    
    return env;
  } catch (error) {
    logFail(`Error reading .env: ${error.message}`);
    return null;
  }
}

// Check database configuration
async function checkDatabase(env) {
  logSection('Database Configuration');
  
  if (!env || !env.DATABASE_URL) {
    logFail('DATABASE_URL not configured in .env');
    logInfo('Add DATABASE_URL to .env file');
    return;
  }
  
  const dbUrl = env.DATABASE_URL;
  
  // Detect database type
  if (dbUrl.startsWith('mysql://')) {
    logInfo('Detected: MySQL');
    await testMySQLConnection(dbUrl);
  } else if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
    logInfo('Detected: PostgreSQL');
    await testPostgreSQLConnection(dbUrl);
  } else {
    logFail('Invalid DATABASE_URL format');
    logInfo('Should start with mysql:// or postgresql://');
  }
}

// Test MySQL connection
async function testMySQLConnection(dbUrl) {
  try {
    const connection = await createConnection(dbUrl);
    await connection.ping();
    await connection.end();
    logPass('MySQL connection successful');
  } catch (error) {
    logFail(`MySQL connection failed: ${error.message}`);
    logInfo('Check that MySQL is running');
    logInfo('Verify credentials in DATABASE_URL');
  }
}

// Test PostgreSQL connection
async function testPostgreSQLConnection(dbUrl) {
  let sql;
  try {
    sql = postgres(dbUrl, { max: 1 });
    await sql`SELECT 1`;
    logPass('PostgreSQL connection successful');
  } catch (error) {
    logFail(`PostgreSQL connection failed: ${error.message}`);
    logInfo('Check that PostgreSQL is running');
    logInfo('Verify credentials in DATABASE_URL');
  } finally {
    if (sql) await sql.end();
  }
}

// Check required environment variables
async function checkRequiredVars(env) {
  logSection('Required Environment Variables');
  
  if (!env) return;
  
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'PORT',
  ];
  
  const optional = [
    'STRIPE_SECRET_KEY',
    'SMTP_HOST',
    'AWS_ACCESS_KEY_ID',
  ];
  
  required.forEach(varName => {
    if (env[varName] && env[varName] !== '') {
      logPass(varName);
    } else {
      logFail(`${varName} not set`);
    }
  });
  
  // Check for placeholder values
  if (env.JWT_SECRET === 'your-jwt-secret-change-in-production' || 
      env.JWT_SECRET === 'change-this-to-random-32-char-string-in-production') {
    logWarn('JWT_SECRET is using placeholder value');
    logInfo('Generate secure secret: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
  }
  
  console.log(`\n${bold}Optional (for full functionality):${reset}`);
  optional.forEach(varName => {
    if (env[varName] && env[varName] !== '') {
      logInfo(`${green}✓${reset} ${varName}`);
    } else {
      logInfo(`${yellow}○${reset} ${varName} (not configured)`);
    }
  });
}

// Check port availability
async function checkPort(env) {
  logSection('Port Availability');
  
  const port = env?.PORT || 3000;
  
  try {
    const { createServer } = await import('net');
    const server = createServer();
    
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.once('listening', () => {
        server.close();
        resolve();
      });
      server.listen(port);
    });
    
    logPass(`Port ${port} is available`);
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      logWarn(`Port ${port} is already in use`);
      logInfo('Choose a different PORT in .env or stop the other service');
    } else {
      logWarn(`Could not check port: ${error.message}`);
    }
  }
}

// Check project structure
async function checkProjectStructure() {
  logSection('Project Structure');
  
  const requiredDirs = [
    'client',
    'server',
    'shared',
    'drizzle',
  ];
  
  const requiredFiles = [
    'package.json',
    'vite.config.ts',
    'drizzle.config.ts',
  ];
  
  for (const dir of requiredDirs) {
    const exists = await fileExists(join(__dirname, dir));
    if (exists) {
      logPass(`${dir}/ exists`);
    } else {
      logFail(`${dir}/ missing`);
    }
  }
  
  for (const file of requiredFiles) {
    const exists = await fileExists(join(__dirname, file));
    if (exists) {
      logPass(`${file} exists`);
    } else {
      logFail(`${file} missing`);
    }
  }
}

// Print summary
function printSummary() {
  console.log('\n' + '═'.repeat(50));
  console.log(`${bold}Setup Check Summary${reset}`);
  console.log('═'.repeat(50));
  
  console.log(`${green}✓ Passed:${reset}   ${checks.passed.length}`);
  console.log(`${yellow}⚠ Warnings:${reset} ${checks.warnings.length}`);
  console.log(`${red}✗ Failed:${reset}   ${checks.failed.length}`);
  
  if (checks.failed.length === 0 && checks.warnings.length === 0) {
    console.log(`\n${green}${bold}✓ All checks passed! Ready to develop.${reset}`);
    console.log(`\nNext steps:`);
    console.log(`  1. Run: ${bold}npm run db:push${reset} (create database tables)`);
    console.log(`  2. Run: ${bold}node seed-simple.mjs${reset} (add sample data)`);
    console.log(`  3. Run: ${bold}npm run dev${reset} (start development server)`);
  } else if (checks.failed.length === 0) {
    console.log(`\n${yellow}${bold}⚠ Setup complete with warnings${reset}`);
    console.log(`Review warnings above. You can still proceed if they're optional.`);
  } else {
    console.log(`\n${red}${bold}✗ Setup incomplete${reset}`);
    console.log(`Fix failed checks above before proceeding.`);
  }
  
  console.log();
}

// Main execution
async function main() {
  console.log(`${bold}${blue}`);
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Scale Breakers - Setup Validator       ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log(`${reset}`);
  
  await checkNodeVersion();
  await checkPackageManager();
  await checkDependencies();
  await checkProjectStructure();
  
  const env = await checkEnvFile();
  await checkRequiredVars(env);
  await checkDatabase(env);
  await checkPort(env);
  
  printSummary();
}

main().catch(error => {
  console.error(`${red}Fatal error:${reset}`, error);
  process.exit(1);
});
