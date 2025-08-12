@echo off
REM 🚀 XSIGMA Server Quick Start
REM Simple batch file to manage your XSIGMA server

title XSIGMA Server Manager

:menu
cls
echo.
echo ========================================
echo    🚀 XSIGMA Server Manager
echo ========================================
echo.
echo Server: 51.83.47.117
echo.
echo 1. ✅ Check Status
echo 2. 🚀 Start Server
echo 3. 🛑 Stop Server  
echo 4. 🔄 Restart Server
echo 5. 📋 View Logs
echo 6. 🏥 Health Check
echo 7. 🌐 Open Frontend
echo 8. 📚 Open API Docs
echo 9. ❌ Exit
echo.
set /p choice="Enter your choice (1-9): "

if "%choice%"=="1" goto status
if "%choice%"=="2" goto start
if "%choice%"=="3" goto stop
if "%choice%"=="4" goto restart
if "%choice%"=="5" goto logs
if "%choice%"=="6" goto health
if "%choice%"=="7" goto frontend
if "%choice%"=="8" goto api
if "%choice%"=="9" goto exit

echo Invalid choice. Please try again.
pause
goto menu

:status
echo.
echo ✅ Checking server status...
powershell -ExecutionPolicy Bypass -File "start-server.ps1" -Status
pause
goto menu

:start
echo.
echo 🚀 Starting XSIGMA server...
powershell -ExecutionPolicy Bypass -File "start-server.ps1" -Start
pause
goto menu

:stop
echo.
echo 🛑 Stopping XSIGMA server...
powershell -ExecutionPolicy Bypass -File "start-server.ps1" -Stop
pause
goto menu

:restart
echo.
echo 🔄 Restarting XSIGMA server...
powershell -ExecutionPolicy Bypass -File "start-server.ps1" -Restart
pause
goto menu

:logs
echo.
echo 📋 Fetching server logs...
powershell -ExecutionPolicy Bypass -File "start-server.ps1" -Logs
pause
goto menu

:health
echo.
echo 🏥 Checking application health...
powershell -ExecutionPolicy Bypass -File "start-server.ps1" -Health
pause
goto menu

:frontend
echo.
echo 🌐 Opening frontend in browser...
start http://www.xsigma.co.uk/
echo Frontend opened in browser!
pause
goto menu

:api
echo.
echo 📚 Opening API documentation in browser...
start http://www.xsigma.co.uk/api/api-docs
echo API docs opened in browser!
pause
goto menu

:exit
echo.
echo 👋 Goodbye!
exit /b 0
