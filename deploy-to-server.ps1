# API XSigma Deployment Script for Windows
# Server: debian@51.83.47.117
# Password: gTevgjCjJEhp

Write-Host "🚀 API XSigma Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Server configuration
$SERVER_USER = "debian"
$SERVER_HOST = "51.83.47.117"
$SERVER_PATH = "/home/debian/api-xsigma"

Write-Host "📋 Deployment Configuration:" -ForegroundColor Yellow
Write-Host "  Server: $SERVER_USER@$SERVER_HOST" -ForegroundColor White
Write-Host "  Remote Path: $SERVER_PATH" -ForegroundColor White
Write-Host ""

# Check if SSH is available
try {
    ssh -V | Out-Null
    Write-Host "✅ SSH is available" -ForegroundColor Green
} catch {
    Write-Host "❌ SSH not found. Please install OpenSSH or use WSL." -ForegroundColor Red
    Write-Host "Install with: Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0" -ForegroundColor Yellow
    exit 1
}

Write-Host "🔍 Step 1: Preparing local project..." -ForegroundColor Yellow

# Build frontend
Write-Host "📦 Building frontend..." -ForegroundColor Blue
Set-Location Frontend_Xsigma
npm run build
Set-Location ..

# Create deployment package
Write-Host "📦 Creating deployment package..." -ForegroundColor Blue
if (Test-Path "deploy-temp") {
    Remove-Item -Recurse -Force "deploy-temp"
}
New-Item -ItemType Directory -Name "deploy-temp" -Force | Out-Null

# Copy necessary files
Copy-Item -Recurse "Backend_Xsigma" "deploy-temp/"
Copy-Item -Recurse "Frontend_Xsigma/dist" "deploy-temp/frontend-dist"
Copy-Item -Recurse "docs" "deploy-temp/" -ErrorAction SilentlyContinue
Copy-Item "README.md" "deploy-temp/" -ErrorAction SilentlyContinue
Copy-Item "LICENSE" "deploy-temp/" -ErrorAction SilentlyContinue

# Remove node_modules from deployment package
Get-ChildItem -Path "deploy-temp" -Recurse -Directory -Name "node_modules" | ForEach-Object {
    Remove-Item -Recurse -Force "deploy-temp/$_" -ErrorAction SilentlyContinue
}

Write-Host "🚀 Step 2: Connecting to server..." -ForegroundColor Yellow
Write-Host "Password: gTevgjCjJEhp" -ForegroundColor Red

# Create setup script content
$setupScript = @'
#!/bin/bash

echo "🔧 Setting up API XSigma on server..."

# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3 and pip
sudo apt install -y python3 python3-pip python3-venv

# Install PM2 for process management
sudo npm install -g pm2

# Navigate to project directory
cd /home/debian/api-xsigma/Backend_Xsigma

# Install backend dependencies
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

# Install and configure nginx
sudo apt install -y nginx

# Create nginx configuration
sudo tee /etc/nginx/sites-available/api-xsigma > /dev/null << 'EOF'
server {
    listen 80;
    server_name 51.83.47.117;

    # Frontend
    location / {
        root /home/debian/api-xsigma/frontend-dist;
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
EOF

# Enable nginx site
sudo ln -sf /etc/nginx/sites-available/api-xsigma /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Start the application
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Setup complete!"
echo "📊 Backend API: http://51.83.47.117/api/"
echo "🌐 Frontend: http://51.83.47.117/"
echo "📚 API Docs: http://51.83.47.117/api/api-docs"
'@

# Save setup script to file
$setupScript | Out-File -FilePath "deploy-temp/setup-server.sh" -Encoding UTF8

Write-Host "📁 Step 3: Uploading files to server..." -ForegroundColor Yellow
Write-Host "You will be prompted for the password: gTevgjCjJEhp" -ForegroundColor Red

# Upload files using SCP
scp -r deploy-temp/* ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

Write-Host "🔧 Step 4: Running setup on server..." -ForegroundColor Yellow
Write-Host "You will be prompted for the password again: gTevgjCjJEhp" -ForegroundColor Red

# Run setup script on server
ssh ${SERVER_USER}@${SERVER_HOST} "chmod +x ${SERVER_PATH}/setup-server.sh && cd ${SERVER_PATH} && ./setup-server.sh"

Write-Host ""
Write-Host "🎉 Deployment completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Your application is now available at:" -ForegroundColor Cyan
Write-Host "  🌐 Frontend: http://51.83.47.117/" -ForegroundColor White
Write-Host "  📊 Backend API: http://51.83.47.117/api/" -ForegroundColor White
Write-Host "  📚 API Documentation: http://51.83.47.117/api/api-docs" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Useful SSH commands:" -ForegroundColor Cyan
Write-Host "  ssh ${SERVER_USER}@${SERVER_HOST}" -ForegroundColor White
Write-Host "  pm2 status" -ForegroundColor White
Write-Host "  pm2 logs api-xsigma-backend" -ForegroundColor White
Write-Host "  pm2 restart api-xsigma-backend" -ForegroundColor White

# Cleanup
Remove-Item -Recurse -Force "deploy-temp"

Write-Host "✅ Deployment script completed!" -ForegroundColor Green
