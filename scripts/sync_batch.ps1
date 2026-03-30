$Owner = "vinnciltda-debug"
$Repo = "Hub-Senegal"
$Token = "$Token"
$Branch = "main"
$CommitMessage = "Sincronização Automática em Lote (Fast Sync)"
$Root = "c:\Users\Vinnci.Cs\Music\Site holograma"

# Pode adicionar qualquer outro arquivo aqui e ele irá subir no mesmo commit!
$files = @(
    "css\mobile-v2.css", 
    "css\site.css", 
    "index.html", 
    "js\app.js", 
    "admin.html", 
    "js\firebase-sync.js", 
    "js\admin.js"
)

$headers = @{
    "Authorization" = "token $Token"
    "Accept"        = "application/vnd.github.v3+json"
}

Write-Host "Conectando ao GitHub Branch '$Branch'..." -ForegroundColor Cyan

# 1. Pega o SHA do commit atual da branch
$refResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/git/refs/heads/$Branch" -Headers $headers -Method Get -ErrorAction Stop
$latestCommitSha = $refResponse.object.sha

# 2. Pega o SHA da árvore (tree) base desse commit
$commitResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/git/commits/$latestCommitSha" -Headers $headers -Method Get -ErrorAction Stop
$baseTreeSha = $commitResponse.tree.sha

# 3. Extrai cada arquivo, encoda em Base64 e cria os Blobs na nuvem
$treeData = @()
foreach ($f in $files) {
    Write-Host "  > Preparando: $f"
    $localPath = Join-Path $Root $f
    if (-not (Test-Path $localPath)) { 
        Write-Host "    [Aviso] Arquivo não encontrado: $localPath" -ForegroundColor Yellow
        continue 
    }
    
    $repoPath = $f -replace '\\', '/'
    
    $bytes = [System.IO.File]::ReadAllBytes($localPath)
    $base64 = [System.Convert]::ToBase64String($bytes)
    
    $blobBody = @{
        content = $base64
        encoding = "base64"
    } | ConvertTo-Json -Compress
    
    $blobResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/git/blobs" -Method Post -Headers $headers -Body $blobBody -ErrorAction Stop
    $blobSha = $blobResponse.sha
    
    $treeData += @{
        path = $repoPath
        mode = "100644"
        type = "blob"
        sha = $blobSha
    }
}

if ($treeData.Count -eq 0) {
    Write-Host "Nenhum arquivo válido para subir." -ForegroundColor Red
    exit
}

# 4. Cria a nova árvore consolidada
Write-Host "`nFechando pacote de arquivos..." -ForegroundColor Cyan
$treeBody = @{
    base_tree = $baseTreeSha
    tree = $treeData
} | ConvertTo-Json -Depth 5 -Compress
$newTreeResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/git/trees" -Method Post -Headers $headers -Body $treeBody -ErrorAction Stop
$newTreeSha = $newTreeResponse.sha

# 5. Cria o Commit (salvamento unificado)
Write-Host "Criando o commit único..." -ForegroundColor Cyan
$newCommitBody = @{
    message = $CommitMessage
    tree = $newTreeSha
    parents = @($latestCommitSha)
} | ConvertTo-Json -Depth 5 -Compress
$newCommitResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/git/commits" -Method Post -Headers $headers -Body $newCommitBody -ErrorAction Stop
$newCommitSha = $newCommitResponse.sha

# 6. Atualiza a referência (Branch Point) para publicar o Commit
Write-Host "Publicando no destino em definitivo..." -ForegroundColor Cyan
$refBody = @{
    sha = $newCommitSha
    force = $false
} | ConvertTo-Json -Compress
$null = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$Repo/git/refs/heads/$Branch" -Method Patch -Headers $headers -Body $refBody -ErrorAction Stop

Write-Host "==================================" -ForegroundColor Green
Write-Host "🚀 SUCESSO! Todos os arquivos subiram juntos em 1 único commit!" -ForegroundColor Green
Write-Host "Sem filas no GitHub Actions. Em instante estará no ar." -ForegroundColor Green
