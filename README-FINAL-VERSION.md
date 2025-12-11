# Scale Breakers Website - FINAL PRODUCTION VERSION

This is the **final merged version** combining the best elements from three development versions:
- Version 1 ("newest") - Latest code, cleanest structure, best refactoring plan
- Version 2 ("biggest") - Comprehensive deployment documentation and scripts
- Version 3 ("website_render_final_fixes") - Render.com specific configurations

## ✨ What Makes This Version Special

### From Version 1 (Base):
- ✅ Latest React 19.1.1
- ✅ Cleanest, most maintainable codebase
- ✅ Comprehensive REFACTORING_TODO.md (14-phase restructuring plan)
- ✅ WEBSITE_REVIEW.md documenting deployment status
- ✅ Latest vite-plugin-manus-runtime 0.0.42
- ✅ Builder.io JSX location tracking

### Cross-Pollinated from Version 2:
- ✅ **cross-env** for Windows compatibility
- ✅ DEPLOYMENT-AUDIT-REPORT.md (pre-deployment checklist)
- ✅ QUICK-START.md, SUPABASE-DEPLOYMENT.md
- ✅ Deployment scripts: deploy.sh, test-db.mjs, seed-simple.mjs
- ✅ Upgraded drizzle-kit to 0.31.8

### Cross-Pollinated from Version 3:
- ✅ render.yaml for Render.com deployment
- ✅ .env.production.example
- ✅ Latest vite-plugin-prerender 1.0.8
- ✅ Latest vitest 2.1.9

### NEW in Final Version:
- ✅ **Dual Database Support** - MySQL for dev, PostgreSQL for production
- ✅ Auto-detecting drizzle.config.ts (switches dialect based on DATABASE_URL)
- ✅ Universal seed-simple.mjs (works with both MySQL and PostgreSQL)
- ✅ Universal test-db.mjs (tests both database types)
- ✅ Complete deployment documentation merged and updated

## 🗄️ Dual Database Strategy

This version supports **both MySQL and PostgreSQL** automatically:

### For Local Development (MySQL):
```env
DATABASE_URL=mysql://user:password@localhost:3306/scalebreakers
```
- Simpler to set up locally
- Compatible with XAMPP, MAMP, or standalone MySQL
- Perfect for development and testing

### For Production (PostgreSQL):
```env
DATABASE_URL=postgresql://user:password@host:5432/scalebreakers
```
- Free hosting on Render.com or Supabase
- Auto-detected and configured
- Production-ready scaling

**The system automatically detects which database you're using and configures everything accordingly!**

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 2. Set Up Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your database credentials
# For MySQL (development):
DATABASE_URL=mysql://root:password@localhost:3306/scalebreakers

# OR for PostgreSQL (production):
DATABASE_URL=postgresql://user:pass@host:5432/scalebreakers
```

### 3. Set Up Database
```bash
# Create tables
npm run db:push

# Seed with sample data
node seed-simple.mjs

