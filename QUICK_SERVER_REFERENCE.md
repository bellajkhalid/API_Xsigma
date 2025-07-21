# 🚀 XSIGMA Server - Quick Reference Card

## 📋 Server Info
- **IP**: 51.83.47.117
- **User**: debian
- **Pass**: gTevgjCjJEhp
- **Frontend**: http://51.83.47.117/
- **Backend**: http://51.83.47.117/api/

## ⚡ Quick Start Options

### Option 1: Windows GUI (Easiest)
```cmd
start-server.bat
```
*Interactive menu with all options*

### Option 2: PowerShell Commands
```powershell
.\start-server.ps1 -Start     # Start server
.\start-server.ps1 -Status    # Check status
.\start-server.ps1 -Health    # Health check
```

### Option 3: Direct SSH
```bash
ssh debian@51.83.47.117
cd /home/debian/api-xsigma/Backend_Xsigma && pm2 start ecosystem.config.js && sudo systemctl start nginx
```

## 🎯 Most Common Commands

### Start Everything
```bash
# SSH to server
ssh debian@51.83.47.117

# Start services
pm2 start ecosystem.config.js
sudo systemctl start nginx
```

### Check Status
```bash
pm2 status
sudo systemctl status nginx
curl http://localhost/api/health
```

### View Logs
```bash
pm2 logs api-xsigma-backend
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
pm2 restart all
sudo systemctl restart nginx
```

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://51.83.47.117/ | Main website |
| Backend API | http://51.83.47.117/api/ | API endpoints |
| Health Check | http://51.83.47.117/api/health | Server health |
| API Docs | http://51.83.47.117/api/api-docs | Swagger docs |

## 🔧 Troubleshooting

### Backend Issues
```bash
pm2 logs api-xsigma-backend  # Check logs
pm2 restart api-xsigma-backend  # Restart
```

### Frontend Issues
```bash
sudo nginx -t  # Test config
sudo systemctl restart nginx  # Restart nginx
```

### Port Issues
```bash
sudo netstat -tlnp | grep :80    # Check port 80
sudo netstat -tlnp | grep :5005  # Check port 5005
```

## 📱 Quick Status Script
```bash
# Create on server
cat > ~/status.sh << 'EOF'
#!/bin/bash
echo "PM2 Status:" && pm2 status
echo "Nginx Status:" && sudo systemctl status nginx --no-pager
echo "Health Check:" && curl -s http://localhost/api/health
EOF
chmod +x ~/status.sh

# Run it
~/status.sh
```

## 🚨 Emergency Commands

### Stop Everything
```bash
pm2 stop all
sudo systemctl stop nginx
```

### Kill All Node Processes
```bash
sudo pkill -f node
sudo systemctl restart nginx
```

### Restart Server (if needed)
```bash
sudo reboot
```

## 💡 Pro Tips

1. **Auto-start**: Services start automatically on boot
2. **Logs**: Always check logs first when troubleshooting
3. **Health**: Test health endpoint after any changes
4. **Backup**: PM2 saves process list automatically
5. **Monitor**: Use `htop` to monitor system resources

## 📞 Quick Help

**Problem**: Can't connect to server
**Solution**: Check if server is running, verify IP/credentials

**Problem**: Frontend not loading
**Solution**: Check nginx status, restart if needed

**Problem**: API not responding
**Solution**: Check PM2 status, restart backend

**Problem**: 502 Bad Gateway
**Solution**: Backend is down, restart PM2 processes

---

## 🎯 **Super Quick Start (Copy & Paste)**

```bash
# Connect and start everything
ssh debian@51.83.47.117
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 start ecosystem.config.js
sudo systemctl start nginx
pm2 status
curl http://localhost/api/health
```

**Done! Your server should be running! 🚀**
