# Deployment Helper Script for Whop ROI Tracker
# PowerShell script untuk membantu deployment

Write-Host "🚀 Whop ROI Tracker - Deployment Helper" -ForegroundColor Cyan
Write-Host ""

# Check Git status
Write-Host "📋 Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --short
if ($gitStatus) {
    Write-Host "⚠️  Ada perubahan yang belum di-commit!" -ForegroundColor Red
    Write-Host $gitStatus
    $continue = Read-Host "Lanjutkan anyway? (y/n)"
    if ($continue -ne "y") { exit }
}

# Check remote
Write-Host "`n🔗 Checking Git remote..." -ForegroundColor Yellow
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "✅ Remote found: $remote" -ForegroundColor Green
    Write-Host "`n📤 Push ke GitHub?" -ForegroundColor Yellow
    $push = Read-Host "Push code ke GitHub sekarang? (y/n)"
    if ($push -eq "y") {
        git push -u origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Code berhasil di-push!" -ForegroundColor Green
        } else {
            Write-Host "❌ Push gagal. Pastikan remote sudah benar." -ForegroundColor Red
        }
    }
} else {
    Write-Host "⚠️  Belum ada remote repository!" -ForegroundColor Yellow
    Write-Host "`nUntuk setup GitHub remote:" -ForegroundColor Cyan
    Write-Host "1. Buat repository baru di GitHub"
    Write-Host "2. Jalankan: git remote add origin https://github.com/USERNAME/roi-tracker.git"
    Write-Host "3. Jalankan: git push -u origin main"
}

# Environment Variables
Write-Host "`n🔑 Environment Variables untuk Vercel:" -ForegroundColor Yellow
Write-Host ""
Write-Host "DATABASE_URL=libsql://[your-turso-url]?authToken=[token]" -ForegroundColor White
Write-Host "WHOP_API_KEY=8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k" -ForegroundColor White
Write-Host "NEXT_PUBLIC_WHOP_APP_ID=app_QsNqPoaQ3i1PBH" -ForegroundColor White
Write-Host "NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_jixSk8v0rzS3M" -ForegroundColor White
Write-Host "NEXT_PUBLIC_WHOP_COMPANY_ID=biz_dMR0pdzvbfxmoG" -ForegroundColor White
Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host ""

# Next steps
Write-Host "📝 Langkah Selanjutnya:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. ✅ Code sudah siap (jika sudah push)" -ForegroundColor Green
Write-Host "2. ⏳ Setup database (Turso atau Vercel Postgres)" -ForegroundColor Yellow
Write-Host "3. ⏳ Deploy ke Vercel:" -ForegroundColor Yellow
Write-Host "   - Login vercel.com"
Write-Host "   - Import repository"
Write-Host "   - Set environment variables (lihat di atas)"
Write-Host "   - Deploy"
Write-Host "4. ⏳ Update Whop Dashboard:" -ForegroundColor Yellow
Write-Host "   - Set Production URL dari Vercel"
Write-Host "   - App ID: app_QsNqPoaQ3i1PBH"
Write-Host ""
Write-Host "📚 Dokumentasi lengkap:" -ForegroundColor Cyan
Write-Host "   - README_DEPLOY.md (Quick start)"
Write-Host "   - DEPLOYMENT_CHECKLIST.md (Checklist)"
Write-Host ""
Write-Host "🎉 Good luck!" -ForegroundColor Green

