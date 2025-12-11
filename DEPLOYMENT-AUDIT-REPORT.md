# SCALE BREAKERS WEBSITE - COMPREHENSIVE AUDIT & DEPLOYMENT GUIDE
**Generated:** December 5, 2024
**Site:** www.scalebreakers.space
**Stack:** React 19, Express, tRPC, MySQL/PostgreSQL, Stripe

---

## ✅ FIXES COMPLETED TODAY

1. ✅ Workshops.tsx - Added missing Link import (prevented runtime error)
2. ✅ Services3DScanning.tsx - Removed duplicate Header component
3. ✅ Services3DModelling.tsx - Removed duplicate Header component  
4. ✅ Services3DScanning.tsx - Removed duplicate Footer (standalone footer section)
5. ✅ Services3DModelling.tsx - Removed duplicate Footer (standalone footer section)
6. ✅ Services.tsx - Added 3rd card for 3D Modelling service (was missing link from Services landing)
7. ✅ Services3DModelling.tsx - Added pricing tiers ($500-1k, $1-3k, $3k+)
8. ✅ Portfolio.tsx - Completely rewritten as clean 3-section showcase (removed service pitches, CTAs, "Digital Services" section)
9. ✅ Portfolio.tsx - Integrated database products with SOLD badges and 1/1 markers
10. ✅ Portfolio.tsx - Hidden all 18 placeholder image grids
11. ✅ App.tsx - Removed HireMe route completely
12. ✅ Footer.tsx - Updated links (removed /hire-me, added proper service links)

---

## 🚨 CRITICAL ISSUES - MUST FIX BEFORE DEPLOYMENT

### 1. VOICE CONSISTENCY - MIXED BRANDING
**Problem:** Site switches between "I/me" (personal) and "Scale Breakers/we" (business)

**Current state:**
- ✅ Home: "Scale Breakers offers..." (business voice)
- ✅ Portfolio: "Work by Scale Breakers" (business voice)
- ⚠️ Services pages: Mixed voices
- ⚠️ Contact: Needs consistency check

**Action Required:** Standardize to "Scale Breakers" throughout (business brand voice)

### 2. DATABASE CONNECTION - NOT CONFIGURED
**Problem:** MySQL connection string still has placeholder values

**Current .env.example:**
```
DATABASE_URL=mysql://example-user:example-password@localhost:3306/main
```

**Action Required:**
1. Create MySQL database (PlanetScale) OR PostgreSQL (Render/Supabase)
2. Update DATABASE_URL in .env with real credentials
3. Run `npm run db:push` to create tables
4. Run seed.ts to populate initial data

### 3. PRODUCTS PAGE - NOW REDUNDANT
**Problem:** Products page still exists and routed, but all products moved to Portfolio

**Current state:**
- /products route still active in App.tsx
- Products.tsx still has full shopping cart UI
- Footer links to /products
- Navigation may link to /products

**Options:**
A) **Remove completely** (recommended) - Delete route, update all links to /portfolio
B) **Redirect to Portfolio** - Change route to redirect
C) **Repurpose** - Make it a "Shop" page for future sales with "Coming Soon" message

**Recommended:** Option A - Remove completely since all past work is in Portfolio

---

## ⚠️ HIGH-PRIORITY ISSUES

### 4. STRIPE INTEGRATION - NOT CONFIGURED
**Files affected:** Products.tsx, AdminProducts.tsx
**Problem:** Stripe keys not in .env, cart functionality won't work

**Action Required:**
1. Get Stripe API keys from dashboard
2. Add to .env:
```
STRIPE_SECRET_KEY=sk_test_xxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```
3. Test checkout flow or remove cart buttons if not selling yet

### 5. EMAIL SERVICE - NOT CONFIGURED  
**Files affected:** Contact.tsx, ServicesMurals.tsx, Services3DScanning.tsx, Services3DModelling.tsx
**Problem:** All contact forms use nodemailer but no email credentials configured

