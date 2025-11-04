# ✅ Deployment Checklist - Whop ROI Tracker

## Status Saat Ini

### ✅ Selesai (Local)
- [x] Code sudah lengkap dan berfungsi
- [x] Build berhasil tanpa error
- [x] Schema Prisma siap untuk production
- [x] Dependencies sudah diinstall
- [x] Git repository sudah di-init dan commit
- [x] Dokumentasi deployment sudah dibuat
- [x] Whop credentials sudah didokumentasikan

### ⏳ Langkah Selanjutnya (Anda perlu lakukan)

#### 1. Push ke GitHub
```bash
# Buat repository baru di GitHub terlebih dahulu
# Lalu:
git remote add origin https://github.com/YOUR_USERNAME/roi-tracker.git
git branch -M main
git push -u origin main
```

#### 2. Setup Database (Pilih salah satu)

**Opsi A: Vercel Postgres (Recommended untuk pemula)**
- [ ] Login ke Vercel
- [ ] Storage → Create Database → Postgres
- [ ] Copy DATABASE_URL
- [ ] Update `prisma/schema.prisma`:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```
- [ ] Push ke GitHub
- [ ] Di Vercel → Deployments → Run migration

**Opsi B: Turso (SQLite Cloud)**
- [ ] Install Turso CLI
- [ ] `turso auth login`
- [ ] `turso db create roi-tracker`
- [ ] Copy URL dan token
- [ ] Format: `libsql://[url]?authToken=[token]`

#### 3. Deploy ke Vercel
- [ ] Login ke vercel.com dengan GitHub
- [ ] Import repository `roi-tracker`
- [ ] Set Environment Variables:
  ```
  DATABASE_URL=[dari langkah 2]
  WHOP_API_KEY=8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k
  NEXT_PUBLIC_WHOP_APP_ID=app_QsNqPoaQ3i1PBH
  NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_jixSk8v0rzS3M
  NEXT_PUBLIC_WHOP_COMPANY_ID=biz_dMR0pdzvbfxmoG
  NODE_ENV=production
  ```
- [ ] Set untuk semua environments (Production, Preview, Development)
- [ ] Deploy
- [ ] Tunggu build selesai
- [ ] Copy Production URL

#### 4. Update Whop Dashboard
- [ ] Login ke whop.com
- [ ] Developer → Apps → app_QsNqPoaQ3i1PBH
- [ ] Set Production URL (dari Vercel)
- [ ] Set Webhook URL (opsional): `https://your-app.vercel.app/api/webhooks/whop`
- [ ] Save

#### 5. Test Aplikasi
- [ ] Buka: https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/
- [ ] Test Dashboard
- [ ] Test UTM Builder
- [ ] Test Add Costs
- [ ] Test Campaigns

## 📋 Quick Commands

### Setup Database Migration (Setelah deploy)
```bash
# Di Vercel Dashboard → Deployments → Functions
# Atau via Vercel CLI:
vercel env pull .env.production
npx prisma migrate deploy
```

### Local Testing dengan Production DB
```bash
# Set DATABASE_URL di .env.local
DATABASE_URL=libsql://your-url?authToken=your-token
npm run dev
```

## 🔑 Environment Variables Reference

**Wajib di Vercel:**
```
DATABASE_URL=[database-connection-string]
WHOP_API_KEY=8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k
NEXT_PUBLIC_WHOP_APP_ID=app_QsNqPoaQ3i1PBH
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_jixSk8v0rzS3M
NEXT_PUBLIC_WHOP_COMPANY_ID=biz_dMR0pdzvbfxmoG
NODE_ENV=production
```

## 📚 Dokumentasi

- **Quick Start**: [README_DEPLOY.md](./README_DEPLOY.md)
- **Detail Guide**: [DEPLOY_NOW.md](./DEPLOY_NOW.md)
- **Full Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Turso Setup**: [TURSO_SETUP.md](./TURSO_SETUP.md)
- **Credentials**: `WHOP_CREDENTIALS.md` (local only)

## 🎯 App Info

- **App ID**: `app_QsNqPoaQ3i1PBH`
- **Installation**: https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/
- **Company ID**: `biz_dMR0pdzvbfxmoG`

## ⚠️ Important Notes

1. **Jangan commit** `WHOP_CREDENTIALS.md` ke Git
2. **Set semua env vars** untuk Production, Preview, dan Development
3. **Database migration** harus di-run setelah deploy pertama
4. **Test webhook** setelah Production URL di-set

## 🆘 Troubleshooting

**Build Fails?**
- Check semua env vars sudah di-set
- Pastikan DATABASE_URL format benar
- Check Vercel build logs

**Database Error?**
- Pastikan migration sudah di-run
- Check DATABASE_URL di Vercel
- Verify database connection

**App Not Loading?**
- Pastikan Production URL sudah di-set di Whop
- Check Vercel deployment status
- Verify environment variables

## 🎉 Setelah Semua Selesai

Aplikasi akan live di:
**https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/**

Good luck! 🚀

