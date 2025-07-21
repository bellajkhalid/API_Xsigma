# 🚀 Quick PM2 Status Checker for XSIGMA
# Simple script to check PM2 status on server

$ServerIP = "51.83.47.117"
$Username = "debian"

Write-Host "🚀 Checking PM2 Status on XSIGMA Server" -ForegroundColor Cyan
Write-Host "Server: $ServerIP" -ForegroundColor White
Write-Host ""

# Function to run SSH command
function Invoke-SSH {
    param([string]$Command)
    Write-Host "Running: $Command" -ForegroundColor Yellow
    ssh $Username@$ServerIP $Command
    Write-Host ""
}

# Check PM2 status
Write-Host "📊 PM2 Process Status:" -ForegroundColor Green
Invoke-SSH "pm2 status"

# Check application health
Write-Host "🏥 Application Health Check:" -ForegroundColor Green
Invoke-SSH "curl -s http://localhost:5005/health || echo 'Health check failed'"

# Check nginx status
Write-Host "🌐 Nginx Status:" -ForegroundColor Green
Invoke-SSH "sudo systemctl status nginx --no-pager -l | head -10"

# Check ports
Write-Host "🔌 Port Status:" -ForegroundColor Green
Invoke-SSH "sudo netstat -tlnp | grep -E ':(80|5005)'"

# Quick logs
Write-Host "📋 Recent Logs (last 5 lines):" -ForegroundColor Green
Invoke-SSH "pm2 logs api-xsigma-backend --lines 5 --nostream"

Write-Host "✅ Status check complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Access URLs:" -ForegroundColor Cyan
Write-Host "  Frontend: http://$ServerIP/" -ForegroundColor White
Write-Host "  Backend:  http://$ServerIP/api/" -ForegroundColor White
Write-Host "  Health:   http://$ServerIP/api/health" -ForegroundColor White
