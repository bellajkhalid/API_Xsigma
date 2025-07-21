# 🚀 PM2 Management Guide for XSIGMA

## 📋 What is PM2?
PM2 is a production process manager for Node.js applications that keeps your apps alive forever, reloads them without downtime, and facilitates common system admin tasks.

## 🎯 Basic PM2 Commands

### Essential Commands
```bash
pm2 status                    # Show all running processes
pm2 list                      # Same as status
pm2 start app.js              # Start application
pm2 stop <app_name|id>        # Stop application
pm2 restart <app_name|id>     # Restart application
pm2 delete <app_name|id>      # Delete application from PM2
pm2 reload <app_name|id>      # Reload application (0-downtime)
```

### XSIGMA Specific Commands
```bash
# Start XSIGMA backend
pm2 start ecosystem.config.js

# Check XSIGMA status
pm2 status api-xsigma-backend

# Restart XSIGMA
pm2 restart api-xsigma-backend

# Stop XSIGMA
pm2 stop api-xsigma-backend

# Delete XSIGMA from PM2
pm2 delete api-xsigma-backend
```

## 📊 Monitoring Commands

### Real-time Monitoring
```bash
pm2 monit                     # Real-time monitoring dashboard
pm2 logs                      # Show all logs
pm2 logs api-xsigma-backend   # Show specific app logs
pm2 logs --lines 100          # Show last 100 lines
pm2 logs --follow             # Follow logs in real-time
pm2 flush                     # Clear all logs
```

### Process Information
```bash
pm2 describe api-xsigma-backend  # Detailed process info
pm2 show api-xsigma-backend      # Same as describe
pm2 prettylist                  # Pretty formatted process list
pm2 jlist                       # JSON formatted process list
```

## ⚙️ Configuration Management

### Ecosystem File (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'api-xsigma-backend',
    script: 'index.js',
    cwd: '/home/debian/api-xsigma/Backend_Xsigma',
    instances: 1,                    // Number of instances
    autorestart: true,               // Auto restart on crash
    watch: false,                    // Watch for file changes
    max_memory_restart: '1G',        // Restart if memory exceeds 1GB
    env: {
      NODE_ENV: 'production',
      PORT: 5005
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 5005
    },
    error_file: './logs/err.log',    // Error log file
    out_file: './logs/out.log',      # Output log file
    log_file: './logs/combined.log', # Combined log file
    time: true                       # Prefix logs with timestamp
  }]
};
```

### Advanced Configuration Options
```javascript
module.exports = {
  apps: [{
    name: 'api-xsigma-backend',
    script: 'index.js',
    instances: 'max',                // Use all CPU cores
    exec_mode: 'cluster',            # Cluster mode for load balancing
    max_restarts: 10,                # Max restart attempts
    min_uptime: '10s',               # Min uptime before restart
    max_memory_restart: '1G',
    cron_restart: '0 2 * * *',       # Restart daily at 2 AM
    ignore_watch: ['node_modules'],   # Ignore these folders when watching
    env: {
      NODE_ENV: 'production',
      PORT: 5005,
      DATABASE_URL: 'your_db_url'
    }
  }]
};
```

## 🔄 Process Management

### Starting Applications
```bash
# Start with ecosystem file
pm2 start ecosystem.config.js

# Start specific environment
pm2 start ecosystem.config.js --env development

# Start with custom name
pm2 start index.js --name "my-api"

# Start with specific instances
pm2 start index.js -i 4          # 4 instances
pm2 start index.js -i max        # Use all CPU cores
```

### Scaling Applications
```bash
pm2 scale api-xsigma-backend 4   # Scale to 4 instances
pm2 scale api-xsigma-backend +2  # Add 2 more instances
pm2 scale api-xsigma-backend -1  # Remove 1 instance
```

### Reloading (Zero Downtime)
```bash
pm2 reload api-xsigma-backend    # Zero downtime reload
pm2 reload all                   # Reload all apps
pm2 gracefulReload all           # Graceful reload
```

## 📈 Performance Monitoring

### Memory and CPU Usage
```bash
pm2 monit                        # Real-time monitoring
pm2 list                         # Shows memory/CPU usage
pm2 describe api-xsigma-backend  # Detailed metrics
```

### Log Management
```bash
# View logs
pm2 logs api-xsigma-backend --lines 50

