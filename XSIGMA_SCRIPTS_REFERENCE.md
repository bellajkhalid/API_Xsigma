# 🔧 XSIGMA Scripts & Tools Reference
*Complete reference for all automation scripts and tools*

## 📋 Script Categories

### 🚀 Deployment Scripts

#### **deploy-to-server.ps1** - Main Deployment Script
```powershell
.\deploy-to-server.ps1
```
- **Purpose**: Complete automated deployment to server
- **Features**: Builds frontend, uploads files, configures services
- **Requirements**: SSH access, PowerShell
- **Output**: Full XSIGMA deployment

#### **deploy-from-github.ps1** - GitHub Deployment
```powershell
.\deploy-from-github.ps1
```
- **Purpose**: Deploy directly from GitHub repository
- **Features**: Git pull, build, deploy pipeline
- **Requirements**: Git repository access
- **Use Case**: CI/CD deployment

#### **deploy-github-simple.ps1** - Simple GitHub Deploy
```powershell
.\deploy-github-simple.ps1
```
- **Purpose**: Simplified GitHub deployment
- **Features**: Basic git operations, quick deploy
- **Use Case**: Quick updates from GitHub

#### **update-from-github.sh** - Server-side Update
```bash
./update-from-github.sh
```
- **Purpose**: Update server from GitHub (run on server)
- **Features**: Git pull, restart services
- **Location**: Run on server
- **Use Case**: Quick server updates

### 🎛️ Server Management Scripts

#### **start-server.ps1** - PowerShell Server Manager
```powershell
.\start-server.ps1 -Start      # Start services
.\start-server.ps1 -Stop       # Stop services
.\start-server.ps1 -Restart    # Restart services
.\start-server.ps1 -Status     # Check status
.\start-server.ps1 -Logs       # View logs
.\start-server.ps1 -Health     # Health check
```
- **Purpose**: Complete server management from Windows
- **Features**: All server operations via SSH
- **Requirements**: PuTTY/plink or SSH

#### **start-server.bat** - Windows GUI Manager
```cmd
start-server.bat
```
- **Purpose**: Interactive menu for server management
- **Features**: Point-and-click interface
- **Menu Options**:
  1. Check Status
  2. Start Server
  3. Stop Server
  4. Restart Server
  5. View Logs
  6. Health Check
  7. Open Frontend
  8. Open API Docs

### 📊 Monitoring Scripts

#### **check-pm2.ps1** - Quick Status Checker
```powershell
.\check-pm2.ps1
```
- **Purpose**: Quick PM2 and server status check
- **Features**: PM2 status, health check, nginx status, ports
- **Output**: Comprehensive status overview
- **Use Case**: Daily health checks

#### **pm2-monitor.ps1** - Advanced PM2 Monitor
```powershell
.\pm2-monitor.ps1 -Status        # Detailed PM2 status
.\pm2-monitor.ps1 -Logs          # Application logs
.\pm2-monitor.ps1 -Monitor       # Real-time monitoring
.\pm2-monitor.ps1 -Restart       # Restart application
.\pm2-monitor.ps1 -Scale -Instances 4  # Scale to 4 instances
.\pm2-monitor.ps1 -Health        # Health checks
.\pm2-monitor.ps1 -Performance   # Performance metrics
.\pm2-monitor.ps1 -Reset         # Reset PM2 application
```
- **Purpose**: Advanced PM2 management and monitoring
- **Features**: Scaling, performance metrics, detailed monitoring
- **Use Case**: Production monitoring and management

### ⚙️ Setup Scripts

#### **pm2-quick-setup.sh** - Server PM2 Setup
```bash
./pm2-quick-setup.sh
```
- **Purpose**: Quick PM2 setup on server after deployment
- **Features**: Creates logs directory, starts PM2, saves config
- **Location**: Run on server
- **Use Case**: Initial PM2 configuration

#### **setup-pm2.sh** - Complete PM2 Setup
```bash
./setup-pm2.sh
```
- **Purpose**: Comprehensive PM2 setup with all features
- **Features**: Full PM2 configuration, log rotation, monitoring
- **Location**: Run on server
- **Use Case**: Production PM2 setup

## 🎯 Script Usage Patterns

### Daily Operations
```powershell
# Quick status check
.\check-pm2.ps1

# Start/restart services
.\start-server.ps1 -Restart

# Monitor performance
.\pm2-monitor.ps1 -Performance
```

### Deployment Workflow
```powershell
# Option 1: Direct deployment
.\deploy-to-server.ps1

# Option 2: GitHub deployment
.\deploy-from-github.ps1

# Option 3: Server update
ssh debian@51.83.47.117
./update-from-github.sh
```

### Troubleshooting Workflow
```powershell
# Check status
.\check-pm2.ps1

# View logs
.\pm2-monitor.ps1 -Logs

# Restart if needed
.\start-server.ps1 -Restart

# Reset if problems persist
.\pm2-monitor.ps1 -Reset
```

## 🔧 Script Configuration

### Common Variables
```powershell
$ServerIP = "51.83.47.117"
$Username = "debian"
$AppName = "api-xsigma-backend"
```

### SSH Requirements
- **Windows**: PuTTY/plink or OpenSSH
- **Alternative**: WSL with SSH
- **Install OpenSSH**: `Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0`

### File Locations
- **Local Scripts**: Project root directory
- **Server Scripts**: `/home/debian/api-xsigma/`
- **Backend**: `/home/debian/api-xsigma/Backend_Xsigma/`
- **Frontend**: `/home/debian/api-xsigma/frontend-dist/`

## 📱 Quick Command Reference

### Windows Management
```cmd
start-server.bat                    # GUI menu
.\start-server.ps1 -Start          # Start services
.\check-pm2.ps1                    # Quick status
.\pm2-monitor.ps1 -Status          # Detailed status
```

### Server Commands
```bash
ssh debian@51.83.47.117           # Connect to server
pm2 status                        # Check PM2
sudo systemctl status nginx       # Check Nginx
curl http://localhost/api/health   # Health check
```

### Emergency Commands
```powershell
.\start-server.ps1 -Stop          # Stop everything
.\pm2-monitor.ps1 -Reset          # Reset PM2
.\start-server.ps1 -Start         # Start everything
```

## 🎨 Script Features

### Color-Coded Output
- ✅ **Green**: Success messages
- ❌ **Red**: Error messages
- ℹ️ **Blue**: Information
- ⚠️ **Yellow**: Warnings

### Error Handling
- Automatic retry mechanisms
- Graceful failure handling
- Detailed error reporting
- Recovery suggestions

### Logging
- Timestamped operations
- Detailed execution logs
- Error tracking
- Performance metrics

## 💡 Best Practices

### Script Usage
1. **Always check status first**: `.\check-pm2.ps1`
2. **Use appropriate script for task**: GUI for beginners, PowerShell for advanced
3. **Monitor after changes**: `.\pm2-monitor.ps1 -Health`
4. **Save configurations**: PM2 auto-saves after operations

### Deployment
1. **Test locally first**: Build and test before deployment
2. **Use automated scripts**: Avoid manual deployment
3. **Verify after deployment**: Always check health endpoints
4. **Monitor logs**: Check for errors after deployment

### Monitoring
1. **Regular health checks**: Daily status monitoring
2. **Log monitoring**: Check logs for errors
3. **Performance tracking**: Monitor resource usage
4. **Proactive maintenance**: Address issues before they become problems

---

**All XSIGMA automation tools in one comprehensive reference! 🚀**
