# Restart PowerShell script
Write-Host "Restarting PowerShell to refresh environment variables..." -ForegroundColor Green
Start-Process powershell.exe -WorkingDirectory (Get-Location).Path
exit 