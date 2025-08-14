# 🔍 XSIGMA Troubleshooting & Emergency Guide
*Complete troubleshooting guide for all common issues and emergency procedures*

## 🚨 Emergency Quick Fixes

### 🔥 Server Not Responding
```bash
# Connect to server
ssh debian@51.83.47.117

# Check what's running
ps aux | grep -E "(node|nginx)"

# Kill stuck processes
sudo pkill -f node
sudo systemctl restart nginx

# Restart everything
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 start ecosystem.config.js
pm2 save
```

### 🔥 Complete System Reset

```bash
# Nuclear option - reset everything
pm2 kill
sudo systemctl stop nginx
sudo systemctl start nginx
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 start ecosystem.config.js
pm2 save
```

### 🔥 Windows Scripts Not Working
```powershell
# Check SSH connectivity
ssh debian@51.83.47.117 "echo 'Connection OK'"

# Alternative: Use WSL
wsl ssh debian@51.83.47.117

# Install OpenSSH if needed
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

## 🔧 Common Issues & Solutions

### Issue 1: Backend Not Starting

#### Symptoms:
- PM2 shows "errored" or "stopped"
- Health check fails
- API endpoints not responding

#### Diagnosis:
```bash
pm2 logs api-xsigma-backend --err
pm2 describe api-xsigma-backend
sudo netstat -tlnp | grep :5005
```

#### Solutions:
```bash
# Solution 1: Restart PM2
pm2 restart api-xsigma-backend

# Solution 2: Delete and recreate
pm2 delete api-xsigma-backend
cd /home/debian/api-xsigma/Backend_Xsigma
pm2 start ecosystem.config.js

# Solution 3: Check dependencies
npm install
pm2 restart api-xsigma-backend

# Solution 4: Check port conflicts
sudo lsof -i :5005
# Kill conflicting process if found
```

### Issue 2: Frontend Not Loading

#### Symptoms:
- 502 Bad Gateway
- Nginx error page
- Frontend files not served

#### Diagnosis:
```bash
sudo systemctl status nginx
sudo nginx -t
curl -I http://localhost/
ls -la /home/debian/api-xsigma/frontend-dist/
```

#### Solutions:
```bash
# Solution 1: Restart Nginx
sudo systemctl restart nginx

# Solution 2: Check configuration
sudo nginx -t
sudo systemctl reload nginx

# Solution 3: Check file permissions
sudo chown -R www-data:www-data /home/debian/api-xsigma/frontend-dist/
sudo chmod -R 755 /home/debian/api-xsigma/frontend-dist/

# Solution 4: Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Issue 3: API Proxy Not Working

#### Symptoms:
- Frontend loads but API calls fail
- 502 errors on /api/ routes
- Backend works directly but not through Nginx

#### Diagnosis:
```bash
# Test backend directly
curl http://localhost:5005/health

# Test through Nginx
curl http://localhost/api/health

# Check Nginx configuration
sudo nginx -t
cat /etc/nginx/sites-available/api-xsigma
```

#### Solutions:
```bash
# Solution 1: Restart both services
pm2 restart api-xsigma-backend
sudo systemctl restart nginx

# Solution 2: Check Nginx proxy configuration
sudo nano /etc/nginx/sites-available/api-xsigma
# Ensure proxy_pass points to http://localhost:5005/

# Solution 3: Check firewall
sudo ufw status
sudo ufw allow 5005
```

### Issue 4: High Memory Usage

#### Symptoms:
- PM2 shows high memory usage
- Server becomes slow
- Applications restart frequently

#### Diagnosis:
```bash
pm2 monit
free -h
htop
pm2 describe api-xsigma-backend
```

#### Solutions:
```bash
# Solution 1: Restart application
pm2 restart api-xsigma-backend

# Solution 2: Adjust memory limits
# Edit ecosystem.config.js
max_memory_restart: '512M'  # Reduce limit

# Solution 3: Scale down instances
pm2 scale api-xsigma-backend 1

# Solution 4: Check for memory leaks
pm2 logs api-xsigma-backend | grep -i memory
```

### Issue 5: SSL/HTTPS Issues

#### Symptoms:
- Mixed content warnings
- HTTPS not working
- Certificate errors

