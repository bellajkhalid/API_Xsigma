# XSigma Automatic Server Update Script
# PowerShell version with enhanced features

param(
    [string]$CommitMessage = "",
    [switch]$Force,
    [switch]$SkipBuild,
    [switch]$Help
)

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Cyan = "Cyan"
$Blue = "Blue"

function Write-Header {
    Write-Host "========================================" -ForegroundColor $Cyan
    Write-Host "    XSigma Automatic Server Update" -ForegroundColor $Cyan
    Write-Host "========================================" -ForegroundColor $Cyan
    Write-Host ""
}

function Write-Step {
    param([string]$Message, [int]$Step, [int]$Total)
    Write-Host "[$Step/$Total] $Message" -ForegroundColor $Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor $Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor $Red
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor $Yellow
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor $Cyan
}

function Show-Help {
    Write-Host "XSigma Automatic Server Update Script" -ForegroundColor $Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor $Yellow
    Write-Host "  .\quick-update.ps1 [options]"
    Write-Host ""
    Write-Host "Options:" -ForegroundColor $Yellow
    Write-Host "  -CommitMessage 'message'  Custom commit message"
    Write-Host "  -Force                    Skip confirmation prompts"
    Write-Host "  -SkipBuild               Skip frontend build (faster)"
    Write-Host "  -Help                    Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor $Yellow
    Write-Host "  .\quick-update.ps1"
    Write-Host "  .\quick-update.ps1 -CommitMessage 'Fix navigation bug'"
    Write-Host "  .\quick-update.ps1 -Force -SkipBuild"
    exit 0
}

# Show help if requested
if ($Help) {
    Show-Help
}

# Main script
try {
    Write-Header

    # Check if we're in the right directory
    if (-not (Test-Path "Frontend_Xsigma")) {
        Write-Error "Frontend_Xsigma directory not found."
        Write-Host "Please run this script from the project root directory." -ForegroundColor $Yellow
        exit 1
    }

    # Check git status
    Write-Info "Checking git status..."
    $gitStatus = git status --porcelain
    
    if (-not $gitStatus) {
        Write-Info "No local changes detected. Checking if server needs update..."
        $skipCommit = $true
    } else {
        $skipCommit = $false
        Write-Host ""
        Write-Host "📝 Current changes:" -ForegroundColor $Yellow
        git status --short
        Write-Host ""
        
        if (-not $CommitMessage) {
            $CommitMessage = Read-Host "💬 Enter commit message (or press Enter for 'Quick update')"
            if (-not $CommitMessage) {
                $CommitMessage = "Quick update"
            }
        }
    }

    # Step 1: Push to GitHub (if there are changes)
    if (-not $skipCommit) {
        Write-Step "📤 Pushing changes to GitHub..." 1 3
        
        git add .
        git commit -m $CommitMessage
        git push origin main
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to push to GitHub"
            Write-Host "Please check your internet connection and GitHub credentials." -ForegroundColor $Yellow
            exit 1
        }
        
        Write-Success "Successfully pushed to GitHub!"
    }

    # Step 2: Update production server
    Write-Step "🔄 Updating production server..." 2 3
    Write-Host "Connecting to debian@51.83.47.117..." -ForegroundColor $Cyan
    Write-Host ""

    # SSH command to update server
    ssh debian@51.83.47.117 "cd /home/debian/api-xsigma; ./update-from-github.sh"

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to update server"
        Write-Host "Please check your SSH connection and server status." -ForegroundColor $Yellow
        exit 1
    }

    # Step 3: Completion
    Write-Step "✅ Update completed successfully!" 3 3
    Write-Host ""
    Write-Host "🌐 Your website has been updated:" -ForegroundColor $Green
    Write-Host "  • Production: https://xsigma.co.uk/" -ForegroundColor $Cyan
    Write-Host "  • Server IP:  http://51.83.47.117/" -ForegroundColor $Cyan
    Write-Host ""
    Write-Host "💡 Tip: Clear your browser cache if you don't see changes immediately." -ForegroundColor $Yellow
    Write-Host ""

} catch {
    Write-Error "An unexpected error occurred: $($_.Exception.Message)"
    exit 1
}

if (-not $Force) {
    Write-Host "Press any key to continue..." -ForegroundColor $Yellow
    $null = Read-Host
}
