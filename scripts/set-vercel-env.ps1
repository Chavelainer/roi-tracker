# Script untuk set environment variables di Vercel
Write-Host "Setting Environment Variables di Vercel...`n" -ForegroundColor Cyan

# Set WHOP_API_KEY untuk semua environments
$whopApiKey = "8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k"
Write-Host "Setting WHOP_API_KEY..." -ForegroundColor Yellow
echo $whopApiKey | npx vercel env add WHOP_API_KEY development

# Set NEXT_PUBLIC_WHOP_APP_ID
$appId = "app_QsNqPoaQ3i1PBH"
Write-Host "Setting NEXT_PUBLIC_WHOP_APP_ID..." -ForegroundColor Yellow
echo $appId | npx vercel env add NEXT_PUBLIC_WHOP_APP_ID production
echo $appId | npx vercel env add NEXT_PUBLIC_WHOP_APP_ID preview
echo $appId | npx vercel env add NEXT_PUBLIC_WHOP_APP_ID development

# Set NEXT_PUBLIC_WHOP_AGENT_USER_ID
$agentUserId = "user_jixSk8v0rzS3M"
Write-Host "Setting NEXT_PUBLIC_WHOP_AGENT_USER_ID..." -ForegroundColor Yellow
echo $agentUserId | npx vercel env add NEXT_PUBLIC_WHOP_AGENT_USER_ID production
echo $agentUserId | npx vercel env add NEXT_PUBLIC_WHOP_AGENT_USER_ID preview
echo $agentUserId | npx vercel env add NEXT_PUBLIC_WHOP_AGENT_USER_ID development

# Set NEXT_PUBLIC_WHOP_COMPANY_ID
$companyId = "biz_dMR0pdzvbfxmoG"
Write-Host "Setting NEXT_PUBLIC_WHOP_COMPANY_ID..." -ForegroundColor Yellow
echo $companyId | npx vercel env add NEXT_PUBLIC_WHOP_COMPANY_ID production
echo $companyId | npx vercel env add NEXT_PUBLIC_WHOP_COMPANY_ID preview
echo $companyId | npx vercel env add NEXT_PUBLIC_WHOP_COMPANY_ID development

# Set NODE_ENV
Write-Host "Setting NODE_ENV..." -ForegroundColor Yellow
echo "production" | npx vercel env add NODE_ENV production
echo "production" | npx vercel env add NODE_ENV preview
echo "production" | npx vercel env add NODE_ENV development

Write-Host "`n✅ Environment Variables sudah di-set!`n" -ForegroundColor Green
Write-Host "Catatan: DATABASE_URL akan di-setup setelah database dibuat.`n" -ForegroundColor Yellow

