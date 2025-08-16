@echo off
echo Updating server with latest changes...
echo.
echo Server: debian@51.83.47.117
echo Password: gTevgjCjJEhp
echo.
echo Please run these commands manually:
echo.
echo 1. Connect to server:
echo    ssh debian@51.83.47.117
echo.
echo 2. Update the code:
echo    cd /home/debian/api-xsigma
echo    git pull
echo.
echo 3. Build frontend:
echo    cd Frontend_Xsigma
echo    npm run build
echo.
echo 4. Restart backend:
echo    pm2 restart api-xsigma-backend
echo.
echo 5. Check status:
echo    pm2 status
echo.
pause
