# Test Runner Script for ERP Ticket System (PowerShell)
# Executes all tests for both frontend and backend components

param(
    [switch]$Coverage = $false,
    [switch]$Verbose = $false,
    [string]$Filter = ""
)

function Write-Header {
    param([string]$Message)
    Write-Host "`n$('='*60)" -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor Yellow
    Write-Host "$('='*60)" -ForegroundColor Cyan
}

function Invoke-TestCommand {
    param(
        [string]$Command,
        [string]$Description,
        [string]$WorkingDirectory = (Get-Location).Path
    )
    
    Write-Header "Running: $Description"
    Write-Host "Command: $Command" -ForegroundColor Gray
    Write-Host "Directory: $WorkingDirectory" -ForegroundColor Gray
    
    try {
        $originalLocation = Get-Location
        Set-Location $WorkingDirectory
        
        Invoke-Expression $Command | Out-Host
        $exitCode = $LASTEXITCODE
        
        if ($exitCode -eq 0) {
            Write-Host "✅ $Description - PASSED" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ $Description - FAILED (Exit Code: $exitCode)" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ $Description - ERROR: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    finally {
        Set-Location $originalLocation
    }
}

function Test-Dependencies {
    Write-Header "Checking Dependencies"
    
    # Check Node.js and pnpm
    try {
        $nodeVersion = node --version
        Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Node.js not found" -ForegroundColor Red
        return $false
    }
    
    try {
        $pnpmVersion = pnpm --version
        Write-Host "✅ pnpm: $pnpmVersion" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ pnpm not found" -ForegroundColor Red
        return $false
    }
    
    # Check Python
    try {
        $pythonVersion = python --version
        Write-Host "✅ Python: $pythonVersion" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Python not found" -ForegroundColor Red
        return $false
    }
    
    return $true
}

function Main {
    Write-Host "🚀 Starting Comprehensive Test Suite for ERP Ticket System" -ForegroundColor Magenta
    
    # Check dependencies
    if (-not (Test-Dependencies)) {
        Write-Host "❌ Missing required dependencies. Please install Node.js, pnpm, and Python." -ForegroundColor Red
        exit 1
    }
    
    $projectRoot = $PSScriptRoot
    $backendDir = Join-Path $projectRoot "backend"
    $results = @()
    
    # Frontend Tests
    Write-Header "🎯 Running Frontend Tests"
    
    # Install frontend dependencies if needed
    if (-not (Test-Path (Join-Path $projectRoot "node_modules"))) {
        Write-Host "⚠️  Node modules not found. Installing dependencies..." -ForegroundColor Yellow
        $null = Invoke-TestCommand "pnpm install" "Installing frontend dependencies" $projectRoot
    }
    
    # Run frontend tests
    if ($Coverage) {
        $results += Invoke-TestCommand "pnpm test:coverage" "Frontend Unit Tests with Coverage" $projectRoot
    } else {
        $results += Invoke-TestCommand "pnpm test:run" "Frontend Unit Tests" $projectRoot
    }
    
    # Backend Tests
    Write-Header "🎯 Running Backend Tests"
    
    # Check for virtual environment
    $venvPath = Join-Path $backendDir "venv"
    $venvPathAlt = Join-Path $backendDir ".venv"
    $pythonCmd = "python"
    
    if (Test-Path $venvPath) {
        $pythonCmd = Join-Path $venvPath "Scripts\python.exe"
    } elseif (Test-Path $venvPathAlt) {
        $pythonCmd = Join-Path $venvPathAlt "Scripts\python.exe"
    }
    
    # Install backend dependencies if needed
    if (-not (Test-Path (Join-Path $backendDir "tests"))) {
        Write-Host "⚠️  Backend tests directory not found." -ForegroundColor Yellow
    }
    
    # Run backend tests
    if ($Coverage) {
        $results += Invoke-TestCommand "$pythonCmd -m pytest tests/ --cov=app --cov-report=html --cov-report=term -v" "Backend Unit Tests with Coverage" $backendDir
    } else {
        $results += Invoke-TestCommand "$pythonCmd -m pytest tests/ -v" "Backend Unit Tests" $backendDir
    }
    
    # Test Summary
    Write-Header "🎯 TEST SUITE SUMMARY"
    
    $passed = ($results | Where-Object { $_ -eq $true }).Count
    $total = $results.Count
    $failed = $total - $passed
    
    Write-Host "Total Test Suites: $total" -ForegroundColor White
    Write-Host "Passed: $passed" -ForegroundColor Green
    Write-Host "Failed: $failed" -ForegroundColor Red
    Write-Host "Success Rate: $([math]::Round(($passed/$total)*100, 1))%" -ForegroundColor $(if ($passed -eq $total) { "Green" } else { "Yellow" })
    
    if ($passed -eq $total) {
        Write-Host "`n🎉 All test suites passed! The ticket system is working correctly." -ForegroundColor Green
        exit 0
    } else {
        Write-Host "`n⚠️  $failed test suite(s) failed. Please review the output above." -ForegroundColor Yellow
        exit 1
    }
}

# Run the main function
Main
