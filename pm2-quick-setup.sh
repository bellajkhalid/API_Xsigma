#!/bin/bash
# 🚀 Quick PM2 Setup for XSIGMA
# Run this on the server after deployment

echo "🚀 Quick PM2 Setup for XSIGMA Backend"
echo "======================================"

# Navigate to backend directory
cd /home/debian/api-xsigma/Backend_Xsigma

# Create logs directory
mkdir -p logs
echo "✅ Created logs directory"

# Stop any existing PM2 processes
pm2 stop api-xsigma-backend 2>/dev/null || true
pm2 delete api-xsigma-backend 2>/dev/null || true
echo "✅ Cleaned existing PM2 processes"

# Start with ecosystem config
pm2 start ecosystem.config.js
echo "✅ Started application with PM2"

# Save PM2 configuration
pm2 save
echo "✅ Saved PM2 configuration"

# Show status
echo ""
echo "📊 Current Status:"
pm2 status

# Test health
echo ""
echo "🏥 Testing health..."
sleep 3
curl -s http://localhost:5005/health || echo "Health check pending..."

echo ""
echo "🎉 PM2 setup complete!"
echo "📋 Useful commands:"
echo "  pm2 status                    # Check status"
echo "  pm2 logs api-xsigma-backend  # View logs"
echo "  pm2 restart api-xsigma-backend # Restart"
echo "  pm2 monit                    # Monitor"
