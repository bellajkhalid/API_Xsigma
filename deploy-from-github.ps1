# API XSigma GitHub Deployment Script for Windows
# This script connects to your server and deploys from GitHub

Write-Host "🚀 API XSigma GitHub Deployment Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Server configuration
$SERVER_USER = "debian"
$SERVER_HOST = "51.83.47.117"
$GITHUB_REPO = "https://github.com/bellajkhalid/API_Xsigma.git"

Write-Host "📋 Deployment Configuration:" -ForegroundColor Yellow
Write-Host "  Server: $SERVER_USER@$SERVER_HOST" -ForegroundColor White
Write-Host "  GitHub Repo: $GITHUB_REPO" -ForegroundColor White
Write-Host "  Password: gTevgjCjJEhp" -ForegroundColor Red
Write-Host ""

# Check if SSH is available
try {
    ssh -V | Out-Null
    Write-Host "✅ SSH is available" -ForegroundColor Green
} catch {
    Write-Host "❌ SSH not found. Please install OpenSSH." -ForegroundColor Red
    Write-Host "Install with: Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0" -ForegroundColor Yellow
    exit 1
}

Write-Host "📤 Step 1: Uploading deployment script to server..." -ForegroundColor Yellow

# Create the deployment script content
$deploymentScript = @'
#!/bin/bash

# API XSigma GitHub Deployment Script
echo "🚀 Starting GitHub deployment..."

# Configuration
GITHUB_REPO="https://github.com/bellajkhalid/API_Xsigma.git"
PROJECT_DIR="/home/debian/api-xsigma"
BACKUP_DIR="/home/debian/api-xsigma-backup-$(date +%Y%m%d-%H%M%S)"

# Backup existing installation if it exists
if [ -d "$PROJECT_DIR" ]; then
    echo "📦 Backing up existing installation..."
    mv "$PROJECT_DIR" "$BACKUP_DIR"
    echo "✅ Backup created at: $BACKUP_DIR"
fi

echo "🔧 Installing system dependencies..."

# Update system
sudo apt update
sudo apt upgrade -y

# Install Git
sudo apt install -y git curl

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python and other dependencies
sudo apt install -y python3 python3-pip python3-venv nginx

# Install PM2
sudo npm install -g pm2

echo "📥 Cloning project from GitHub..."

# Clone the repository
git clone "$GITHUB_REPO" "$PROJECT_DIR"
cd "$PROJECT_DIR"

echo "📦 Setting up Backend..."

# Backend setup
cd Backend_Xsigma
npm install

# Create PM2 ecosystem file
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
    }
  }]
};
EOF

echo "🌐 Setting up Frontend..."

# Frontend setup
cd ../Frontend_Xsigma
npm install
npm run build

echo "🔧 Configuring Nginx..."

# Create nginx configuration
sudo tee /etc/nginx/sites-available/api-xsigma > /dev/null << 'EOFNGINX'
server {
    listen 80;
    server_name 51.83.47.117;

    # Frontend
    location / {
        root /home/debian/api-xsigma/Frontend_Xsigma/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
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
    }
}
EOFNGINX

# Enable nginx site
sudo ln -sf /etc/nginx/sites-available/api-xsigma /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "🚀 Starting the application..."

# Start the application
cd "$PROJECT_DIR/Backend_Xsigma"
pm2 delete api-xsigma-backend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "🎉 Deployment completed!"
echo ""
echo "📋 Your application is available at:"
echo "  🌐 Frontend: http://51.83.47.117/"
echo "  📊 Backend API: http://51.83.47.117/api/"
echo "  📚 API Docs: http://51.83.47.117/api/api-docs"
echo ""
echo "🔧 Management commands:"
echo "  pm2 status"
echo "  pm2 logs api-xsigma-backend"
echo "  pm2 restart api-xsigma-backend"
'@

# Save deployment script to temporary file
$deploymentScript | Out-File -FilePath "temp-deploy-github.sh" -Encoding UTF8

Write-Host "📤 Uploading deployment script..." -ForegroundColor Blue
Write-Host "Password: gTevgjCjJEhp" -ForegroundColor Red

# Upload the script to server
scp temp-deploy-github.sh ${SERVER_USER}@${SERVER_HOST}:/home/debian/

Write-Host "🚀 Step 2: Running deployment on server..." -ForegroundColor Yellow
Write-Host "This will take several minutes..." -ForegroundColor Blue
Write-Host "Password: gTevgjCjJEhp" -ForegroundColor Red

# Connect to server and run the deployment script
ssh ${SERVER_USER}@${SERVER_HOST} "chmod +x /home/debian/temp-deploy-github.sh; /home/debian/temp-deploy-github.sh"

Write-Host ""
Write-Host "🎉 GitHub deployment completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Your application should now be available at:" -ForegroundColor Cyan
Write-Host "  🌐 Frontend: http://51.83.47.117/" -ForegroundColor White
Write-Host "  📊 Backend API: http://51.83.47.117/api/" -ForegroundColor White
Write-Host "  📚 API Documentation: http://51.83.47.117/api/api-docs" -ForegroundColor White
Write-Host "  ❤️ Health Check: http://51.83.47.117/health" -ForegroundColor White
Write-Host ""
Write-Host "🔧 To manage your application:" -ForegroundColor Cyan
Write-Host "  ssh ${SERVER_USER}@${SERVER_HOST}" -ForegroundColor White
Write-Host "  pm2 status" -ForegroundColor White
Write-Host "  pm2 logs api-xsigma-backend" -ForegroundColor White
Write-Host "  pm2 restart api-xsigma-backend" -ForegroundColor White
Write-Host ""
Write-Host "🔄 To update from GitHub in the future:" -ForegroundColor Cyan
Write-Host "  ssh ${SERVER_USER}@${SERVER_HOST}" -ForegroundColor White
Write-Host "  cd /home/debian/api-xsigma" -ForegroundColor White
Write-Host "  git pull" -ForegroundColor White
Write-Host "  cd Frontend_Xsigma; npm run build" -ForegroundColor White
Write-Host "  pm2 restart api-xsigma-backend" -ForegroundColor White

# Cleanup
Remove-Item "temp-deploy-github.sh" -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "GitHub deployment script completed!" -ForegroundColor Green
