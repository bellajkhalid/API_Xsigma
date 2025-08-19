@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    XSigma Automatic Server Update
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "Frontend_Xsigma" (
    echo ❌ Error: Frontend_Xsigma directory not found.
    echo Please run this script from the project root.
    pause
    exit /b 1
)

REM Check git status
echo 📋 Checking git status...
git status --porcelain > temp_status.txt
set /p git_changes=<temp_status.txt
del temp_status.txt

if "%git_changes%"=="" (
    echo ℹ️  No local changes detected. Checking if server needs update...
    goto :check_server
)

REM Show current changes
echo.
echo 📝 Current changes:
git status --short
echo.

REM Get commit message
set /p commit_msg="💬 Enter commit message (or press Enter for 'Quick update'): "
if "%commit_msg%"=="" set commit_msg=Quick update

echo.
echo [1/3] 📤 Pushing changes to GitHub...
git add .
git commit -m "%commit_msg%"
git push origin main

if %errorlevel% neq 0 (
    echo ❌ Error: Failed to push to GitHub
    echo Please check your internet connection and GitHub credentials.
    pause
    exit /b 1
)

echo ✅ Successfully pushed to GitHub!

:check_server
echo.
echo [2/3] 🔄 Updating production server...
echo Connecting to debian@51.83.47.117...
echo.

REM Update server via SSH
ssh debian@51.83.47.117 "cd /home/debian/api-xsigma && ./update-from-github.sh"

if %errorlevel% neq 0 (
    echo ❌ Error: Failed to update server
    echo Please check your SSH connection and server status.
    pause
    exit /b 1
)

echo.
echo [3/3] ✅ Update completed successfully!
echo.
echo 🌐 Your website has been updated:
echo   • Production: https://xsigma.co.uk/
echo   • Server IP:  http://51.83.47.117/
echo.
echo 💡 Tip: Clear your browser cache if you don't see changes immediately.
echo.
pause
