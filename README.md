# Scale Breakers Website - Final Production Version

🎨 **The complete, production-ready Scale Breakers website with all features merged and deployment-ready.**

## 🚀 What's New in This Version

This is the **final merged version** combining the best features from 3 different builds:
- ✅ Latest React 19.1.1 and cleanest codebase (v1)
- ✅ Complete deployment infrastructure and documentation (v2)
- ✅ Render.com deployment files and VSCode configuration (v3)
- ✅ Dual database support (MySQL for dev, PostgreSQL for production)
- ✅ Cross-platform compatibility (Windows/Mac/Linux)

## 📦 Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# For local MySQL development:
DATABASE_URL=mysql://user:password@localhost:3306/scalebreakers

# For production PostgreSQL (Render/Supabase):
DATABASE_URL=postgresql://user:password@host:5432/database

# Run database migrations
pnpm db:push

# Test database connection
pnpm db:test

# Seed database with sample data (optional)
pnpm db:seed

# Start development server
pnpm dev
```

Visit `http://localhost:5173` to see your site!

## 🗂️ Project Structure

```
FINAL_VERSION/
├── client/              # React frontend components
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   └── lib/             # Utilities and hooks
├── server/              # Express backend
│   ├── _core/           # Server initialization
│   ├── routes/          # API routes
│   └── db/              # Database logic
├── shared/              # Shared types and utilities
├── drizzle/             # Database schema and migrations
├── scripts/             # Deployment and utility scripts
├── docs/                # Full documentation
│   ├── DEPLOYMENT-AUDIT-REPORT.md
│   ├── QUICK-START.md
│   ├── SUPABASE-DEPLOYMENT.md
│   └── PRODUCTION-OPTIMIZATION-PR.md
├── .vscode/             # VSCode settings
├── render.yaml          # Render.com deployment config
└── deploy.sh            # Deployment script
```

## 🎯 Available Scripts


| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm check` | Type-check TypeScript |
| `pnpm format` | Format code with Prettier |
| `pnpm test` | Run tests |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:test` | Test database connection |
| `pnpm db:seed` | Seed database with sample data |
| `pnpm deploy` | Deploy to production |

## 💾 Database Configuration

### Development (MySQL - Recommended for Local)
1. Install MySQL locally or use a free service like PlanetScale
2. Set `DATABASE_URL=mysql://user:password@localhost:3306/scalebreakers`
3. Run `pnpm db:push`

### Production (PostgreSQL - Render/Supabase)
1. Create a PostgreSQL database on Render.com or Supabase
2. Set `DATABASE_URL=postgresql://...` (from your hosting provider)
3. Run `pnpm db:push`

The config **automatically detects** which database you're using based on the connection string!

## 🚀 Deployment Options

### Option 1: Render.com (Recommended - 100% Free)

**Why Render?**
- ✅ Completely free (no credit card required)
- ✅ PostgreSQL database included
- ✅ Auto-deploy from GitHub
- ✅ SSL certificates included
- ✅ Easy environment variable management

**Steps:**
1. Push code to GitHub
2. Sign up at render.com
3. Click "New +" → "Web Service"
4. Connect your repository
5. Render will auto-detect `render.yaml` and deploy!

See `docs/DEPLOYMENT-AUDIT-REPORT.md` for complete checklist.

### Option 2: Vercel + PlanetScale
- Requires serverless restructure
- Free MySQL database
- Lightning-fast CDN

### Option 3: Supabase
- PostgreSQL with real-time features
- Authentication built-in
- Free tier available

## 🔧 Configuration Files

### Essential Files to Configure

1. **`.env`** - Environment variables (copy from `.env.example`)
   ```env
   DATABASE_URL=your_database_url
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   AWS_S3_BUCKET=your_bucket
   EMAIL_USER=your@email.com
   EMAIL_PASS=your_app_password
   ```

2. **`render.yaml`** - Already configured for Render.com deployment

3. **`vite.config.ts`** - Build configuration (already optimized)

## ⚠️ Known Issues & Fixes Needed

### Critical (Must Fix Before Production)
- [ ] Configure real database (currently placeholder credentials)
- [ ] Set up Stripe keys for workshop payments
- [ ] Configure email service (nodemailer) for contact form
- [ ] Set up S3 bucket for image uploads
- [ ] Fix voice consistency (switch to "I/me" throughout)

### Content Updates
- [ ] Add missing workshops: Diorama Build, Character Design, Tote Bag
- [ ] Reduce service pricing by $200 as discussed
- [ ] Remove Products page (moved to Portfolio)
- [ ] Delete unused files: About.tsx, HireMe.tsx, ComponentShowcase.tsx

### Nice to Have
- [ ] Add social media links
- [ ] Complete SEO optimization
- [ ] Add Google Analytics
- [ ] Set up automated backups

## 📚 Documentation

All documentation is in the project:

- **`REFACTORING_TODO.md`** - 14-phase restructuring plan (in progress)
- **`WEBSITE_REVIEW.md`** - Current deployment status
- **`docs/DEPLOYMENT-AUDIT-REPORT.md`** - Pre-deployment checklist
- **`docs/QUICK-START.md`** - Quick start guide
- **`docs/SUPABASE-DEPLOYMENT.md`** - Supabase deployment guide
- **`docs/PRODUCTION-OPTIMIZATION-PR.md`** - Production optimization details

## 🛠️ Tech Stack

- **Frontend:** React 19.1, TypeScript, Tailwind CSS 4
- **Backend:** Express, tRPC, Node.js
- **Database:** MySQL (dev) / PostgreSQL (prod), Drizzle ORM
- **Payments:** Stripe
- **Storage:** AWS S3
- **Deployment:** Render.com / Vercel
- **Build:** Vite 7

## 🤝 Support

For issues or questions:
1. Check the documentation in `/docs`
2. Review `REFACTORING_TODO.md` for current progress
3. Check `todo.md` for outstanding tasks

---

**Built with ❤️ by Scale Breakers**
