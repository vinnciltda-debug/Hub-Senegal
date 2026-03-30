$Owner = "vinnciltda-debug"
$Repo = "Hub-Senegal"
$Token = "$Token"
$Root = "c:\Users\Vinnci.Cs\Music\Site holograma"

$headers = @{
    "Authorization" = "token $Token"
    "Accept"        = "application/vnd.github.v3+json"
}

function Upload-File($localPath, $repoPath) {
    Write-Host "Uploading $repoPath ..."
    $bytes = [System.IO.File]::ReadAllBytes($localPath)
    $content = [System.Convert]::ToBase64String($bytes)
    
    # Check if file exists to get SHA
    $sha = $null
    try {
        $get = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/contents/$repoPath" -Headers $headers -Method Get -ErrorAction SilentlyContinue
        $sha = $get.sha
    } catch {}

    $body = @{
        message = "Sync $repoPath"
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

$files = Get-ChildItem -Path $Root -Recurse -File | Where-Object { 
    $_.FullName -notmatch "\.git" -and 
    $_.Name -ne "server.ps1" -and 
    $_.Name -ne "sync_github.ps1" -and
    $_.Extension -match "\.(html|css|js|png|jpg|svg|pdf|webp|json|md)$"
}

foreach ($f in $files) {
    $rel = $f.FullName.Substring($Root.Length + 1).Replace("\", "/")
    Upload-File $f.FullName $rel
}