**Current forms:**
- Contact page - Generic contact
- ServicesMurals - Mural commission requests
- Services3DScanning - 3D scan requests
- Services3DModelling - 3D model requests
- Workshops - NDIS booking form

**Action Required:**
1. Configure SMTP in server/email configuration
2. OR integrate with email service (SendGrid, Mailgun, etc.)
3. Test all 5 forms

### 6. IMAGE UPLOADS - S3 NOT CONFIGURED
**Problem:** AWS S3 credentials in .env.example but not set up

**Action Required:**
1. Either set up AWS S3 bucket
2. OR switch to free alternative (Cloudinary, Vercel Blob)
3. Test product image uploads in admin

---

## 🧹 FILES TO DELETE (UNUSED/DEAD CODE)

### Pages (client/src/pages/)
- ❌ **About.tsx** - Not routed, /about redirects to Portfolio
- ❌ **HireMe.tsx** - Route removed, redundant with Services
- ❌ **ComponentShowcase.tsx** - Development tool only

### Root Level
- ❌ **REFACTORING_TODO.md** - Development notes (keep for now)
- ❌ **todo.md** - Development notes
- ❌ **.gitkeep** - Empty placeholder file

**Action:** Delete these files before deployment

---

## 📊 CONTENT ISSUES

### 7. Portfolio Placeholders
**Status:** Hidden in comments (good interim solution)
**Sections affected:**
- Street Art & Murals (6 placeholders)
- Workshop Highlights (8 placeholders)

**Options:**
A) Leave hidden until real images available
B) Remove placeholder divs entirely
C) Add 2-3 real images per section

**Recommended:** Option A - Leave as-is until images ready

### 8. Workshop Dates Missing
**File:** Workshops.tsx
**Problem:** Cards show duration, capacity, price but no actual dates

**Current:** "8 weeks" but no "Next Session: Jan 15"
**Impact:** Users can't plan attendance

**Solutions:**
- Add date fields to database schema
- Show "Next Session: [date]" on cards
- OR add simple "Contact for next session date" text

### 9. Voice/Tone Inconsistencies (Beyond brand name)
**Files to review:**
- Services3DScanning.tsx - Check for "I/me"
- Services3DModelling.tsx - Check for "I/me"  
- ServicesMurals.tsx - Check for "I/me"

---

## 🚀 DEPLOYMENT GUIDE - FREE HOSTING

### RECOMMENDED: RENDER.COM (100% FREE)

**Why Render:**
✅ Truly free tier (no credit card)
✅ Free PostgreSQL database
✅ Auto-deploys from GitHub
✅ Custom domain support (free SSL)
✅ 750 hours/month free (enough for 24/7 uptime)

---

## 📋 STEP-BY-STEP DEPLOYMENT TO RENDER.COM

### STEP 1: Prepare Database

**Option A: PlanetScale (MySQL - Matches current setup)**
1. Go to planetscale.com
2. Sign up free
3. Create database "scalebreakers"
4. Get connection string
5. Update DATABASE_URL in .env

**Option B: Render PostgreSQL (Free, auto-provided)**
1. Render auto-provides free PostgreSQL
2. Database already configured for PostgreSQL (drizzle schema supports both)
3. Completely free

**Recommended:** Use Render PostgreSQL (free + automatic)

### STEP 2: Prepare Code for Deployment

1. **Update .env.example** with all required vars:
```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/scalebreakers

# Stripe (if using)
STRIPE_SECRET_KEY=sk_live_xxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@scalebreakers.space
SMTP_PASS=your-app-password

# JWT
JWT_SECRET=generate-random-32-char-string

# App
PORT=3000
NODE_ENV=production
```

2. **Verify build script** in package.json:
```json
"scripts": {
  "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "cross-env NODE_ENV=production node dist/index.js"
}
```

