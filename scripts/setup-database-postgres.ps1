# Setup Vercel Postgres Database (Lebih Mudah)
# Alternatif yang lebih mudah dari Turso

Write-Host "`n🗄️  Setup Vercel Postgres Database`n" -ForegroundColor Cyan

Write-Host "📋 Langkah-langkah:`n" -ForegroundColor Yellow

Write-Host "1️⃣  Buat Database di Vercel" -ForegroundColor Yellow
Write-Host "   Buka: https://vercel.com/chavelainers-projects/roi-tracker/storage" -ForegroundColor Cyan
Write-Host "   Klik: Create Database → Postgres" -ForegroundColor White
Write-Host "   Pilih plan (Free tier cukup)" -ForegroundColor White
Write-Host "   Copy DATABASE_URL yang muncul`n" -ForegroundColor White

Write-Host "2️⃣  Update Schema Prisma" -ForegroundColor Yellow
Write-Host "   Edit prisma/schema.prisma:" -ForegroundColor White
Write-Host "   provider = `"postgresql`"  (ubah dari sqlite)`n" -ForegroundColor Cyan

Write-Host "3️⃣  Set DATABASE_URL di Vercel" -ForegroundColor Yellow
Write-Host "   Settings → Environment Variables" -ForegroundColor White
Write-Host "   Update DATABASE_URL dengan URL dari Postgres" -ForegroundColor White
Write-Host "   Set untuk Production, Preview, Development`n" -ForegroundColor White

Write-Host "4️⃣  Commit dan Push" -ForegroundColor Yellow
Write-Host "   git add prisma/schema.prisma" -ForegroundColor Cyan
Write-Host "   git commit -m `"Switch to postgresql`"" -ForegroundColor Cyan
Write-Host "   git push`n" -ForegroundColor Cyan

Write-Host "5️⃣  Run Migration" -ForegroundColor Yellow
Write-Host "   Set DATABASE_URL di local:" -ForegroundColor White
Write-Host "   `$env:DATABASE_URL=`"postgresql://...`"" -ForegroundColor Cyan
Write-Host "   npx prisma migrate deploy`n" -ForegroundColor Cyan

Write-Host "✅ Vercel akan auto-redeploy setelah push!" -ForegroundColor Green
Write-Host "✅ Postgres lebih mudah dan reliable untuk production!`n" -ForegroundColor Green

