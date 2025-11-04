# 🚀 Deploy Sekarang - Langkah Terakhir

## ✅ Yang Sudah Selesai
- ✅ Schema Prisma sudah diupdate (sqlite untuk Turso)
- ✅ Dependencies sudah diinstall (@libsql/client)
- ✅ Build berhasil tanpa error
- ✅ Git repository sudah di-init
- ✅ Semua file sudah di-commit

## 📋 Langkah Selanjutnya

### 1. Push ke GitHub (2 menit)

```bash
# Buat repository baru di GitHub (github.com)
# Lalu:

git remote add origin https://github.com/YOUR_USERNAME/roi-tracker.git
git branch -M main
git push -u origin main
```

### 2. Setup Turso Database (5 menit)

**Opsi A: Install Turso CLI Manual**
- Download dari: https://github.com/tursodatabase/turso-cli/releases
- Extract dan tambahkan ke PATH

**Opsi B: Gunakan Vercel Postgres (Lebih Mudah)**
- Di Vercel Dashboard → Storage → Create Database → Postgres
- Otomatis dapat DATABASE_URL

**Opsi C: Skip Database (Testing)**
- Bisa pakai SQLite file-based untuk testing
- Tapi akan reset setiap deploy

### 3. Deploy ke Vercel (3 menit)

1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik **"Add New Project"**
4. Import repository `roi-tracker`
5. **Environment Variables** (Settings → Environment Variables):
   ```
   DATABASE_URL = libsql://your-turso-url?authToken=your-token
   WHOP_API_KEY = 8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k
   NEXT_PUBLIC_WHOP_APP_ID = app_QsNqPoaQ3i1PBH
   NEXT_PUBLIC_WHOP_AGENT_USER_ID = user_jixSk8v0rzS3M
   NEXT_PUBLIC_WHOP_COMPANY_ID = biz_dMR0pdzvbfxmoG
   NODE_ENV = production
   ```
   **PENTING**: Set semua untuk **Production, Preview, Development**
6. Klik **Deploy**
7. Tunggu build selesai
8. Copy **Production URL** (misalnya: `https://roi-tracker.vercel.app`)

### 4. Setup di Whop Dashboard (2 menit)

✅ **App sudah dibuat!** 
- **App ID**: `app_QsNqPoaQ3i1PBH`
- **Installation Link**: https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/

**Yang perlu dilakukan:**
1. Login ke [Whop Dashboard](https://whop.com)
2. Navigate ke **Developer** → **Apps** → **app_QsNqPoaQ3i1PBH**
3. **Production URL**: Paste URL dari Vercel
   - Contoh: `https://roi-tracker.vercel.app`
4. **Webhook URL** (opsional): `https://roi-tracker.vercel.app/api/webhooks/whop`
5. Save

### 5. Test Aplikasi ✅

1. Buka aplikasi di Whop
2. Test semua halaman:
   - ✅ `/dashboard` - Dashboard dengan metrik
   - ✅ `/utm` - UTM Builder
   - ✅ `/campaigns` - Daftar campaigns
   - ✅ `/costs` - Tambah costs

## 🔑 Environment Variables Summary

**Untuk Vercel (Set di Dashboard → Settings → Environment Variables):**
```
DATABASE_URL=libsql://[turso-url]?authToken=[token]
WHOP_API_KEY=8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k
NEXT_PUBLIC_WHOP_APP_ID=app_QsNqPoaQ3i1PBH
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_jixSk8v0rzS3M
NEXT_PUBLIC_WHOP_COMPANY_ID=biz_dMR0pdzvbfxmoG
NODE_ENV=production
```

**⚠️ PENTING**: 
- Set semua variables untuk **Production, Preview, dan Development**
- Jangan commit credentials ke Git
- Lihat `WHOP_CREDENTIALS.md` untuk detail lengkap

## 📝 Quick Reference

### Jika Pakai Turso:
```bash
turso db create roi-tracker
turso db show roi-tracker  # Copy URL
turso db tokens create roi-tracker  # Copy token
# Format: libsql://[url]?authToken=[token]
```

### Jika Pakai Vercel Postgres:
1. Vercel Dashboard → Storage → Create Database → Postgres
2. Update schema.prisma: `provider = "postgresql"`
3. Run: `npx prisma migrate deploy`

## 🎉 Selesai!

Setelah semua langkah selesai, aplikasi Anda akan:
- ✅ Live di Whop
- ✅ Terhubung dengan database
- ✅ Siap digunakan oleh users

## 🆘 Troubleshooting

**Build Error?**
- Check environment variables sudah di-set
- Pastikan `DATABASE_URL` format benar

**Database Error?**
- Pastikan DATABASE_URL sudah di-set di Vercel
- Check format URL sesuai provider (libsql:// atau postgresql://)

**Webhook tidak bekerja?**
- Pastikan Production URL sudah di-set di Whop
- Check endpoint `/api/webhooks/whop` di Vercel logs

## 📚 Dokumentasi
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Panduan lengkap
- [QUICK_START_DEPLOY.md](./QUICK_START_DEPLOY.md) - Quick start
- [TURSO_SETUP.md](./TURSO_SETUP.md) - Setup Turso detail

