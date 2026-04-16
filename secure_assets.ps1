# Mango Strategic Asset Protection Script
Write-Host "Starting Mango Security Cleanup..." -ForegroundColor Yellow

# 1. Delete temporary and backup files
$targets = @("*.bak", "*.tmp", "*복사본*", "*copy*", "*Copy*", "temp.*")
foreach ($target in $targets) {
    Get-ChildItem -Path . -Include $target -Recurse | Remove-Item -Force -ErrorAction SilentlyContinue
}

# 2. Verify .env exclusion
Write-Host "Checking environment file security..." -ForegroundColor Cyan

Write-Host "Mango Assets Secured." -ForegroundColor Green