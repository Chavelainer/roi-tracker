# Setup Turso Database untuk Production
# Jalankan script ini untuk setup database Turso

Write-Host "`n🗄️  Setup Turso Database`n" -ForegroundColor Cyan

# Check if Turso CLI is installed
$tursoInstalled = Get-Command turso -ErrorAction SilentlyContinue

if (-not $tursoInstalled) {
    Write-Host "❌ Turso CLI tidak ditemukan!" -ForegroundColor Red
    Write-Host "`nInstall Turso CLI:" -ForegroundColor Yellow
    Write-Host "1. Download dari: https://github.com/tursodatabase/turso-cli/releases" -ForegroundColor White
    Write-Host "2. Atau gunakan Scoop: scoop install turso`n" -ForegroundColor White
    exit 1
}

Write-Host "✅ Turso CLI ditemukan`n" -ForegroundColor Green

# Step 1: Login (if needed)
Write-Host "📝 Step 1: Login ke Turso" -ForegroundColor Yellow
Write-Host "Jalankan: turso auth login`n" -ForegroundColor White

# Step 2: Create database
Write-Host "📝 Step 2: Buat database" -ForegroundColor Yellow
Write-Host "Jalankan: turso db create roi-tracker`n" -ForegroundColor White

# Step 3: Get database URL
Write-Host "📝 Step 3: Dapatkan database URL" -ForegroundColor Yellow
Write-Host "Jalankan: turso db show roi-tracker`n" -ForegroundColor White
Write-Host "Copy URL yang muncul (format: roi-tracker-username.turso.io)`n" -ForegroundColor Gray

# Step 4: Create auth token
Write-Host "📝 Step 4: Buat auth token" -ForegroundColor Yellow
Write-Host "Jalankan: turso db tokens create roi-tracker`n" -ForegroundColor White
Write-Host "Copy token yang muncul`n" -ForegroundColor Gray

# Step 5: Format DATABASE_URL
Write-Host "📝 Step 5: Format DATABASE_URL" -ForegroundColor Yellow
Write-Host "Format: libsql://[url]?authToken=[token]`n" -ForegroundColor Cyan
Write-Host "Contoh:" -ForegroundColor White
Write-Host "libsql://roi-tracker-chavelainer.turso.io?authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`n" -ForegroundColor Gray

# Step 6: Set di Vercel
Write-Host "📝 Step 6: Set DATABASE_URL di Vercel" -ForegroundColor Yellow
Write-Host "Jalankan:" -ForegroundColor White
Write-Host "npx vercel env add DATABASE_URL production" -ForegroundColor Cyan
Write-Host "Paste DATABASE_URL yang sudah di-format`n" -ForegroundColor Gray

# Step 7: Push schema
Write-Host "📝 Step 7: Push schema ke database" -ForegroundColor Yellow
Write-Host "Set DATABASE_URL di local dulu:" -ForegroundColor White
Write-Host '`$env:DATABASE_URL="libsql://[url]?authToken=[token]"' -ForegroundColor Cyan
Write-Host "npx prisma db push`n" -ForegroundColor Cyan

Write-Host "✅ Setelah semua langkah selesai, redeploy aplikasi!" -ForegroundColor Green
Write-Host "npx vercel --prod`n" -ForegroundColor Yellow

