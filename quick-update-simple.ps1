# XSigma Simple Server Update Script
# PowerShell version

param(
    [string]$CommitMessage = "Quick update",
    [switch]$Help
)

function Show-Help {
    Write-Host "XSigma Automatic Server Update Script" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\quick-update-simple.ps1 [options]"
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "  -CommitMessage 'message'  Custom commit message"
    Write-Host "  -Help                     Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\quick-update-simple.ps1"
    Write-Host "  .\quick-update-simple.ps1 -CommitMessage 'Fix navigation bug'"
    exit 0
}

# Show help if requested
if ($Help) {
    Show-Help
}

# Main script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    XSigma Automatic Server Update" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "Frontend_Xsigma")) {
    Write-Host "Error: Frontend_Xsigma directory not found." -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check git status
Write-Host "Checking git status..." -ForegroundColor Cyan
$gitStatus = git status --porcelain

if (-not $gitStatus) {
    Write-Host "No local changes detected. Checking if server needs update..." -ForegroundColor Cyan
    $skipCommit = $true
} else {
    $skipCommit = $false
    Write-Host ""
    Write-Host "Current changes:" -ForegroundColor Yellow
    git status --short
    Write-Host ""
    
    if (-not $CommitMessage -or $CommitMessage -eq "Quick update") {
        $userMessage = Read-Host "Enter commit message (or press Enter for 'Quick update')"
        if ($userMessage) {
            $CommitMessage = $userMessage
        }
    }
}

# Step 1: Push to GitHub (if there are changes)
if (-not $skipCommit) {
    Write-Host "[1/3] Pushing changes to GitHub..." -ForegroundColor Blue
    
    git add .
    git commit -m $CommitMessage
    git push origin main
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to push to GitHub" -ForegroundColor Red
        Write-Host "Please check your internet connection and GitHub credentials." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
}

# Step 2: Update production server
Write-Host "[2/3] Updating production server..." -ForegroundColor Blue
Write-Host "Connecting to debian@51.83.47.117..." -ForegroundColor Cyan
Write-Host ""

# SSH command to update server
ssh debian@51.83.47.117 "cd /home/debian/api-xsigma; ./update-from-github.sh"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to update server" -ForegroundColor Red
    Write-Host "Please check your SSH connection and server status." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Step 3: Completion
Write-Host "[3/3] Update completed successfully!" -ForegroundColor Blue
Write-Host ""
Write-Host "Your website has been updated:" -ForegroundColor Green
Write-Host "  • Production: https://xsigma.co.uk/" -ForegroundColor Cyan
Write-Host "  • Server IP:  http://51.83.47.117/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tip: Clear your browser cache if you don't see changes immediately." -ForegroundColor Yellow
Write-Host ""

Write-Host "Press Enter to continue..." -ForegroundColor Yellow
Read-Host