3. **render.yaml** already included in this version

### STEP 3: Deploy to Render

1. Push code to GitHub repository
2. Go to render.com/dashboard
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Render auto-detects Node.js
6. Add environment variables from .env
7. Click "Create Web Service"
8. Wait 3-5 minutes for first deploy

### STEP 4: Connect Custom Domain (www.scalebreakers.space)

1. In Render dashboard, click your service
2. Go to "Settings" tab
3. Scroll to "Custom Domains"
4. Click "Add Custom Domain"
5. Enter: `www.scalebreakers.space`
6. Render provides DNS records to add
7. Go to your domain registrar
8. Add these DNS records:
```
Type: CNAME
Name: www
Value: [your-app].onrender.com
```
9. Wait 10-60 minutes for DNS propagation
10. Render auto-provisions free SSL certificate

### STEP 5: Database Setup

After first deploy:
```bash
# SSH into Render container (via Render Shell)
npm run db:push  # Creates tables
npm run db:seed  # Seeds initial data
```

---

## 📝 PRE-DEPLOYMENT CHECKLIST

### Code Cleanup
- [ ] Delete About.tsx, HireMe.tsx, ComponentShowcase.tsx
- [ ] Delete todo.md, .gitkeep
- [ ] Remove /products route OR repurpose page
- [ ] Standardize all voice to "Scale Breakers"
- [ ] Test all forms locally

### Configuration
- [ ] Set up database (Render PostgreSQL or PlanetScale MySQL)
- [ ] Add all environment variables to .env
- [ ] Configure email service (SMTP or SendGrid)
- [ ] Set up Stripe OR remove cart buttons
- [ ] Set up S3 OR switch to Cloudinary/Vercel Blob

### Testing
- [ ] Test locally: `npm run dev`
- [ ] Test build: `npm run build && npm run start`
- [ ] Test all navigation links
- [ ] Test all 5 contact forms
- [ ] Test workshop booking flow
- [ ] Test admin pages (if using)

### Deployment
- [ ] Push clean code to GitHub
- [ ] Deploy to Render.com
- [ ] Run database migrations
- [ ] Seed initial data
- [ ] Connect www.scalebreakers.space domain
- [ ] Test live site thoroughly
- [ ] Monitor error logs first 24 hours

---

## 🎯 RECOMMENDED PRIORITY ORDER

**Day 1 (Critical - 2 hours):**
1. Delete unused files (5 min)
2. Fix voice consistency to "Scale Breakers" (30 min)
3. Set up database (Render PostgreSQL) (15 min)
4. Configure environment variables (20 min)
5. Decide on /products route (remove or redirect) (10 min)
6. Test locally end-to-end (40 min)

**Day 2 (Deploy - 1 hour):**
1. Push to GitHub (5 min)
2. Deploy to Render.com (10 min)
3. Connect domain DNS (15 min)
4. Run database setup (10 min)
5. Final testing (20 min)

**Day 3 (Polish - Optional):**
1. Add real portfolio images
2. Set up Stripe if selling products
3. Configure email properly
4. Add workshop dates

---

## 🆘 TROUBLESHOOTING

### "Cannot connect to database"
- Check DATABASE_URL format
- Ensure database connection is allowed from Render IP
- Check SSL settings in connection string

### "Forms not sending"
- Check SMTP credentials
- Check nodemailer configuration in server
- Test with console.log to see if form data arrives

### "Build fails on Render"
- Check build logs in Render dashboard
- Ensure all dependencies in package.json
- Check Node version compatibility

### "Domain not connecting"
- Wait longer (DNS can take 1-2 hours)
- Check DNS records match Render's exactly
- Try without www first (scalebreakers.space)
- Clear browser cache

### "Site loads but no data"
- Check if database migrations ran
- Check if seed script executed
- Check database connection in logs
- Verify DATABASE_URL in Render environment variables

---

END OF AUDIT REPORT