# Follow logs in real-time
pm2 logs api-xsigma-backend --follow

# Clear logs
pm2 flush api-xsigma-backend

# Rotate logs
pm2 install pm2-logrotate
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### App Won't Start
```bash
# Check logs for errors
pm2 logs api-xsigma-backend

# Check if port is in use
sudo netstat -tlnp | grep :5005

# Restart with fresh logs
pm2 delete api-xsigma-backend
pm2 start ecosystem.config.js
```

#### High Memory Usage
```bash
# Check memory usage
pm2 monit

# Set memory limit in ecosystem.config.js
max_memory_restart: '500M'

# Restart to apply changes
pm2 restart api-xsigma-backend
```

#### App Keeps Crashing
```bash
# Check error logs
pm2 logs api-xsigma-backend --err

# Increase restart delay
min_uptime: '10s'
max_restarts: 5

# Check system resources
htop
df -h
```

## 💾 Persistence and Startup

### Save PM2 Configuration
```bash
pm2 save                         # Save current process list
pm2 startup                      # Generate startup script
pm2 unstartup                    # Remove startup script
```

### Auto-start on Boot
```bash
# Generate startup script (run once)
pm2 startup

# Save current processes
pm2 save

# Test by rebooting server
sudo reboot
```

## 🔍 Advanced Features

### Environment Management
```bash
# Start with specific environment
pm2 start ecosystem.config.js --env production
pm2 start ecosystem.config.js --env development

# Update environment variables
pm2 restart api-xsigma-backend --update-env
```

### Process Clustering
```bash
# Start in cluster mode
pm2 start index.js -i max --name "api-cluster"

# Load balance across cores
pm2 start ecosystem.config.js
```

### Health Checks
```bash
# Custom health check script
pm2 start ecosystem.config.js --health-check-grace-period 3000
```

## 📊 Useful PM2 Modules

### Install PM2 Modules
```bash
pm2 install pm2-logrotate        # Log rotation
pm2 install pm2-server-monit     # Server monitoring
pm2 install pm2-auto-pull        # Auto git pull
```

### Configure Log Rotation
```bash
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true
```

## 🚨 Emergency Commands

### Kill Everything
```bash
pm2 kill                         # Kill PM2 daemon and all processes
pm2 delete all                   # Delete all applications
```

### Reset PM2
```bash
pm2 kill
pm2 start ecosystem.config.js
pm2 save
```

## 📱 Quick PM2 Status Script

Create a comprehensive status script:
```bash
cat > ~/pm2-status.sh << 'EOF'
#!/bin/bash
echo "=== PM2 Process List ==="
pm2 list

echo -e "\n=== PM2 Detailed Info ==="
pm2 describe api-xsigma-backend

echo -e "\n=== Recent Logs ==="
pm2 logs api-xsigma-backend --lines 10 --nostream

echo -e "\n=== System Resources ==="
free -h
df -h /

echo -e "\n=== Port Status ==="
sudo netstat -tlnp | grep :5005
EOF

chmod +x ~/pm2-status.sh
```

## 💡 Best Practices

1. **Always use ecosystem.config.js** for production
2. **Set memory limits** to prevent memory leaks
3. **Use cluster mode** for better performance
4. **Monitor logs regularly** with `pm2 logs`
5. **Save PM2 list** after changes with `pm2 save`
6. **Set up log rotation** to manage disk space
7. **Use environment variables** for configuration
8. **Test restarts** before deploying to production

---

## 🎯 **Quick PM2 Cheat Sheet**

```bash
# Essential commands
pm2 start ecosystem.config.js    # Start app
pm2 status                       # Check status
pm2 logs api-xsigma-backend     # View logs
pm2 restart api-xsigma-backend  # Restart app
pm2 monit                       # Monitor in real-time
pm2 save                        # Save configuration

# Emergency
pm2 kill                        # Kill everything
pm2 start ecosystem.config.js   # Restart everything
```

**Master PM2 for bulletproof Node.js deployments! 🚀**
