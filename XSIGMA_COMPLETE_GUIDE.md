# 🚀 XSIGMA Complete Management Guide
*Comprehensive guide consolidating all deployment, management, and troubleshooting information*

## 📋 Server Information
- **Server IP**: 51.83.47.117
- **Username**: debian
- **Frontend**: http://51.83.47.117/
- **Backend API**: http://51.83.47.117/api/
- **Health Check**: http://51.83.47.117/api/health

## 🎯 Quick Start (Choose Your Method)

### Method 1: Windows GUI (Easiest)
```cmd
start-server.bat
```
*Interactive menu with all server management options*

### Method 2: PowerShell Commands
```powershell
.\start-server.ps1 -Start     # Start server
.\start-server.ps1 -Status    # Check status
.\start-server.ps1 -Health    # Health check
.\check-pm2.ps1              # Detailed PM2 status
```

### Method 3: Direct SSH
```bash
ssh debian@51.83.47.117
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 start ecosystem.config.js && sudo systemctl start nginx
```

## 🚀 Deployment Options

### Option 1: Automated Deployment (Recommended)
```powershell
.\deploy-to-server.ps1
```

### Option 2: GitHub Deployment
```powershell
.\deploy-from-github.ps1      # Full GitHub deployment
.\deploy-github-simple.ps1    # Simple GitHub deployment
```

### Option 3: Manual Deployment Steps
1. **Build Frontend**: `cd Frontend_Xsigma && npm run build`
2. **Upload Files**: Use SCP or deployment scripts
3. **Setup Backend**: Install dependencies, configure PM2
4. **Configure Nginx**: Setup reverse proxy and static files
5. **Start Services**: PM2 for backend, Nginx for frontend

## 🔧 PM2 Management (Backend)

### Essential PM2 Commands
```bash
pm2 status                    # Check all processes
pm2 start ecosystem.config.js # Start XSIGMA backend
pm2 restart api-xsigma-backend # Restart application
pm2 stop api-xsigma-backend   # Stop application
pm2 logs api-xsigma-backend   # View logs
pm2 monit                     # Real-time monitoring
pm2 save                      # Save configuration
```

### Advanced PM2 Operations
```bash
pm2 reload api-xsigma-backend # Zero-downtime restart
pm2 scale api-xsigma-backend 4 # Scale to 4 instances
pm2 describe api-xsigma-backend # Detailed info
pm2 flush                     # Clear logs
pm2 startup                   # Auto-start on boot
```

### PM2 Troubleshooting
```bash
# If app won't start
pm2 delete api-xsigma-backend
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 start ecosystem.config.js

# Check for errors
pm2 logs api-xsigma-backend --err
sudo netstat -tlnp | grep :5005

# Reset everything
pm2 kill
pm2 start ecosystem.config.js
pm2 save
```

## 🌐 Nginx Management (Frontend)

### Essential Nginx Commands
```bash
sudo systemctl status nginx   # Check status
sudo systemctl start nginx    # Start service
sudo systemctl restart nginx  # Restart service
sudo systemctl stop nginx     # Stop service
sudo nginx -t                 # Test configuration
```

### Nginx Troubleshooting
```bash
# Check logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Check configuration
sudo nginx -t
sudo systemctl reload nginx

# Check ports
sudo netstat -tlnp | grep :80
```

## 🏥 Health Checks & Monitoring

### Quick Health Check
```bash
# Backend direct
curl http://localhost:5005/health

# Frontend
curl -I http://localhost/

# Full stack (via Nginx proxy)
curl http://localhost/api/health
```

### Comprehensive Status Check
```bash
# All services
pm2 status
sudo systemctl status nginx
sudo netstat -tlnp | grep -E ":(80|5005)"

# System resources
htop
free -h
df -h
```

### Windows Monitoring Scripts
```powershell
.\check-pm2.ps1              # Quick status check
.\pm2-monitor.ps1 -Status    # Detailed PM2 status
.\pm2-monitor.ps1 -Health    # Health checks
.\pm2-monitor.ps1 -Logs      # View logs
.\pm2-monitor.ps1 -Performance # Performance metrics
```

## 🔄 Common Operations

### Start Everything
```bash
# On server
ssh debian@51.83.47.117
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 start ecosystem.config.js
sudo systemctl start nginx
pm2 status
```

### Restart Everything
```bash
pm2 restart api-xsigma-backend
sudo systemctl restart nginx
```

### Stop Everything
```bash
pm2 stop api-xsigma-backend
sudo systemctl stop nginx
```

### Update from GitHub
```bash
./update-from-github.sh
```

## 🚨 Emergency Procedures

### Complete Reset
```bash
# Kill everything
pm2 kill
sudo systemctl stop nginx

# Restart everything
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 start ecosystem.config.js
sudo systemctl start nginx
pm2 save
```

### If Server is Unresponsive
```bash
# Check processes
ps aux | grep -E "(node|nginx)"

# Kill stuck processes
sudo pkill -f node
sudo systemctl restart nginx

# Restart services
pm2 start ecosystem.config.js
```

## 📊 Performance Optimization

### PM2 Scaling
```bash
pm2 scale api-xsigma-backend 4  # Use 4 CPU cores
pm2 reload api-xsigma-backend   # Zero-downtime reload
```

### Memory Management
```bash
# Check memory usage
pm2 monit
free -h

# Set memory limits in ecosystem.config.js
max_memory_restart: '1G'
```

### Log Management
```bash
# Install log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## 🎯 Quick Reference Commands

### Most Used Commands
```bash
# Status checks
pm2 status && sudo systemctl status nginx

# Restart services
pm2 restart api-xsigma-backend && sudo systemctl restart nginx

# View logs
pm2 logs api-xsigma-backend --follow

# Health check
curl http://localhost/api/health
```

### Windows Quick Commands
```powershell
# Start server
.\start-server.ps1 -Start

# Check everything
.\check-pm2.ps1

# Monitor in real-time
.\pm2-monitor.ps1 -Monitor
```

## 📱 Access URLs
- **Frontend**: http://51.83.47.117/
- **Backend API**: http://51.83.47.117/api/
- **API Documentation**: http://51.83.47.117/api/api-docs
- **Health Check**: http://51.83.47.117/api/health

## 💡 Best Practices
1. Always check health after changes
2. Use PM2 for backend process management
3. Monitor logs regularly
4. Save PM2 configuration after changes
5. Use zero-downtime reloads in production
6. Keep system updated
7. Monitor system resources
8. Use automated deployment scripts

---

**This guide consolidates all XSIGMA management operations in one place! 🚀**
