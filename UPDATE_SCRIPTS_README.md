# XSigma Automatic Server Update Scripts

This directory contains several scripts to automatically update your production server with the latest changes from your local development environment.

## 🚀 Quick Start

### Windows Users
```bash
# Double-click or run from command prompt
quick-update.bat

# Or use PowerShell for advanced features
.\quick-update.ps1
```

### Linux/Mac Users
```bash
# Make executable (first time only)
chmod +x quick-update.sh

# Run the script
./quick-update.sh
```

## 📋 Available Scripts

### 1. `quick-update.bat` (Windows Batch)
- **Best for**: Simple, one-click updates on Windows
- **Features**: Basic error handling, user-friendly output
- **Usage**: Double-click or run from command prompt

### 2. `quick-update.ps1` (PowerShell)
- **Best for**: Advanced Windows users who want more control
- **Features**: Colored output, command-line options, better error handling
- **Usage**: 
  ```powershell
  .\quick-update.ps1
  .\quick-update.ps1 -CommitMessage "Fix navigation bug"
  .\quick-update.ps1 -Force -SkipBuild
  ```

### 3. `quick-update.sh` (Shell Script)
- **Best for**: Linux/Mac users or Windows with WSL/Git Bash
- **Features**: Cross-platform, colored output, command-line options
- **Usage**:
  ```bash
  ./quick-update.sh
  ./quick-update.sh -m "Fix navigation bug"
  ./quick-update.sh --force --skip-build
  ```

## 🔧 What These Scripts Do

1. **Check for Changes**: Detect if you have uncommitted local changes
2. **Commit & Push**: Add, commit, and push changes to GitHub
3. **Update Server**: SSH into your production server and run the update script
4. **Verify**: Confirm the update was successful

## ⚙️ Command Line Options

### PowerShell (`quick-update.ps1`)
- `-CommitMessage <string>`: Custom commit message
- `-Force`: Skip confirmation prompts
- `-SkipBuild`: Skip frontend build (faster updates)
- `-Help`: Show help information

### Shell Script (`quick-update.sh`)
- `-m, --message <msg>`: Custom commit message
- `-f, --force`: Skip confirmation prompts
- `-s, --skip-build`: Skip frontend build (faster updates)
- `-h, --help`: Show help information

## 📝 Examples

### Basic Update
```bash
# Windows
quick-update.bat

# PowerShell
.\quick-update.ps1

# Linux/Mac
./quick-update.sh
```

### Update with Custom Commit Message
```bash
# PowerShell
.\quick-update.ps1 -CommitMessage "Add new navigation feature"

# Linux/Mac
./quick-update.sh -m "Add new navigation feature"
```

### Force Update (No Prompts)
```bash
# PowerShell
.\quick-update.ps1 -Force

# Linux/Mac
./quick-update.sh --force
```

## 🔒 Prerequisites

1. **SSH Access**: You must have SSH access to your production server
2. **Git Configured**: Git must be configured with your GitHub credentials
3. **Server Setup**: The production server must have the `update-from-github.sh` script

## 🌐 Server Information

- **Server**: debian@51.83.47.117
- **Project Path**: `/home/debian/api-xsigma`
- **Update Script**: `./update-from-github.sh`

## 🔍 Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Check your internet connection
   - Verify SSH key is set up correctly
   - Ensure server is accessible

2. **Git Push Failed**
   - Check your GitHub credentials
   - Verify you have push access to the repository
   - Check for merge conflicts

3. **Server Update Failed**
   - SSH into server manually and check logs
   - Verify the `update-from-github.sh` script exists
   - Check PM2 and Nginx status

### Manual Server Update

If the automatic scripts fail, you can update manually:

```bash
# 1. SSH into server
ssh debian@51.83.47.117

# 2. Navigate to project
cd /home/debian/api-xsigma

# 3. Run update script
./update-from-github.sh

# 4. Check status
pm2 status
```

## 📊 Script Workflow

```
Local Changes → Git Add/Commit → Git Push → SSH to Server → Run Update Script → Success!
     ↓              ↓              ↓           ↓              ↓                ↓
  Detected     Committed      Pushed to    Connected     Updated Code      Website
              Locally        GitHub       to Server     & Restarted       Updated
```

## 🎯 Tips for Best Results

1. **Test Locally First**: Always test your changes locally before updating production
2. **Use Descriptive Commit Messages**: Help track what changes were made
3. **Clear Browser Cache**: After updates, clear your browser cache to see changes
4. **Monitor Server**: Check PM2 status after updates to ensure everything is running

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review server logs: `pm2 logs api-xsigma-backend`
3. Verify server status: `pm2 status` and `sudo systemctl status nginx`
