$Owner = "vinnciltda-debug"
$Repo = "Hub-Senegal"
$Token = "$Token"

$headers = @{
    "Authorization" = "token $Token"
    "Accept"        = "application/vnd.github.v3+json"
}

# Pegar detalhes do repo
$repoInfo = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo" -Headers $headers -Method Get
$branch = $repoInfo.default_branch

Write-Host "Default branch: $branch"
Write-Host "Has pages: $($repoInfo.has_pages)"

# Ativar o GitHub Pages
if (-not $repoInfo.has_pages) {
    Write-Host "Enabling GitHub Pages on branch $branch..."
    $body = @{
        source = @{
            branch = $branch
            path = "/"
        }
    } | ConvertTo-Json

    try {
        Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/pages" -Headers $headers -Method Post -Body $body
        Write-Host "GitHub Pages successfully enabled!"
        Write-Host "Site will be live at: https://$Owner.github.io/$Repo/"
    } catch {
        Write-Error "Failed to enable GitHub Pages: $_"
    }
} else {
    Write-Host "GitHub pages is already enabled."
    Write-Host "Site is live at: https://$Owner.github.io/$Repo/"
}
