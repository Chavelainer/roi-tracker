# Script untuk push schema ke Turso
# Note: Prisma dengan sqlite provider bisa connect ke Turso via libsql URL

$tursoUrl = "libsql://database-orange-jacket-vercel-icfg-6s9ab4j7ezichcp0fszz74qa.aws-us-east-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjIyMjYzMjgsImlkIjoiMDE0MWE0OTktNGIxMi00ZmMzLWExZmYtOTE0MTRmMmY5NDI4IiwicmlkIjoiMTRkYjYxNTAtZmVkZi00NTI1LWEzOWItMTc3ZmI3MDM0YjQyIn0.3BkKIhLk3ZMWiecS0oVCUjnHvWAmAE8JBaWtbKrMwSmLqNhEpEXcuvoPaBA95SnrUnW1cbhvGuIni8xKjq-bCw"

Write-Host "🚀 Pushing schema ke Turso database...`n" -ForegroundColor Cyan

# Set environment variable
$env:DATABASE_URL = $tursoUrl

# Generate Prisma Client first
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

# Try db push (might work despite validation warning)
Write-Host "`nPushing schema to database..." -ForegroundColor Yellow
npx prisma db push --accept-data-loss

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Schema berhasil di-push ke Turso!`n" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Push gagal. Schema mungkin sudah di-push sebelumnya." -ForegroundColor Yellow
    Write-Host "Atau bisa push via Vercel deployment.`n" -ForegroundColor Yellow
}

