#!/bin/bash

# Scalebreakers - Quick Deployment Script
# Usage: bash deploy.sh

set -e

echo "🚀 Scalebreakers Deployment"
echo "======================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please copy .env.example to .env and fill in your values"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install || npm install

# Run database migrations
echo "🗄️  Running database migrations..."
npm run db:push

# Seed database (optional)
echo "🌱 Seeding sample data (optional)..."
if [ -f seed-simple.mjs ]; then
    node seed-simple.mjs
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Show deployment info
echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push code to GitHub: git push origin main"
echo "2. For Render.com:"
echo "   - Go to render.com/dashboard"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Add environment variables"
echo "3. Monitor deployment in dashboard"
echo ""
echo "🎉 Your Scalebreakers site will be live soon!"
