#!/bin/bash

# API XSigma Deployment Script
# Server: debian@51.83.47.117
# Password: gTevgjCjJEhp

echo "🚀 API XSigma Deployment Script"
echo "================================"

# Server configuration
SERVER_USER="debian"
SERVER_HOST="51.83.47.117"
SERVER_PATH="/home/debian/api-xsigma"
LOCAL_PROJECT_PATH="."

echo "📋 Deployment Configuration:"
echo "  Server: $SERVER_USER@$SERVER_HOST"
echo "  Remote Path: $SERVER_PATH"
echo "  Local Path: $LOCAL_PROJECT_PATH"
echo ""

# Function to run commands on remote server
run_remote() {
    echo "🔧 Running on server: $1"
    ssh $SERVER_USER@$SERVER_HOST "$1"
}

# Function to copy files to server
copy_to_server() {
    echo "📁 Copying $1 to server..."
    scp -r "$1" $SERVER_USER@$SERVER_HOST:"$2"
}

echo "🔍 Step 1: Preparing local project..."

# Build frontend
echo "📦 Building frontend..."
cd Frontend_Xsigma
npm run build
cd ..

# Create deployment package (exclude node_modules and unnecessary files)
echo "📦 Creating deployment package..."
mkdir -p deploy-temp
cp -r Backend_Xsigma deploy-temp/
cp -r Frontend_Xsigma/dist deploy-temp/frontend-dist
cp -r docs deploy-temp/
cp README.md deploy-temp/
cp LICENSE deploy-temp/

# Remove node_modules from deployment package
find deploy-temp -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true

echo "🚀 Step 2: Deploying to server..."

# Create directory on server
run_remote "mkdir -p $SERVER_PATH"

# Copy project files
copy_to_server "deploy-temp/*" "$SERVER_PATH/"

echo "🔧 Step 3: Setting up server environment..."

# Install dependencies and setup
run_remote "cd $SERVER_PATH && cat > setup-server.sh << 'EOF'
#!/bin/bash

echo '🔧 Setting up API XSigma on server...'

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

# Install backend dependencies
cd Backend_Xsigma
npm install

# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt 2>/dev/null || echo 'No requirements.txt found'

# Install common Python packages for financial calculations
pip install numpy pandas scipy matplotlib seaborn jupyter

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOFPM2'
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
EOFPM2

# Setup nginx for frontend (optional)
sudo apt install -y nginx

# Create nginx configuration
sudo cat > /etc/nginx/sites-available/api-xsigma << 'EOFNGINX'
server {
    listen 80;
    server_name 51.83.47.117;

    # Frontend
    location / {
        root /home/debian/api-xsigma/frontend-dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5005/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOFNGINX

# Enable nginx site
sudo ln -sf /etc/nginx/sites-available/api-xsigma /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Start the application
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo '✅ Setup complete!'
echo '📊 Backend API: http://51.83.47.117/api/'
echo '🌐 Frontend: http://51.83.47.117/'
echo '📚 API Docs: http://51.83.47.117/api/api-docs'

EOF"

# Make setup script executable and run it
run_remote "chmod +x $SERVER_PATH/setup-server.sh"
run_remote "cd $SERVER_PATH && ./setup-server.sh"

echo "🎉 Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "  1. SSH to server: ssh $SERVER_USER@$SERVER_HOST"
echo "  2. Check PM2 status: pm2 status"
echo "  3. View logs: pm2 logs api-xsigma-backend"
echo "  4. Access your app:"
echo "     - Frontend: http://51.83.47.117/"
echo "     - Backend API: http://51.83.47.117/api/"
echo "     - API Docs: http://51.83.47.117/api/api-docs"
echo ""
echo "🔧 Useful commands:"
echo "  - Restart app: pm2 restart api-xsigma-backend"
echo "  - Stop app: pm2 stop api-xsigma-backend"
echo "  - View logs: pm2 logs"

# Cleanup
rm -rf deploy-temp

echo "✅ Deployment script completed!"
