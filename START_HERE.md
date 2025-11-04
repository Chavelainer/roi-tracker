# 🚀 START HERE - Deploy Whop ROI Tracker

## Status: Siap untuk Deploy! ✅

Semua persiapan sudah selesai. Ikuti langkah-langkah berikut:

## ⚡ Quick Deploy (15 menit)

### Langkah 1: Setup GitHub (2 menit)

```bash
# 1. Buat repository baru di GitHub (github.com)
#    Nama: roi-tracker (atau nama lain)

# 2. Jalankan command ini (ganti YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/roi-tracker.git
git branch -M main
git push -u origin main
```

### Langkah 2: Setup Database - Pilih Salah Satu

#### 🟢 Opsi A: Vercel Postgres (TERMUDAH - Recommended)

1. **Setelah deploy ke Vercel** (langkah 3)
2. Di Vercel Dashboard → **Storage** → **Create Database** → **Postgres**
3. Copy DATABASE_URL yang diberikan
4. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Push ke GitHub → Vercel akan auto-redeploy
6. Di Vercel → **Deployments** → **Functions** → Run:
   ```bash
   npx prisma migrate deploy
   ```

#### 🟡 Opsi B: Turso (SQLite Cloud)

Lihat `TURSO_SETUP.md` untuk detail lengkap.

**Quick Turso:**
```bash
# Install Turso CLI (download dari GitHub releases)
turso auth login
turso db create roi-tracker
turso db show roi-tracker  # Copy URL
turso db tokens create roi-tracker  # Copy token
# Format: libsql://[url]?authToken=[token]
```

### Langkah 3: Deploy ke Vercel (5 menit)

1. **Buka**: https://vercel.com
2. **Login** dengan GitHub
3. **Add New Project** → Import repository `roi-tracker`
4. **Settings → Environment Variables** → Tambahkan:

```
DATABASE_URL=[dari langkah 2 - setup dulu atau skip dulu]
WHOP_API_KEY=8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k
NEXT_PUBLIC_WHOP_APP_ID=app_QsNqPoaQ3i1PBH
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_jixSk8v0rzS3M
NEXT_PUBLIC_WHOP_COMPANY_ID=biz_dMR0pdzvbfxmoG
NODE_ENV=production
```

5. **Pilih Environment**: ✅ Production ✅ Preview ✅ Development
6. **Deploy** → Tunggu build selesai
7. **Copy Production URL** (misalnya: `https://roi-tracker.vercel.app`)

**Note**: Jika DATABASE_URL belum ada, bisa skip dulu dan set nanti setelah setup database.

### Langkah 4: Setup Database (jika belum)

**Jika pakai Vercel Postgres:**
- Setelah deploy pertama, buat database di Vercel
- Update schema.prisma → Push → Auto-redeploy
- Run migration

**Jika pakai Turso:**
- Setup Turso (lihat TURSO_SETUP.md)
- Update DATABASE_URL di Vercel
- Redeploy

### Langkah 5: Update Whop Dashboard (1 menit)

1. **Login**: https://whop.com
2. **Developer** → **Apps** → **app_QsNqPoaQ3i1PBH**
3. **Production URL**: Paste URL dari Vercel
   - Contoh: `https://roi-tracker.vercel.app`
4. **Webhook URL** (opsional): `https://your-app.vercel.app/api/webhooks/whop`
5. **Save**

### Langkah 6: Test! ✅

Buka: **https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/**

Test semua fitur:
- ✅ Dashboard
- ✅ UTM Builder
- ✅ Add Costs
- ✅ Campaigns

## 📋 Checklist

- [ ] Code di-push ke GitHub
- [ ] Vercel project dibuat
- [ ] Environment variables di-set
- [ ] Database di-setup (Postgres/Turso)
- [ ] Build di Vercel berhasil
- [ ] Production URL di-set di Whop
- [ ] Aplikasi bisa diakses

## 🔑 Quick Reference

**Whop App Info:**
- App ID: `app_QsNqPoaQ3i1PBH`
- Installation: https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/
- Company ID: `biz_dMR0pdzvbfxmoG`

**Environment Variables:**
```
DATABASE_URL=[database-url]
WHOP_API_KEY=8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k
NEXT_PUBLIC_WHOP_APP_ID=app_QsNqPoaQ3i1PBH
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_jixSk8v0rzS3M
NEXT_PUBLIC_WHOP_COMPANY_ID=biz_dMR0pdzvbfxmoG
NODE_ENV=production
```

## 📚 Dokumentasi

- **Quick Start**: `README_DEPLOY.md`
- **Checklist**: `DEPLOYMENT_CHECKLIST.md`
- **Detail**: `DEPLOYMENT.md`
- **Turso**: `TURSO_SETUP.md`

## 🆘 Troubleshooting

**Build Error?**
- Pastikan semua env vars sudah di-set di Vercel
- Check DATABASE_URL format

**Database Error?**
- Pastikan migration sudah di-run
- Check connection string

**App tidak muncul?**
- Pastikan Production URL sudah di-set di Whop
- Check Vercel deployment status

## 🎉 Selesai!

Setelah semua langkah, aplikasi akan live di Whop!

