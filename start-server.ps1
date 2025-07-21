# 🚀 XSIGMA Server Startup Script
# Simple PowerShell script to start your XSIGMA server

param(
    [switch]$Status,
    [switch]$Start,
    [switch]$Stop,
    [switch]$Restart,
    [switch]$Logs,
    [switch]$Health
)

# Server configuration
$ServerIP = "51.83.47.117"
$Username = "debian"
$Password = "gTevgjCjJEhp"

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success($message) { Write-ColorOutput Green "✅ $message" }
function Write-Error($message) { Write-ColorOutput Red "❌ $message" }
function Write-Info($message) { Write-ColorOutput Cyan "ℹ️  $message" }
function Write-Warning($message) { Write-ColorOutput Yellow "⚠️  $message" }

# Function to execute SSH command
function Invoke-SSHCommand {
    param([string]$Command)
    
    Write-Info "Executing: $Command"
    
    # Using plink (PuTTY) for SSH - install if not available
    if (!(Get-Command plink -ErrorAction SilentlyContinue)) {
        Write-Error "plink not found. Please install PuTTY or use WSL."
        Write-Info "Alternative: Use Windows Subsystem for Linux (WSL) with ssh command"
        return $false
    }
    
    try {
        $result = echo y | plink -ssh -l $Username -pw $Password $ServerIP $Command 2>&1
        Write-Output $result
        return $true
    }
    catch {
        Write-Error "SSH command failed: $_"
        return $false
    }
}

# Function to check server status
function Get-ServerStatus {
    Write-Info "Checking server status..."
    
    $commands = @(
        "pm2 status",
        "sudo systemctl status nginx --no-pager -l",
        "sudo netstat -tlnp | grep -E ':(80|5005)'"
    )
    
    foreach ($cmd in $commands) {
        Write-Info "Running: $cmd"
        Invoke-SSHCommand $cmd
        Write-Output "`n" + "="*50 + "`n"
    }
}

# Function to start services
function Start-Services {
    Write-Info "Starting XSIGMA services..."
    
    $commands = @(
        "cd /home/debian/api-xsigma/Backend_Xsigma",
        "pm2 start ecosystem.config.js",
        "sudo systemctl start nginx",
        "sudo systemctl enable nginx"
    )
    
    $fullCommand = $commands -join " && "
    
    if (Invoke-SSHCommand $fullCommand) {
        Write-Success "Services started successfully!"
        Start-Sleep 3
        Test-Health
    } else {
        Write-Error "Failed to start services"
    }
}

# Function to stop services
function Stop-Services {
    Write-Info "Stopping XSIGMA services..."
    
    $commands = @(
        "pm2 stop all",
        "sudo systemctl stop nginx"
    )
    
    $fullCommand = $commands -join " && "
    
    if (Invoke-SSHCommand $fullCommand) {
        Write-Success "Services stopped successfully!"
    } else {
        Write-Error "Failed to stop services"
    }
}

# Function to restart services
function Restart-Services {
    Write-Info "Restarting XSIGMA services..."
    
    $commands = @(
        "pm2 restart all",
        "sudo systemctl restart nginx"
    )
    
    $fullCommand = $commands -join " && "
    
    if (Invoke-SSHCommand $fullCommand) {
        Write-Success "Services restarted successfully!"
        Start-Sleep 3
        Test-Health
    } else {
        Write-Error "Failed to restart services"
    }
}

# Function to view logs
function Get-Logs {
    Write-Info "Fetching recent logs..."
    
    $commands = @(
        "pm2 logs api-xsigma-backend --lines 20",
        "sudo tail -20 /var/log/nginx/error.log",
        "sudo tail -20 /var/log/nginx/access.log"
    )
    
    foreach ($cmd in $commands) {
        Write-Info "Running: $cmd"
        Invoke-SSHCommand $cmd
        Write-Output "`n" + "="*50 + "`n"
    }
}

# Function to test health
function Test-Health {
    Write-Info "Testing application health..."
    
    try {
        $response = Invoke-WebRequest -Uri "http://$ServerIP/api/health" -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Success "✅ Backend API is healthy!"
            Write-Output $response.Content
        }
    }
    catch {
        Write-Error "❌ Backend API health check failed: $_"
    }
    
    try {
        $response = Invoke-WebRequest -Uri "http://$ServerIP/" -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Success "✅ Frontend is accessible!"
        }
    }
    catch {
        Write-Error "❌ Frontend health check failed: $_"
    }
}

# Main script logic
Write-Info "🚀 XSIGMA Server Management Script"
Write-Info "Server: $ServerIP"
Write-Output ""

if ($Status) {
    Get-ServerStatus
}
elseif ($Start) {
    Start-Services
}
elseif ($Stop) {
    Stop-Services
}
elseif ($Restart) {
    Restart-Services
}
elseif ($Logs) {
    Get-Logs
}
elseif ($Health) {
    Test-Health
}
else {
    Write-Info "Usage examples:"
    Write-Output "  .\start-server.ps1 -Status    # Check server status"
    Write-Output "  .\start-server.ps1 -Start     # Start all services"
    Write-Output "  .\start-server.ps1 -Stop      # Stop all services"
    Write-Output "  .\start-server.ps1 -Restart   # Restart all services"
    Write-Output "  .\start-server.ps1 -Logs      # View recent logs"
    Write-Output "  .\start-server.ps1 -Health    # Test application health"
    Write-Output ""
    Write-Info "🌐 Access URLs:"
    Write-Output "  Frontend: http://$ServerIP/"
    Write-Output "  Backend:  http://$ServerIP/api/"
    Write-Output "  Health:   http://$ServerIP/api/health"
}
