# API XSigma GitHub Deployment Script (Simple Version)
# This script connects to your server and deploys from GitHub

Write-Host "API XSigma GitHub Deployment Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

# Server configuration
$SERVER_USER = "debian"
$SERVER_HOST = "51.83.47.117"
$GITHUB_REPO = "https://github.com/bellajkhalid/API_Xsigma.git"

Write-Host "Deployment Configuration:" -ForegroundColor Yellow
Write-Host "  Server: $SERVER_USER@$SERVER_HOST" -ForegroundColor White
Write-Host "  GitHub Repo: $GITHUB_REPO" -ForegroundColor White
Write-Host "  Password: gTevgjCjJEhp" -ForegroundColor Red
Write-Host ""

# Check if SSH is available
try {
    ssh -V | Out-Null
    Write-Host "SSH is available" -ForegroundColor Green
} catch {
    Write-Host "SSH not found. Please install OpenSSH." -ForegroundColor Red
    exit 1
}

Write-Host "Step 1: Creating deployment script..." -ForegroundColor Yellow

# Create the deployment script content
$deploymentScript = @"
#!/bin/bash

echo "Starting GitHub deployment..."

# Configuration
GITHUB_REPO="$GITHUB_REPO"
PROJECT_DIR="/home/debian/api-xsigma"

# Backup existing installation if it exists
if [ -d "`$PROJECT_DIR" ]; then
    echo "Backing up existing installation..."
    mv "`$PROJECT_DIR" "/home/debian/api-xsigma-backup-`$(date +%Y%m%d-%H%M%S)"
fi

echo "Installing system dependencies..."

# Update system
sudo apt update
sudo apt upgrade -y

# Install dependencies
sudo apt install -y git curl

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python and nginx
sudo apt install -y python3 python3-pip python3-venv nginx

# Install PM2
sudo npm install -g pm2

echo "Cloning project from GitHub..."

# Clone the repository
git clone "`$GITHUB_REPO" "`$PROJECT_DIR"
cd "`$PROJECT_DIR"

echo "Setting up Backend..."

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

echo "Setting up Frontend..."

# Frontend setup
cd ../Frontend_Xsigma
npm install
npm run build

echo "Configuring Nginx..."

# Create nginx configuration
sudo tee /etc/nginx/sites-available/api-xsigma > /dev/null << 'EOFNGINX'
server {
    listen 80;
    server_name www.xsigma.co.uk xsigma.co.uk;

    location / {
        root /home/debian/api-xsigma/Frontend_Xsigma/dist;
        index index.html;
        try_files `$uri `$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5005/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
        proxy_cache_bypass `$http_upgrade;
    }
}
EOFNGINX

# Enable nginx site
sudo ln -sf /etc/nginx/sites-available/api-xsigma /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "Starting the application..."

# Start the application
cd "`$PROJECT_DIR/Backend_Xsigma"
pm2 delete api-xsigma-backend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "Deployment completed!"
echo ""
echo "Your application is available at:"
echo "  Frontend: http://www.xsigma.co.uk/"
echo "  Backend API: http://www.xsigma.co.uk/api/"
echo "  API Docs: http://www.xsigma.co.uk/api/api-docs"
"@

# Save deployment script to temporary file
$deploymentScript | Out-File -FilePath "temp-deploy.sh" -Encoding UTF8

Write-Host "Step 2: Uploading deployment script..." -ForegroundColor Yellow
Write-Host "Password: gTevgjCjJEhp" -ForegroundColor Red

# Upload the script to server
scp temp-deploy.sh ${SERVER_USER}@${SERVER_HOST}:/home/debian/

Write-Host "Step 3: Running deployment on server..." -ForegroundColor Yellow
Write-Host "This will take several minutes..." -ForegroundColor Blue
Write-Host "Password: gTevgjCjJEhp" -ForegroundColor Red

# Connect to server and run the deployment script
ssh ${SERVER_USER}@${SERVER_HOST} "chmod +x /home/debian/temp-deploy.sh; /home/debian/temp-deploy.sh"

Write-Host ""
Write-Host "GitHub deployment completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Your application should now be available at:" -ForegroundColor Cyan
Write-Host "  Frontend: http://www.xsigma.co.uk/" -ForegroundColor White
Write-Host "  Backend API: http://www.xsigma.co.uk/api/" -ForegroundColor White
Write-Host "  API Documentation: http://www.xsigma.co.uk/api/api-docs" -ForegroundColor White
Write-Host ""
Write-Host "To manage your application:" -ForegroundColor Cyan
Write-Host "  ssh ${SERVER_USER}@${SERVER_HOST}" -ForegroundColor White
Write-Host "  pm2 status" -ForegroundColor White
Write-Host "  pm2 logs api-xsigma-backend" -ForegroundColor White

# Cleanup
Remove-Item "temp-deploy.sh" -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Deployment script completed!" -ForegroundColor Green
