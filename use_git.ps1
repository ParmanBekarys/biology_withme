# Use Git with full path
$gitCmd = "C:\Program Files\Git\cmd\git.exe"

Write-Host "To use Git, run your Git commands like this:" -ForegroundColor Green
Write-Host '& $gitCmd your-command' -ForegroundColor Yellow
Write-Host ""
Write-Host "For example:" -ForegroundColor Green
Write-Host '& $gitCmd status' -ForegroundColor Yellow
Write-Host '& $gitCmd add .' -ForegroundColor Yellow
Write-Host '& $gitCmd commit -m "Your message"' -ForegroundColor Yellow
Write-Host ""
Write-Host "You can also create an alias for easier use:" -ForegroundColor Green
Write-Host 'function Git { & $gitCmd $args }' -ForegroundColor Yellow
Write-Host "Then use it like: Git status" -ForegroundColor Yellow 