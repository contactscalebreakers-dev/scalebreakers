# Quick Start Guide - Scale Breakers Website

Get your Scale Breakers website running in 5 minutes!

## Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **pnpm** (Install: `npm install -g pnpm`)
- **MySQL** (Local) OR **PostgreSQL** (Production)

### Installing MySQL (Local Development)

**Windows:**
- Download [XAMPP](https://www.apachefriends.org/) or [MAMP](https://www.mamp.info/)
- Start MySQL service
- Default credentials: `root` / (no password)

**Mac:**
```bash
brew install mysql
brew services start mysql
```

**Linux:**
```bash
sudo apt install mysql-server
sudo systemctl start mysql
```

## Step 1: Install Dependencies

```bash
cd C:\Users\danka\Documents\SB_WEBSITE_VERSIONS\FINAL_VERSION
pnpm install
```

## Step 2: Configure Environment

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

Edit `.env` and set:

```env
# Minimum required:
DATABASE_URL=mysql://root:@localhost:3306/scalebreakers
JWT_SECRET=generate-with-command-below
PORT=3000
```

Generate JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Validate Setup

```bash
node setup-check.mjs
```

This will check:
- ✅ Node.js version
- ✅ pnpm installed
- ✅ Dependencies installed
- ✅ .env configured
- ✅ Database connection
- ✅ Port available

Fix any ❌ errors before continuing.

## Step 4: Initialize Database

```bash
# Create tables
npm run db:push

# Add sample data
node seed-simple.mjs

# Test connection (optional)
node test-db.mjs
```

## Step 5: Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## Troubleshooting

### "pnpm not found"
```bash
npm install -g pnpm
```

### "MySQL connection failed"
1. Check MySQL is running (XAMPP Control Panel)
2. Verify credentials in `.env`
3. Create database: `CREATE DATABASE scalebreakers;`

### "Port 3000 already in use"
Change `PORT=3001` in `.env`

### "node_modules not found"
```bash
pnpm install
```

### Database won't connect
```bash
# Test connection
node test-db.mjs

# Check if database exists
mysql -u root -p
> SHOW DATABASES;
> CREATE DATABASE scalebreakers;
```

---

## What's Next?

### For Development:
1. Read `README-FINAL-VERSION.md` for full documentation
2. Check `REFACTORING_TODO.md` for known issues
3. Review `WEBSITE_REVIEW.md` for content fixes needed

### Before Production:
1. Read `DEPLOYMENT-AUDIT-REPORT.md` (critical checklist)
2. Fix voice consistency (change "I/me" to "Scale Breakers")
3. Configure Stripe OR remove cart functionality
4. Set up email service (SMTP/SendGrid)
5. Configure S3 for image uploads

### Deployment:
1. Read `README-FINAL-VERSION.md` → Deployment section
2. Choose platform (Render.com recommended)
3. Follow platform-specific guide
4. Connect domain

---

## File Structure

```
FINAL_VERSION/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types
├── drizzle/         # Database migrations
├── .env             # Your config (DO NOT COMMIT)
├── package.json     # Dependencies
└── setup-check.mjs  # Setup validator
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run db:studio        # Open database GUI

# Database
npm run db:push          # Update database schema
npm run db:seed          # Add sample data
npm run db:test          # Test connection

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
npm run deploy           # Run deployment checklist
```

---

## Support

**Issues?**
1. Run `node setup-check.mjs` for diagnostics
2. Check `DEPLOYMENT-AUDIT-REPORT.md` for solutions
3. Review error logs in terminal

**Environment Issues?**
- `.env` file exists?
- Database running?
- Correct DATABASE_URL format?
- JWT_SECRET generated?

**Database Issues?**
```bash
# Reset database
npm run db:push
node seed-simple.mjs
```

---

## Remember

- ✅ Use `.env` (not .env.example)
- ✅ Generate real JWT_SECRET
- ✅ Keep `.env` private (in .gitignore)
- ✅ Run `setup-check.mjs` before starting
- ✅ MySQL for local, PostgreSQL for production

**You're ready to build! 🚀**
