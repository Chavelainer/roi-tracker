# 🚀 Quick Deploy Guide - Whop ROI Tracker

## Status Aplikasi

✅ **App sudah dibuat di Whop:**
- **App ID**: `app_QsNqPoaQ3i1PBH`
- **Installation Link**: https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/
- **Company ID**: `biz_dMR0pdzvbfxmoG`

## Langkah Deploy (Total: ~10 menit)

### 1️⃣ Push ke GitHub (2 menit)

```bash
# Jika belum ada remote
git remote add origin https://github.com/YOUR_USERNAME/roi-tracker.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy ke Vercel (5 menit)

1. Buka [vercel.com](https://vercel.com) → Login dengan GitHub
2. **Add New Project** → Import repository `roi-tracker`
3. **Settings → Environment Variables** → Tambahkan:

```
DATABASE_URL=libsql://[your-turso-url]?authToken=[token]
WHOP_API_KEY=8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k
NEXT_PUBLIC_WHOP_APP_ID=app_QsNqPoaQ3i1PBH
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_jixSk8v0rzS3M
NEXT_PUBLIC_WHOP_COMPANY_ID=biz_dMR0pdzvbfxmoG
NODE_ENV=production
```

4. **Pilih Environment**: ✅ Production ✅ Preview ✅ Development
5. **Deploy** → Tunggu build selesai
6. **Copy Production URL** (misalnya: `https://roi-tracker.vercel.app`)

### 3️⃣ Setup Database - Pilih Salah Satu

#### Opsi A: Vercel Postgres (Termudah) ⭐

1. Vercel Dashboard → **Storage** → **Create Database** → **Postgres**
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Push ke GitHub → Vercel akan auto-redeploy
4. Di Vercel → **Deployments** → **Functions** → Run:
   ```bash
   npx prisma migrate deploy
   ```

#### Opsi B: Turso (SQLite Cloud)

Lihat [TURSO_SETUP.md](./TURSO_SETUP.md) untuk detail.

### 4️⃣ Update Whop Dashboard (1 menit)

1. Login ke [Whop Dashboard](https://whop.com)
2. **Developer** → **Apps** → **app_QsNqPoaQ3i1PBH**
3. **Production URL**: Paste URL dari Vercel
4. **Webhook URL**: `https://your-app.vercel.app/api/webhooks/whop`
5. **Save**

### 5️⃣ Test! ✅

Buka: https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/

## 📋 Checklist

- [ ] Code sudah di-push ke GitHub
- [ ] Vercel project sudah dibuat
- [ ] Semua environment variables sudah di-set
- [ ] Database sudah di-setup (Postgres/Turso)
- [ ] Build di Vercel berhasil
- [ ] Production URL sudah di-set di Whop
- [ ] Aplikasi bisa diakses di Whop

## 🔑 Credentials

**JANGAN COMMIT KE GIT!** Semua credentials sudah ada di:
- `WHOP_CREDENTIALS.md` (local only, tidak di-commit)
- Set di Vercel Environment Variables

## 📚 Dokumentasi Lengkap

- [DEPLOY_NOW.md](./DEPLOY_NOW.md) - Panduan detail
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Panduan lengkap
- [TURSO_SETUP.md](./TURSO_SETUP.md) - Setup Turso

## 🆘 Troubleshooting

**Build Error?**
- Check semua environment variables sudah di-set
- Pastikan DATABASE_URL format benar

**Database Error?**
- Pastikan migration sudah di-run: `npx prisma migrate deploy`
- Check DATABASE_URL di Vercel logs

**App tidak muncul di Whop?**
- Pastikan Production URL sudah di-set di Whop Dashboard
- Check Vercel deployment status

## 🎉 Selesai!

Setelah semua langkah, aplikasi akan live di:
**https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/**

