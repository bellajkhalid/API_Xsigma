# 🚀 Simple Server Start Guide - API XSigma

## 📋 Quick Server Startup

### 🔗 Server Connection
```bash
ssh debian@51.83.47.117
# Password: gTevgjCjJEhp
```

### ⚡ One-Command Startup
```bash
# Navigate to project directory and start everything
cd /home/debian/api-xsigma && pm2 start ecosystem.config.js && sudo systemctl start nginx
```

## 🎯 Step-by-Step Startup

### Step 1: Connect to Server
```bash
ssh debian@51.83.47.117
```

### Step 2: Check Current Status
```bash
# Check if services are already running
pm2 status
sudo systemctl status nginx
```

### Step 3: Start Backend (if not running)
```bash
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 start ecosystem.config.js
```

### Step 4: Start Nginx (if not running)
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 5: Verify Everything is Running
```bash
# Check PM2 processes
pm2 status

# Check nginx status
sudo systemctl status nginx

# Check if ports are listening
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :5005
```

## 🌐 Access Your Application

After startup, access:
- **Frontend**: http://51.83.47.117/
- **Backend API**: http://51.83.47.117/api/
- **Health Check**: http://51.83.47.117/api/health

## 🔧 Quick Management Commands

### PM2 Commands
```bash
pm2 status                    # Check status
pm2 logs api-xsigma-backend  # View logs
pm2 restart api-xsigma-backend # Restart
pm2 stop api-xsigma-backend   # Stop
```

### Nginx Commands
```bash
sudo systemctl status nginx   # Check status
sudo systemctl restart nginx  # Restart
sudo systemctl stop nginx     # Stop
```

## 🛠️ Troubleshooting

### If Backend Not Working:
```bash
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 logs api-xsigma-backend
pm2 restart api-xsigma-backend
```

### If Frontend Not Loading:
```bash
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Check Logs:
```bash
# Backend logs
pm2 logs api-xsigma-backend

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 🔄 Restart Everything
```bash
# Restart all services
pm2 restart all
sudo systemctl restart nginx
```

## 📊 System Status Check
```bash
# System resources
htop

# Disk space
df -h

# Memory usage
free -h

# All running processes
ps aux | grep -E "(node|nginx)"
```

## 🚨 Emergency Stop
```bash
# Stop everything
pm2 stop all
sudo systemctl stop nginx
```

## 💡 Pro Tips

1. **Auto-start on boot**: Services should start automatically after server reboot
2. **Monitor logs**: Use `pm2 logs` to monitor backend activity
3. **Health check**: Always test http://51.83.47.117/api/health after startup
4. **Quick restart**: Use `pm2 restart all` for quick backend restart

## 📱 Quick Status Check Script

Create a quick status script:
```bash
# Create status check script
cat > ~/check-status.sh << 'EOF'
#!/bin/bash
echo "=== PM2 Status ==="
pm2 status
echo ""
echo "=== Nginx Status ==="
sudo systemctl status nginx --no-pager -l
echo ""
echo "=== Port Check ==="
sudo netstat -tlnp | grep -E ":(80|5005)"
echo ""
echo "=== Health Check ==="
curl -s http://localhost/api/health || echo "Health check failed"
EOF

chmod +x ~/check-status.sh
```

Run status check:
```bash
~/check-status.sh
```

---

## 🎯 **Most Common Startup Sequence:**

```bash
# 1. Connect
ssh debian@51.83.47.117

# 2. Quick start (if services are stopped)
cd /home/debian/api-xsigma/Backend_Xsigma && pm2 start ecosystem.config.js && sudo systemctl start nginx

# 3. Check status
pm2 status && sudo systemctl status nginx

# 4. Test
curl http://localhost/api/health
```

**That's it! Your XSIGMA server should be running! 🚀**
