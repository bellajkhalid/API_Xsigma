#!/bin/bash

# API XSigma GitHub Deployment Script
# This script clones from GitHub and sets up the project on the server
# Run this script DIRECTLY ON THE SERVER

echo "🚀 API XSigma GitHub Deployment Script"
echo "======================================"

# Configuration
GITHUB_REPO="https://github.com/bellajkhalid/API_Xsigma.git"
PROJECT_DIR="/home/debian/api-xsigma"
BACKUP_DIR="/home/debian/api-xsigma-backup-$(date +%Y%m%d-%H%M%S)"

echo "📋 Deployment Configuration:"
echo "  GitHub Repo: $GITHUB_REPO"
echo "  Project Directory: $PROJECT_DIR"
echo "  User: $(whoami)"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Backup existing installation if it exists
if [ -d "$PROJECT_DIR" ]; then
    echo "📦 Backing up existing installation..."
    mv "$PROJECT_DIR" "$BACKUP_DIR"
    echo "✅ Backup created at: $BACKUP_DIR"
fi

echo "🔧 Step 1: Installing system dependencies..."

# Update system
sudo apt update
sudo apt upgrade -y

# Install Git if not present
if ! command_exists git; then
    echo "📥 Installing Git..."
    sudo apt install -y git
fi

# Install Node.js 18.x
if ! command_exists node; then
    echo "📥 Installing Node.js 18.x..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js already installed: $(node --version)"
fi

# Install Python 3 and pip
if ! command_exists python3; then
    echo "📥 Installing Python 3..."
    sudo apt install -y python3 python3-pip python3-venv
else
    echo "✅ Python 3 already installed: $(python3 --version)"
fi

# Install PM2 for process management
if ! command_exists pm2; then
    echo "📥 Installing PM2..."
    sudo npm install -g pm2
else
    echo "✅ PM2 already installed: $(pm2 --version)"
fi

# Install Nginx
if ! command_exists nginx; then
    echo "📥 Installing Nginx..."
    sudo apt install -y nginx
else
    echo "✅ Nginx already installed"
fi

echo "📥 Step 2: Cloning project from GitHub..."

# Clone the repository
git clone "$GITHUB_REPO" "$PROJECT_DIR"

if [ $? -ne 0 ]; then
    echo "❌ Failed to clone repository"
    exit 1
fi

cd "$PROJECT_DIR"

echo "📦 Step 3: Setting up Backend..."

# Navigate to backend directory
cd Backend_Xsigma

# Install backend dependencies
echo "📥 Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Create PM2 ecosystem file
echo "⚙️ Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'api-xsigma-backend',
    script: 'index.js',
    cwd: '/home/debian/api-xsigma/Backend_Xsigma',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5005
    },
    error_file: '/home/debian/logs/api-xsigma-error.log',
    out_file: '/home/debian/logs/api-xsigma-out.log',
    log_file: '/home/debian/logs/api-xsigma-combined.log'
  }]
};
EOF

# Create logs directory
mkdir -p /home/debian/logs

echo "🌐 Step 4: Setting up Frontend..."

# Navigate to frontend directory
cd ../Frontend_Xsigma

# Install frontend dependencies
echo "📥 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Build frontend
echo "🔨 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build frontend"
    exit 1
fi

echo "🔧 Step 5: Configuring Nginx..."

# Create nginx configuration
sudo tee /etc/nginx/sites-available/api-xsigma > /dev/null << 'EOF'
server {
    listen 80;
    server_name 51.83.47.117;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Frontend
    location / {
        root /home/debian/api-xsigma/Frontend_Xsigma/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5005/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:5005/health;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/api-xsigma /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

if [ $? -ne 0 ]; then
    echo "❌ Nginx configuration test failed"
    exit 1
fi

# Restart nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "🚀 Step 6: Starting the application..."

# Navigate back to backend directory
cd "$PROJECT_DIR/Backend_Xsigma"

# Stop any existing PM2 processes
pm2 delete api-xsigma-backend 2>/dev/null || true

# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

echo "🔍 Step 7: Verifying deployment..."

# Wait a moment for the application to start
sleep 5

# Check if the application is running
if pm2 list | grep -q "api-xsigma-backend.*online"; then
    echo "✅ Backend is running"
else
    echo "❌ Backend failed to start"
    pm2 logs api-xsigma-backend --lines 20
    exit 1
fi

# Check if nginx is running
if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx is running"
else
    echo "❌ Nginx is not running"
    exit 1
fi

# Test the health endpoint
if curl -f http://localhost:5005/health >/dev/null 2>&1; then
    echo "✅ Backend health check passed"
else
    echo "⚠️ Backend health check failed"
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Your application is now available at:"
echo "  🌐 Frontend: http://51.83.47.117/"
echo "  📊 Backend API: http://51.83.47.117/api/"
echo "  📚 API Documentation: http://51.83.47.117/api/api-docs"
echo "  ❤️ Health Check: http://51.83.47.117/health"
echo ""
echo "🔧 Management commands:"
echo "  pm2 status                    # Check application status"
echo "  pm2 logs api-xsigma-backend  # View logs"
echo "  pm2 restart api-xsigma-backend # Restart application"
echo "  sudo systemctl status nginx  # Check nginx status"
echo ""
echo "📁 Project location: $PROJECT_DIR"
echo "📁 Backup location: $BACKUP_DIR"
echo ""
echo "✅ Deployment from GitHub completed!"
