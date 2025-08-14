#!/bin/bash

echo "ðŸ”§ Setting up API XSigma on server..."

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

echo "âœ… Setup complete!"
echo "ðŸ“Š Backend API: http://51.83.47.117/api/"
echo "ðŸŒ Frontend: http://51.83.47.117/"
echo "ðŸ“š API Docs: http://51.83.47.117/api/api-docs"
