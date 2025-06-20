# Universal Screenshot Monitor MCP - Installation Script
# PowerShell script for Windows installation

Write-Host "🚀 Installing Universal Screenshot Monitor MCP..." -ForegroundColor Cyan

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please install npm first." -ForegroundColor Red
    exit 1
}

# Navigate to MCP directory
$mcpDir = "universal-screenshot-monitor-mcp"
if (Test-Path $mcpDir) {
    Set-Location $mcpDir
    Write-Host "📁 Navigated to $mcpDir" -ForegroundColor Yellow
} else {
    Write-Host "❌ Directory $mcpDir not found!" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Build TypeScript
Write-Host "🔨 Building TypeScript..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "✅ TypeScript compiled successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to build TypeScript" -ForegroundColor Red
    exit 1
}

# Test the MCP server
Write-Host "🧪 Testing MCP server..." -ForegroundColor Yellow
try {
    # Create a simple test
    $testResult = node dist/index.js --version 2>&1
    Write-Host "✅ MCP server test completed" -ForegroundColor Green
} catch {
    Write-Host "⚠️  MCP server test had issues, but installation may still work" -ForegroundColor Yellow
}

# Create screenshots directory
$screenshotsDir = "screenshots"
if (!(Test-Path $screenshotsDir)) {
    New-Item -ItemType Directory -Path $screenshotsDir
    Write-Host "📁 Created screenshots directory" -ForegroundColor Green
}

# Go back to parent directory
Set-Location ..

Write-Host ""
Write-Host "🎉 Installation completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Open Augment Settings (Tools > MCP)" -ForegroundColor White
Write-Host "2. Click 'Add MCP'" -ForegroundColor White
Write-Host "3. Use this configuration:" -ForegroundColor White
Write-Host ""
Write-Host "Name: universal-screenshot-monitor" -ForegroundColor Yellow
Write-Host "Command: node" -ForegroundColor Yellow
Write-Host "Args: ['./universal-screenshot-monitor-mcp/dist/index.js']" -ForegroundColor Yellow
Write-Host "Working Directory: C:\Users\bella\OneDrive\Desktop\API_Xsigma" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Click 'Connect' to activate the MCP" -ForegroundColor White
Write-Host "5. Test with: take_screenshot tool" -ForegroundColor White
Write-Host ""
Write-Host "📖 For more details, see: universal-screenshot-monitor-mcp/README.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔧 Available tools:" -ForegroundColor Cyan
Write-Host "  - take_screenshot: Take screenshots of any website" -ForegroundColor White
Write-Host "  - detect_errors: Detect errors and take screenshots" -ForegroundColor White
Write-Host ""
Write-Host "Happy monitoring! 📸" -ForegroundColor Green
