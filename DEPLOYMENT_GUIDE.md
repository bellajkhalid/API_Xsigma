# 🚀 API XSigma Deployment Guide

## Server Information
- **Server IP**: 51.83.47.117
- **Username**: debian
- **Password**: gTevgjCjJEhp
- **Frontend URL**: http://51.168.1.106:8080 → http://51.83.47.117
- **Backend API**: http://51.83.47.117/api/

## 📋 Quick Deployment Options

### Option 1: Automated Deployment (Recommended)

Run the PowerShell deployment script:
```powershell
.\deploy-to-server.ps1
```

### Option 2: Manual Deployment

#### Step 1: Build Frontend
```bash
cd Frontend_Xsigma
npm run build
cd ..
```

#### Step 2: Connect to Server
```bash
ssh debian@51.83.47.117
# Password: gTevgjCjJEhp
```

#### Step 3: Setup Server Environment
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python and other dependencies
sudo apt install -y python3 python3-pip python3-venv nginx

# Install PM2 for process management
sudo npm install -g pm2
```

#### Step 4: Upload Project Files
From your local machine:
```bash
# Create deployment package
scp -r Backend_Xsigma debian@51.83.47.117:/home/debian/api-xsigma/
scp -r Frontend_Xsigma/dist debian@51.83.47.117:/home/debian/api-xsigma/frontend-dist
```

#### Step 5: Setup Backend
On the server:
```bash
cd /home/debian/api-xsigma/Backend_Xsigma
npm install

# Create PM2 configuration
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

# Start the application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Step 6: Setup Nginx (Frontend + Reverse Proxy)
```bash
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

# Enable the site
sudo ln -sf /etc/nginx/sites-available/api-xsigma /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 🔧 Management Commands

### PM2 Commands
```bash
pm2 status                    # Check application status
pm2 logs api-xsigma-backend  # View logs
pm2 restart api-xsigma-backend # Restart application
pm2 stop api-xsigma-backend   # Stop application
pm2 delete api-xsigma-backend # Delete application
```

### Nginx Commands
```bash
sudo nginx -t                # Test configuration
sudo systemctl restart nginx # Restart nginx
sudo systemctl status nginx  # Check nginx status
```

### System Monitoring
```bash
htop                         # System resources
df -h                        # Disk usage
free -h                      # Memory usage
```

## 🌐 Access Your Application

After successful deployment:

- **Frontend**: http://51.83.47.117/
- **Backend API**: http://51.83.47.117/api/
- **API Documentation**: http://51.83.47.117/api/api-docs
- **Health Check**: http://51.83.47.117/api/health
- **Metrics**: http://51.83.47.117/api/metrics

## 🔍 Troubleshooting

### Check if services are running:
```bash
pm2 status
sudo systemctl status nginx
```

### Check logs:
```bash
pm2 logs api-xsigma-backend
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check ports:
```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :5005
```

### Restart everything:
```bash
pm2 restart all
sudo systemctl restart nginx
```

## 🔒 Security Notes

1. **Firewall**: Make sure ports 80 and 22 are open
2. **SSH**: Consider using SSH keys instead of password
3. **SSL**: Consider adding SSL certificate for HTTPS
4. **Updates**: Keep the system updated regularly

## 📊 Performance Optimization

1. **PM2 Clustering**: Increase instances in ecosystem.config.js
2. **Nginx Caching**: Add caching rules for static assets
3. **Gzip Compression**: Enable in nginx configuration
4. **Database**: Optimize database queries and add indexes

## 🚀 Next Steps

1. Set up SSL certificate with Let's Encrypt
2. Configure automated backups
3. Set up monitoring and alerting
4. Configure log rotation
5. Set up CI/CD pipeline for automated deployments
