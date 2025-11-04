# Quick Deploy Helper - Whop ROI Tracker
Write-Host "`n🚀 Whop ROI Tracker - Quick Deploy Helper`n" -ForegroundColor Cyan

# Check Git
$hasRemote = git remote get-url origin 2>$null
if ($hasRemote) {
    Write-Host "✅ Git remote: $hasRemote" -ForegroundColor Green
} else {
    Write-Host "⚠️  Belum ada Git remote. Setup GitHub terlebih dahulu!" -ForegroundColor Yellow
}

Write-Host "`n📋 Environment Variables untuk Vercel:`n" -ForegroundColor Yellow
Write-Host "DATABASE_URL=[setup database dulu]"
Write-Host "WHOP_API_KEY=8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k"
Write-Host "NEXT_PUBLIC_WHOP_APP_ID=app_QsNqPoaQ3i1PBH"
Write-Host "NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_jixSk8v0rzS3M"
Write-Host "NEXT_PUBLIC_WHOP_COMPANY_ID=biz_dMR0pdzvbfxmoG"
Write-Host "NODE_ENV=production"
Write-Host "`n📚 Baca README_DEPLOY.md untuk langkah lengkap!`n" -ForegroundColor Cyan

