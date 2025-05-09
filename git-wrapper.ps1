# Git wrapper script
function Git-Command {
    param(
        [Parameter(ValueFromRemainingArguments=$true)]
        $arguments
    )
    
    & "C:\Program Files\Git\cmd\git.exe" $arguments
}

# Create an alias for git
Set-Alias -Name git -Value Git-Command -Scope Global

Write-Host "Git wrapper is now active. You can use 'git' commands in this session." -ForegroundColor Green
Write-Host "Try running 'git --version' to test it." -ForegroundColor Yellow 