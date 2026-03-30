$Owner = "vinnciltda-debug"
$Repo = "Hub-Senegal"
$Token = "$Token"
$Root = "c:\Users\Vinnci.Cs\Music\Site holograma"
$files = @("css\mobile-v2.css", "css\site.css", "index.html", "js\app.js", "admin.html", "js\firebase-sync.js", "js\admin.js")

$headers = @{
    "Authorization" = "token $Token"
    "Accept"        = "application/vnd.github.v3+json"
}

foreach ($f in $files) {
    Write-Host "Syncing $f..."
    $localPath = Join-Path $Root $f
    $repoPath = $f -replace '\\', '/'
    $bytes = [System.IO.File]::ReadAllBytes($localPath)
    $content = [System.Convert]::ToBase64String($bytes)
    
    $sha = $null
    try {
        $get = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/contents/$repoPath" -Headers $headers -Method Get -ErrorAction SilentlyContinue
        $sha = $get.sha
    } catch {}

    $body = @{
        message = "Align mobile dots and UI fixes"
        content = $content
    }
    if ($sha) { $body.sha = $sha }

    try {
        $jsonBody = $body | ConvertTo-Json -Depth 10 -Compress
        Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/contents/$repoPath" -Method Put -Headers $headers -Body $jsonBody
        Write-Host "Done: $repoPath"
    } catch {
        Write-Error "Failed to upload $repoPath | Error: $_"
    }
}
