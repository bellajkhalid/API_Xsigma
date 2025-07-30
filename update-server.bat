@echo off
REM 🔄 XSIGMA Server Update Menu
REM Simple interface to update your XSIGMA server

title XSIGMA Server Update Manager

:menu
cls
echo.
echo ========================================
echo    🔄 XSIGMA Server Update Manager
echo ========================================
echo.
echo Server: 51.83.47.117
echo.
echo 1. 📊 Check Current Status
echo 2. 🔄 Full Update (Frontend + Backend)
echo 3. 🖥️  Backend Only Update
echo 4. 🌐 Frontend Only Update
echo 5. ⚡ Force Update (Reset Local Changes)
echo 6. 🌐 Open Frontend
echo 7. 📚 Open API Docs
echo 8. 🏥 Test Health
echo 9. ❌ Exit
echo.
set /p choice="Enter your choice (1-9): "

if "%choice%"=="1" goto status
if "%choice%"=="2" goto update
if "%choice%"=="3" goto backend
if "%choice%"=="4" goto frontend
if "%choice%"=="5" goto force
if "%choice%"=="6" goto open_frontend
if "%choice%"=="7" goto open_api
if "%choice%"=="8" goto health
if "%choice%"=="9" goto exit

echo Invalid choice. Please try again.
pause
goto menu

:status
echo.
echo 📊 Checking current server status...
powershell -ExecutionPolicy Bypass -File "update-server.ps1" -Status
pause
goto menu

:update
echo.
echo 🔄 Starting full update...
powershell -ExecutionPolicy Bypass -File "update-server.ps1" -Update
pause
goto menu

:backend
echo.
echo 🖥️ Updating backend only...
powershell -ExecutionPolicy Bypass -File "update-server.ps1" -BackendOnly
pause
goto menu

:frontend
echo.
echo 🌐 Updating frontend only...
powershell -ExecutionPolicy Bypass -File "update-server.ps1" -FrontendOnly
pause
goto menu

:force
echo.
echo ⚡ Force updating (this will reset any local changes)...
powershell -ExecutionPolicy Bypass -File "update-server.ps1" -Update -Force
pause
goto menu

:open_frontend
echo.
echo 🌐 Opening frontend in browser...
start http://51.83.47.117/
echo Frontend opened in browser!
pause
goto menu

:open_api
echo.
echo 📚 Opening API documentation in browser...
start http://51.83.47.117/api/api-docs
echo API docs opened in browser!
pause
goto menu

:health
echo.
echo 🏥 Testing application health...
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://51.83.47.117/api/health' -TimeoutSec 10; Write-Host '✅ Backend Health: OK' -ForegroundColor Green; Write-Host $r.Content } catch { Write-Host '❌ Backend Health: FAILED' -ForegroundColor Red }"
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://51.83.47.117/' -TimeoutSec 10; Write-Host '✅ Frontend: OK' -ForegroundColor Green } catch { Write-Host '❌ Frontend: FAILED' -ForegroundColor Red }"
pause
goto menu

:exit
echo.
echo 👋 Goodbye!
exit /b 0
