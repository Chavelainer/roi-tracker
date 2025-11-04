# Script untuk membuat GitHub repository dan push code
Write-Host "`n🚀 Setup GitHub Repository`n" -ForegroundColor Cyan

# Check if remote exists
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "✅ Remote sudah ada: $remote" -ForegroundColor Green
    Write-Host "`n📤 Push ke GitHub sekarang? (y/n)" -ForegroundColor Yellow
    $push = Read-Host
    if ($push -eq "y") {
        git branch -M main
        git push -u origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Code berhasil di-push ke GitHub!`n" -ForegroundColor Green
        }
    }
    exit
}

# Get GitHub username
Write-Host "📝 Masukkan informasi GitHub:" -ForegroundColor Yellow
$username = Read-Host "GitHub Username"
$repoName = Read-Host "Repository Name (default: roi-tracker)"

if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "roi-tracker"
}

Write-Host "`n🔗 Menambahkan remote..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$username/$repoName.git"
git remote add origin $remoteUrl

Write-Host "✅ Remote ditambahkan: $remoteUrl" -ForegroundColor Green

Write-Host "`n⚠️  IMPORTANT: Buat repository di GitHub terlebih dahulu!" -ForegroundColor Yellow
Write-Host "1. Buka: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: $repoName" -ForegroundColor White
Write-Host "3. Jangan centang 'Initialize with README'" -ForegroundColor White
Write-Host "4. Klik 'Create repository'`n" -ForegroundColor White

Write-Host "Setelah repository dibuat, tekan Enter untuk push..." -ForegroundColor Cyan
Read-Host

Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Berhasil! Repository: https://github.com/$username/$repoName" -ForegroundColor Green
    Write-Host "`n🚀 Langkah selanjutnya: Deploy ke Vercel!" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push gagal. Pastikan:" -ForegroundColor Red
    Write-Host "- Repository sudah dibuat di GitHub" -ForegroundColor White
    Write-Host "- Anda sudah login di GitHub" -ForegroundColor White
    Write-Host "- Remote URL sudah benar`n" -ForegroundColor White
}

