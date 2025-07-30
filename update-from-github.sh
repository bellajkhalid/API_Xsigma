#!/bin/bash

# API XSigma Update Script
# Run this script ON THE SERVER to update from GitHub

echo "🔄 API XSigma Update Script"
echo "=========================="

PROJECT_DIR="/home/debian/api-xsigma"

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Project directory not found: $PROJECT_DIR"
    echo "Please run the initial deployment first."
    exit 1
fi

cd "$PROJECT_DIR"

echo "📥 Step 1: Pulling latest changes from GitHub..."

# Pull latest changes
git pull origin main

if [ $? -ne 0 ]; then
    echo "❌ Failed to pull from GitHub"
    exit 1
fi

echo "📦 Step 2: Updating Backend..."

# Update backend dependencies
cd Backend_Xsigma
npm install

echo "🌐 Step 3: Updating Frontend..."

# Update and rebuild frontend
cd ../Frontend_Xsigma
npm install
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build frontend"
    exit 1
fi

echo "📚 Step 3.1: Copying documentation files..."

# Copy built frontend to nginx directory
sudo rm -rf /home/debian/api-xsigma/frontend-dist
sudo cp -r dist /home/debian/api-xsigma/frontend-dist
sudo chown -R www-data:www-data /home/debian/api-xsigma/frontend-dist

# Verify documentation files are copied
if [ -d "/home/debian/api-xsigma/frontend-dist/sphinx-doc" ]; then
    echo "✅ Documentation files copied successfully"
else
    echo "❌ Documentation files not found in build"
fi

echo "🔄 Step 4: Restarting application..."

# Restart the backend application
cd ../Backend_Xsigma
pm2 restart api-xsigma-backend

# Wait a moment for restart
sleep 3

# Check if application is running
if pm2 list | grep -q "api-xsigma-backend.*online"; then
    echo "✅ Application restarted successfully"
else
    echo "❌ Application failed to restart"
    pm2 logs api-xsigma-backend --lines 10
    exit 1
fi

echo ""
echo "🎉 Update completed successfully!"
echo ""
echo "📋 Your updated application is available at:"
echo "  🌐 Frontend: http://51.83.47.117/"
echo "  📊 Backend API: http://51.83.47.117/api/"
echo "  📚 API Documentation: http://51.83.47.117/api/api-docs"
echo ""
echo "🔍 To check status:"
echo "  pm2 status"
echo "  pm2 logs api-xsigma-backend"
