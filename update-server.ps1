# 🔄 XSIGMA Server Update Script
# Updates your XSIGMA server with latest changes from GitHub

param(
    [switch]$Status,
    [switch]$Update,
    [switch]$Force,
    [switch]$BackendOnly,
    [switch]$FrontendOnly
)

# Server configuration
$ServerIP = "51.83.47.117"
$Username = "debian"

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success($message) { Write-ColorOutput Green "[SUCCESS] $message" }
function Write-Error($message) { Write-ColorOutput Red "[ERROR] $message" }
function Write-Info($message) { Write-ColorOutput Cyan "[INFO] $message" }
function Write-Warning($message) { Write-ColorOutput Yellow "[WARNING] $message" }

# Function to execute SSH command
function Invoke-SSHCommand {
    param([string]$Command)
    
    Write-Info "Executing: $Command"
    
    if (!(Get-Command ssh -ErrorAction SilentlyContinue)) {
        Write-Error "SSH not found. Please install OpenSSH or use WSL."
        return $false
    }
    
    try {
        ssh $Username@$ServerIP $Command
        return $LASTEXITCODE -eq 0
    }
    catch {
        Write-Error "SSH command failed: $_"
        return $false
    }
}

# Function to check current server status
function Get-ServerStatus {
    Write-Info "Checking current server status..."

    Write-Info "=== Current Git Status ==="
    Invoke-SSHCommand "cd /home/debian/api-xsigma; git log --oneline -3"

    Write-Info "=== PM2 Status ==="
    Invoke-SSHCommand "pm2 status"

    Write-Info "=== Health Check ==="
    Invoke-SSHCommand "curl -s http://localhost/api/health"
}

# Function to update server
function Update-Server {
    Write-Info "Starting XSIGMA server update..."
    
    # Check if force update is needed
    if ($Force) {
        Write-Warning "Force update requested - will reset any local changes"
        if (!(Invoke-SSHCommand "cd /home/debian/api-xsigma; git reset --hard HEAD; git clean -fd")) {
            Write-Error "Failed to reset repository"
            return $false
        }
    }

    # Run the update script on server
    if ($BackendOnly) {
        Write-Info "Updating backend only..."
        Invoke-SSHCommand "cd /home/debian/api-xsigma; git pull origin main"
        Invoke-SSHCommand "cd /home/debian/api-xsigma/Backend_Xsigma; npm install"
        Invoke-SSHCommand "pm2 restart api-xsigma-backend"
    }
    elseif ($FrontendOnly) {
        Write-Info "Updating frontend only..."
        Invoke-SSHCommand "cd /home/debian/api-xsigma; git pull origin main"
        Invoke-SSHCommand "cd /home/debian/api-xsigma/Frontend_Xsigma; npm install; npm run build"
        Invoke-SSHCommand "sudo systemctl restart nginx"
    }
    else {
        Write-Info "Running full update script..."
        Invoke-SSHCommand "cd /home/debian/api-xsigma; chmod +x update-from-github.sh; ./update-from-github.sh"
    }

    Write-Success "Update completed successfully!"

    # Wait for services to restart
    Start-Sleep 5

    # Verify update
    Write-Info "Verifying update..."
    Test-UpdateSuccess
}

# Function to test update success
function Test-UpdateSuccess {
    Write-Info "Testing updated application..."

    Write-Info "=== Updated Git Status ==="
    Invoke-SSHCommand "cd /home/debian/api-xsigma; git log --oneline -1"

    Write-Info "=== PM2 Status ==="
    Invoke-SSHCommand "pm2 status"

    Write-Info "=== Health Check ==="
    Invoke-SSHCommand "curl -s http://localhost/api/health"

    Write-Info "=== Frontend Check ==="
    Invoke-SSHCommand "curl -s -o /dev/null -w '%{http_code}' http://localhost/"
    
    # Test from local machine
    Write-Info "Testing from local machine..."
    try {
        $response = Invoke-WebRequest -Uri "http://$ServerIP/api/health" -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Success "Backend API is working!"
        }
    }
    catch {
        Write-Warning "Backend API test failed: $_"
    }

    try {
        $response = Invoke-WebRequest -Uri "http://$ServerIP/" -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Success "Frontend is working!"
        }
    }
    catch {
        Write-Warning "Frontend test failed: $_"
    }
}

# Main script logic
Write-Info "XSIGMA Server Update Manager"
Write-Info "Server: $ServerIP"
Write-Output ""

if ($Status) {
    Get-ServerStatus
}
elseif ($Update -or $BackendOnly -or $FrontendOnly) {
    # Show current status first
    Write-Info "Current status before update:"
    Get-ServerStatus
    Write-Output ""
    
    # Confirm update
    if (!$Force) {
        $confirm = Read-Host "Do you want to proceed with the update? (y/N)"
        if ($confirm -ne 'y' -and $confirm -ne 'Y') {
            Write-Info "Update cancelled."
            exit 0
        }
    }
    
    # Perform update
    Update-Server
}
else {
    Write-Info "Usage examples:"
    Write-Output "  .\update-server.ps1 -Status        # Check current server status"
    Write-Output "  .\update-server.ps1 -Update        # Full update (frontend + backend)"
    Write-Output "  .\update-server.ps1 -BackendOnly   # Update backend only"
    Write-Output "  .\update-server.ps1 -FrontendOnly  # Update frontend only"
    Write-Output "  .\update-server.ps1 -Update -Force # Force update (reset local changes)"
    Write-Output ""
    Write-Info "Current Access URLs:"
    Write-Output "  Frontend: http://$ServerIP/"
    Write-Output "  Backend:  http://$ServerIP/api/"
    Write-Output "  Health:   http://$ServerIP/api/health"
    Write-Output ""
    Write-Info "Quick Status Check:"
    Get-ServerStatus
}