# Test connection
node test-db.mjs
```

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## 📦 New Package.json Scripts

```json
{
  "dev": "cross-env NODE_ENV=development tsx watch server/_core/index.ts",
  "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "cross-env NODE_ENV=production node dist/index.js",
  "db:push": "drizzle-kit generate && drizzle-kit migrate",
  "db:test": "node test-db.mjs",
  "db:seed": "node seed-simple.mjs",
  "deploy": "bash deploy.sh"
}
```

## 🌐 Deployment Options

### Option A: Render.com (Recommended - 100% Free)
1. **Push to GitHub**
2. **Go to render.com** → New Web Service
3. **Connect GitHub repo**
4. **Add environment variables** (from .env.production.example)
5. **Deploy!** (Render uses render.yaml configuration)

**Database:** Render provides free PostgreSQL automatically

### Option B: PlanetScale + Vercel
1. **Database:** PlanetScale (free MySQL)
2. **Frontend:** Vercel (free hosting)
3. **Backend:** Vercel serverless functions

### Option C: Supabase
1. **Database + Hosting:** All-in-one on Supabase
2. Follow SUPABASE-DEPLOYMENT.md guide

## 📋 Pre-Deployment Checklist

See **DEPLOYMENT-AUDIT-REPORT.md** for complete checklist. Key items:

- [ ] Configure DATABASE_URL in production
- [ ] Set up Stripe keys (or remove cart functionality)
- [ ] Configure email service (SMTP)
- [ ] Set up image storage (AWS S3 or Cloudinary)
- [ ] Fix voice consistency (use "Scale Breakers" throughout)
- [ ] Test all 5 contact forms
- [ ] Remove unused files (About.tsx, HireMe.tsx, ComponentShowcase.tsx)
- [ ] Test build: `npm run build && npm run start`

## 🔧 Key Configuration Files

### drizzle.config.ts
- Auto-detects MySQL vs PostgreSQL from DATABASE_URL
- Automatically switches dialect
- No manual configuration needed!

### render.yaml
- Pre-configured for Render.com deployment
- All environment variables listed
- JWT_SECRET auto-generated

### seed-simple.mjs
- Works with both MySQL and PostgreSQL
- Detects database type automatically
- Creates sample portfolio, products, workshops

### test-db.mjs
- Tests database connection
- Works with both database types
- Shows record counts

## 📁 Project Structure

```
scalebreakers/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utilities and configs
├── server/              # Express backend
│   ├── _core/           # Server initialization
│   ├── routes/          # tRPC routes
│   └── services/        # Business logic
├── drizzle/             # Database schema & migrations
├── shared/              # Shared types & utilities
├── .env.example         # Environment template
├── .env.production.example  # Production template
├── render.yaml          # Render.com config
├── deploy.sh            # Deployment script
├── test-db.mjs          # Database test script
├── seed-simple.mjs      # Database seeding script
└── package.json         # Dependencies & scripts
```

## 🛠️ Technologies

- **Frontend:** React 19, Vite, TailwindCSS 4, Radix UI
- **Backend:** Express, tRPC
- **Database:** MySQL (dev) / PostgreSQL (production), Drizzle ORM
- **Payments:** Stripe
- **Email:** Nodemailer
- **Storage:** AWS S3 (optional)
- **Deployment:** Render.com / Vercel / Supabase

## 📚 Documentation Files

- **DEPLOYMENT-AUDIT-REPORT.md** - Complete deployment guide and issue checklist
- **REFACTORING_TODO.md** - 14-phase code improvement plan
- **WEBSITE_REVIEW.md** - Current status and completions
- **SUPABASE-DEPLOYMENT.md** - Supabase-specific deployment guide
- **QUICK-START.md** - Fast deployment guide
- **.env.example** - Development environment template
- **.env.production.example** - Production environment template

## 🎯 Next Steps

1. **Review DEPLOYMENT-AUDIT-REPORT.md** for critical issues
2. **Set up your database** (MySQL locally or PostgreSQL for production)
3. **Test locally** with `npm run dev`
4. **Follow deployment guide** for your chosen platform
5. **Connect custom domain** (www.scalebreakers.space)

## ⚠️ Critical Issues to Fix Before Deployment

See DEPLOYMENT-AUDIT-REPORT.md for complete list. Top 3:

1. **Voice Consistency** - Standardize to "Scale Breakers" (not "I/me")
2. **Database Connection** - Set up real DATABASE_URL (not placeholder)
3. **Products Page** - Remove or repurpose (currently redundant with Portfolio)

## 🆘 Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL format matches your database type
- MySQL: `mysql://user:pass@host:3306/database`
- PostgreSQL: `postgresql://user:pass@host:5432/database`

### "Cross-env not found"
```bash
npm install cross-env
```

### "Drizzle dialect error"
- Ensure DATABASE_URL starts with `mysql://` or `postgresql://`
- Check drizzle.config.ts console output

### "Build fails"
```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
npm run build
```

## 📞 Support

- Check documentation files in project root
- Review DEPLOYMENT-AUDIT-REPORT.md for common issues
- Test locally before deploying: `npm run dev`
- Use test-db.mjs to verify database connection

---

**Built with ❤️ for Scale Breakers**
**Ready for production deployment!** 🚀
