# 🚀 PM2 Monitor Script for XSIGMA
# Advanced PM2 management and monitoring

param(
    [switch]$Status,
    [switch]$Logs,
    [switch]$Monitor,
    [switch]$Restart,
    [switch]$Scale,
    [int]$Instances = 1,
    [switch]$Health,
    [switch]$Performance,
    [switch]$Reset
)

# Server configuration
$ServerIP = "51.83.47.117"
$Username = "debian"
$Password = "gTevgjCjJEhp"
$AppName = "api-xsigma-backend"

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
    
    if (!(Get-Command plink -ErrorAction SilentlyContinue)) {
        Write-Error "plink not found. Please install PuTTY or use WSL."
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

# Function to get PM2 status
function Get-PM2Status {
    Write-Info "Getting PM2 status..."
    
    $commands = @(
        "pm2 status",
        "pm2 describe $AppName",
        "pm2 prettylist"
    )
    
    foreach ($cmd in $commands) {
        Write-Info "Running: $cmd"
        Invoke-SSHCommand $cmd
        Write-Output "`n" + "="*60 + "`n"
    }
}

# Function to view PM2 logs
function Get-PM2Logs {
    Write-Info "Fetching PM2 logs..."
    
    $commands = @(
        "pm2 logs $AppName --lines 30 --nostream",
        "pm2 logs $AppName --err --lines 10 --nostream",
        "pm2 logs $AppName --out --lines 10 --nostream"
    )
    
    foreach ($cmd in $commands) {
        Write-Info "Running: $cmd"
        Invoke-SSHCommand $cmd
        Write-Output "`n" + "="*60 + "`n"
    }
}

# Function to start PM2 monitoring
function Start-PM2Monitor {
    Write-Info "Starting PM2 real-time monitoring..."
    Write-Warning "This will open an interactive session. Press Ctrl+C to exit."
    
    # Note: This opens an interactive session
    Invoke-SSHCommand "pm2 monit"
}

# Function to restart PM2 application
function Restart-PM2App {
    Write-Info "Restarting PM2 application..."
    
    $commands = @(
        "pm2 restart $AppName",
        "pm2 status",
        "sleep 3",
        "curl -s http://localhost/api/health || echo 'Health check failed'"
    )
    
    $fullCommand = $commands -join " && "
    
    if (Invoke-SSHCommand $fullCommand) {
        Write-Success "Application restarted successfully!"
    } else {
        Write-Error "Failed to restart application"
    }
}

# Function to scale PM2 application
function Scale-PM2App {
    param([int]$InstanceCount)
    
    Write-Info "Scaling PM2 application to $InstanceCount instances..."
    
    $commands = @(
        "pm2 scale $AppName $InstanceCount",
        "pm2 status",
        "sleep 2",
        "curl -s http://localhost/api/health || echo 'Health check failed'"
    )
    
    $fullCommand = $commands -join " && "
    
    if (Invoke-SSHCommand $fullCommand) {
        Write-Success "Application scaled to $InstanceCount instances!"
    } else {
        Write-Error "Failed to scale application"
    }
}

# Function to check application health
function Test-AppHealth {
    Write-Info "Checking application health..."
    
    $commands = @(
        "pm2 status",
        "curl -s http://localhost/api/health",
        "curl -s -o /dev/null -w '%{http_code}' http://localhost/",
        "ps aux | grep node | grep -v grep",
        "netstat -tlnp | grep :5005"
    )
    
    foreach ($cmd in $commands) {
        Write-Info "Running: $cmd"
        Invoke-SSHCommand $cmd
        Write-Output "`n" + "-"*40 + "`n"
    }
}

# Function to get performance metrics
function Get-Performance {
    Write-Info "Getting performance metrics..."
    
    $commands = @(
        "pm2 describe $AppName",
        "free -h",
        "df -h /",
        "uptime",
        "pm2 jlist | jq '.[0].pm2_env.restart_time, .[0].monit'",
        "top -bn1 | grep node"
    )
    
    foreach ($cmd in $commands) {
        Write-Info "Running: $cmd"
        Invoke-SSHCommand $cmd
        Write-Output "`n" + "-"*40 + "`n"
    }
}

# Function to reset PM2
function Reset-PM2 {
    Write-Warning "This will stop and restart the PM2 application!"
    $confirm = Read-Host "Are you sure? (y/N)"
    
    if ($confirm -eq 'y' -or $confirm -eq 'Y') {
        Write-Info "Resetting PM2 application..."
        
        $commands = @(
            "pm2 delete $AppName",
            "cd /home/debian/api-xsigma/Backend_Xsigma",
            "pm2 start ecosystem.config.js",
            "pm2 save",
            "pm2 status"
        )
        
        $fullCommand = $commands -join " && "
        
        if (Invoke-SSHCommand $fullCommand) {
            Write-Success "PM2 application reset successfully!"
            Start-Sleep 3
            Test-AppHealth
        } else {
            Write-Error "Failed to reset PM2 application"
        }
    } else {
        Write-Info "Reset cancelled."
    }
}

# Main script logic
Write-Info "🚀 PM2 Monitor for XSIGMA"
Write-Info "Server: $ServerIP | App: $AppName"
Write-Output ""

if ($Status) {
    Get-PM2Status
}
elseif ($Logs) {
    Get-PM2Logs
}
elseif ($Monitor) {
    Start-PM2Monitor
}
elseif ($Restart) {
    Restart-PM2App
}
elseif ($Scale) {
    Scale-PM2App -InstanceCount $Instances
}
elseif ($Health) {
    Test-AppHealth
}
elseif ($Performance) {
    Get-Performance
}
elseif ($Reset) {
    Reset-PM2
}
else {
    Write-Info "PM2 Management Commands:"
    Write-Output "  .\pm2-monitor.ps1 -Status        # Show PM2 status and details"
    Write-Output "  .\pm2-monitor.ps1 -Logs          # View application logs"
    Write-Output "  .\pm2-monitor.ps1 -Monitor       # Real-time monitoring dashboard"
    Write-Output "  .\pm2-monitor.ps1 -Restart       # Restart application"
    Write-Output "  .\pm2-monitor.ps1 -Scale -Instances 4  # Scale to 4 instances"
    Write-Output "  .\pm2-monitor.ps1 -Health        # Check application health"
    Write-Output "  .\pm2-monitor.ps1 -Performance   # Get performance metrics"
    Write-Output "  .\pm2-monitor.ps1 -Reset         # Reset PM2 application"
    Write-Output ""
    Write-Info "🎯 Quick Commands:"
    Write-Output "  Status + Health: .\pm2-monitor.ps1 -Status; .\pm2-monitor.ps1 -Health"
    Write-Output "  Restart + Check: .\pm2-monitor.ps1 -Restart; .\pm2-monitor.ps1 -Health"
    Write-Output ""
    Write-Info "📊 Current Status:"
    Get-PM2Status
}
