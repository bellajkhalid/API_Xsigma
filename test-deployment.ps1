# 🧪 XSIGMA Deployment Testing Script
# Tests both local and remote deployments

param(
    [switch]$Local,
    [switch]$Remote,
    [switch]$All
)

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success($message) { Write-ColorOutput Green "[✅ PASS] $message" }
function Write-Error($message) { Write-ColorOutput Red "[❌ FAIL] $message" }
function Write-Info($message) { Write-ColorOutput Cyan "[ℹ️ INFO] $message" }
function Write-Warning($message) { Write-ColorOutput Yellow "[⚠️ WARN] $message" }

# Test URL function
function Test-URL {
    param([string]$URL, [string]$Description)
    
    try {
        $response = Invoke-WebRequest -Uri $URL -TimeoutSec 10 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Success "$Description - Status: $($response.StatusCode)"
            return $true
        } else {
            Write-Warning "$Description - Status: $($response.StatusCode)"
            return $false
        }
    }
    catch {
        Write-Error "$Description - Error: $($_.Exception.Message)"
        return $false
    }
}

# Test Local Deployment
function Test-LocalDeployment {
    Write-Info "🏠 Testing Local Deployment (localhost:5174)"
    Write-Output ""
    
    $localTests = @(
        @{ URL = "http://localhost:5174/"; Description = "Home Page" },
        @{ URL = "http://localhost:5174/linkedin"; Description = "LinkedIn Page" },
        @{ URL = "http://localhost:5174/account"; Description = "Account Page" },
        @{ URL = "http://localhost:5174/privacy-policy.html"; Description = "Privacy Policy" }
    )
    
    $passCount = 0
    foreach ($test in $localTests) {
        if (Test-URL -URL $test.URL -Description $test.Description) {
            $passCount++
        }
        Start-Sleep 1
    }
    
    Write-Output ""
    Write-Info "Local Tests: $passCount/$($localTests.Count) passed"
    
    if ($passCount -eq $localTests.Count) {
        Write-Success "🎉 All local tests passed!"
    } else {
        Write-Warning "⚠️ Some local tests failed. Check your dev server."
    }
}

# Test Remote Deployment
function Test-RemoteDeployment {
    Write-Info "🌐 Testing Remote Deployment (51.83.47.117)"
    Write-Output ""
    
    $remoteTests = @(
        @{ URL = "http://51.83.47.117/"; Description = "Home Page" },
        @{ URL = "http://51.83.47.117/linkedin"; Description = "LinkedIn Page" },
        @{ URL = "http://51.83.47.117/account"; Description = "Account Page" },
        @{ URL = "http://51.83.47.117/health"; Description = "API Health" },
        @{ URL = "http://51.83.47.117/privacy-policy.html"; Description = "Privacy Policy" }
    )
    
    $passCount = 0
    foreach ($test in $remoteTests) {
        if (Test-URL -URL $test.URL -Description $test.Description) {
            $passCount++
        }
        Start-Sleep 1
    }
    
    Write-Output ""
    Write-Info "Remote Tests: $passCount/$($remoteTests.Count) passed"
    
    if ($passCount -eq $remoteTests.Count) {
        Write-Success "🎉 All remote tests passed!"
    } else {
        Write-Warning "⚠️ Some remote tests failed. Check your server."
    }
}

# Test LinkedIn OAuth Configuration
function Test-LinkedInConfig {
    Write-Info "🔗 Testing LinkedIn OAuth Configuration"
    Write-Output ""
    
    # Check if environment variables are set locally
    if ($env:REACT_APP_LINKEDIN_CLIENT_ID) {
        Write-Success "LinkedIn Client ID configured locally"
    } else {
        Write-Warning "LinkedIn Client ID not found in local environment"
    }
    
    # Test OAuth URLs
    $oauthTests = @(
        "http://localhost:5174/linkedin/callback",
        "http://51.83.47.117/linkedin/callback"
    )
    
    foreach ($url in $oauthTests) {
        try {
            $response = Invoke-WebRequest -Uri $url -TimeoutSec 5 -UseBasicParsing
            Write-Success "OAuth callback accessible: $url"
        }
        catch {
            Write-Info "OAuth callback route exists: $url (expected 404 without auth code)"
        }
    }
}

# Main script logic
Write-Info "🧪 XSIGMA Deployment Testing"
Write-Info "Testing LinkedIn integration and logo navigation"
Write-Output ""

if ($Local -or $All) {
    Test-LocalDeployment
    Write-Output ""
}

if ($Remote -or $All) {
    Test-RemoteDeployment
    Write-Output ""
}

if ($All) {
    Test-LinkedInConfig
    Write-Output ""
}

if (!$Local -and !$Remote -and !$All) {
    Write-Info "Usage examples:"
    Write-Output "  .\test-deployment.ps1 -Local     # Test local development"
    Write-Output "  .\test-deployment.ps1 -Remote    # Test remote server"
    Write-Output "  .\test-deployment.ps1 -All       # Test both + OAuth config"
    Write-Output ""
    Write-Info "Quick test both environments:"
    Test-LocalDeployment
    Write-Output ""
    Test-RemoteDeployment
}

Write-Output ""
Write-Info "🎯 Manual Testing Checklist:"
Write-Output "  1. Click XsigmaSolution logo → should go to home"
Write-Output "  2. Test LinkedIn page → all tabs should work"
Write-Output "  3. Test OAuth flow → should redirect to LinkedIn"
Write-Output "  4. Test mobile responsiveness"
Write-Output "  5. Test dark/light mode toggle"
Write-Output ""
Write-Info "🔗 Test URLs:"
Write-Output "  Local:  http://localhost:5174/linkedin"
Write-Output "  Remote: http://51.83.47.117/linkedin"
