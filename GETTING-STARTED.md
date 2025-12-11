# 🚀 Getting Started with Scale Breakers Website

**The simplest possible guide to get your website running.**

## Step 1: Install Everything

Open your terminal and run these commands:

```bash
# Navigate to the project
cd C:\Users\danka\Documents\SB_WEBSITE_VERSIONS\FINAL_VERSION

# Install all dependencies (this will take a few minutes)
pnpm install
```

## Step 2: Set Up Database

You have two options:

### Option A: Quick Test (No Database)
Just want to see it run? Skip database setup for now. The site will work but features like contact forms won't save.

### Option B: Real Database (Recommended)

**For Local Development (MySQL):**
1. Download and install MySQL from https://dev.mysql.com/downloads/installer/
2. During installation, remember your password
3. Create a database named `scalebreakers`
4. Update `.env` file with your credentials

**For Production (PostgreSQL on Render.com - FREE):**
1. Go to https://dashboard.render.com/
2. Sign up (free, no credit card)
3. Click "New +" → "PostgreSQL"
4. Copy the "External Database URL"
5. Use this URL in your `.env`

## Step 3: Configure Environment

```bash
# Copy the example environment file
copy .env.example .env

# Edit .env with your settings
notepad .env
```

Add your database URL:
```
DATABASE_URL=mysql://root:yourpassword@localhost:3306/scalebreakers
```

## Step 4: Run the Site

```bash
# Start the development server
pnpm dev
```

Your site is now running at **http://localhost:5173** 🎉

## Step 5: Deploy to Internet (When Ready)

The easiest way is Render.com (100% free):

1. Push your code to GitHub
2. Go to https://dashboard.render.com/
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` file and deploy!

Your site will be live at `https://your-site-name.onrender.com`

## Common Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Test database connection
pnpm db:test

# Update database schema
pnpm db:push

# Check for TypeScript errors
pnpm check

# Format code
pnpm format
```

## Need Help?

- **Database issues?** See `docs/QUICK-START.md`
- **Deployment problems?** See `docs/DEPLOYMENT-AUDIT-REPORT.md`
- **Want to use Supabase?** See `docs/SUPABASE-DEPLOYMENT.md`
- **General questions?** Check `README.md`

## What's Next?

1. ✅ Get the site running locally (you're here!)
2. 📝 Update content (edit files in `client/pages/`)
3. 🎨 Customize styling (edit Tailwind classes)
4. 💾 Set up real database
5. 🚀 Deploy to production
6. 🌐 Connect your domain (www.scalebreakers.space)

---

**That's it! You're ready to build.** 🎉