#### Solutions:
```bash
# Install Let's Encrypt certificate
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d 51.83.47.117

# Force HTTPS redirect in Nginx
# Add to server block:
return 301 https://$server_name$request_uri;
```

## 🔍 Diagnostic Commands

### System Health Check
```bash
# Complete system overview
echo "=== System Info ==="
uptime
free -h
df -h

echo "=== PM2 Status ==="
pm2 status

echo "=== Nginx Status ==="
sudo systemctl status nginx

echo "=== Port Status ==="
sudo netstat -tlnp | grep -E ":(80|5005)"

echo "=== Health Check ==="
curl -s http://localhost/api/health || echo "Health check failed"
```

### Log Analysis
```bash
# Backend logs
pm2 logs api-xsigma-backend --lines 50

# Nginx logs
sudo tail -50 /var/log/nginx/error.log
sudo tail -50 /var/log/nginx/access.log

# System logs
sudo journalctl -u nginx -n 50
sudo dmesg | tail -20
```

### Performance Analysis
```bash
# CPU and Memory
htop
iostat 1 5

# Network
ss -tuln
netstat -i

# Disk usage
du -sh /home/debian/api-xsigma/*
```

## 🛠️ Windows Troubleshooting

### PowerShell Scripts Not Working
```powershell
# Check execution policy
Get-ExecutionPolicy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Test SSH connectivity
ssh debian@51.83.47.117 "echo 'SSH OK'"

# Alternative: Use plink
plink -ssh debian@51.83.47.117 -l debian -pw your_password "pm2 status"
```

### Connection Issues
```powershell
# Test network connectivity
Test-NetConnection 51.83.47.117 -Port 22
Test-NetConnection 51.83.47.117 -Port 80

# Check Windows firewall
Get-NetFirewallRule | Where-Object {$_.DisplayName -like "*SSH*"}
```

## 📊 Monitoring & Alerts

### Set Up Monitoring
```bash
# Install monitoring tools
pm2 install pm2-server-monit

# Set up log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

### Health Check Script
```bash
#!/bin/bash
# Create health check script
cat > ~/health-check.sh << 'EOF'
#!/bin/bash
HEALTH=$(curl -s http://localhost/api/health)
if [[ $? -ne 0 ]]; then
    echo "$(date): Health check failed" >> ~/health.log
    # Restart services
    pm2 restart api-xsigma-backend
    sudo systemctl restart nginx
fi
EOF

chmod +x ~/health-check.sh

# Add to crontab (check every 5 minutes)
echo "*/5 * * * * /home/debian/health-check.sh" | crontab -
```

## 🚨 Emergency Contacts & Procedures

### When to Escalate
1. **Server hardware issues**: Contact hosting provider
2. **Persistent application crashes**: Check application logs
3. **Security incidents**: Immediate investigation required
4. **Data corruption**: Restore from backup

### Emergency Checklist
- [ ] Check server connectivity
- [ ] Verify PM2 processes
- [ ] Check Nginx status
- [ ] Test health endpoints
- [ ] Review recent logs
- [ ] Check system resources
- [ ] Verify file permissions
- [ ] Test database connectivity (if applicable)

### Recovery Procedures
1. **Document the issue**: What happened, when, symptoms
2. **Immediate fix**: Apply emergency solutions
3. **Root cause analysis**: Investigate underlying cause
4. **Preventive measures**: Implement monitoring/alerts
5. **Update documentation**: Record lessons learned

## 💡 Prevention Tips

### Regular Maintenance
```bash
# Weekly tasks
sudo apt update && sudo apt upgrade -y
pm2 update
npm audit fix

# Monthly tasks
sudo reboot  # Planned maintenance window
pm2 logs --clear
```

### Monitoring Setup
```bash
# Set up alerts for high resource usage
# Monitor disk space
# Track application performance
# Set up log aggregation
```

### Backup Strategy
```bash
# Backup application files
tar -czf backup-$(date +%Y%m%d).tar.gz /home/debian/api-xsigma/

# Backup PM2 configuration
pm2 save
cp ~/.pm2/dump.pm2 ~/pm2-backup-$(date +%Y%m%d).pm2
```

---

**Complete troubleshooting arsenal for XSIGMA! 🛠️**
