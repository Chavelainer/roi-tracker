# 🚀 Deploy ke Vercel - Langkah Cepat

## ✅ GitHub Sudah Siap!

Repository: **https://github.com/Chavelainer/roi-tracker**

## Langkah Deploy ke Vercel

### 1. Login Vercel (1 menit)

1. Buka: **https://vercel.com**
2. Klik **"Sign Up"** atau **"Login"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel untuk akses GitHub

### 2. Import Project (2 menit)

1. Di Vercel Dashboard, klik **"Add New Project"**
2. Pilih repository: **Chavelainer/roi-tracker**
3. Klik **"Import"**

### 3. Configure Project (2 menit)

**Framework Preset:** Next.js (auto-detected)
**Root Directory:** `roi-tracker` (jika ada, atau kosongkan jika repo di root)
**Build Command:** `npm run build` (auto)
**Output Directory:** `.next` (auto)

### 4. Set Environment Variables (3 menit)

Klik **"Environment Variables"** → Tambahkan satu per satu:

```
DATABASE_URL
Value: skip-dulu-akan-di-setup-setelah-deploy
Environments: ✅ Production ✅ Preview ✅ Development
```

```
WHOP_API_KEY
Value: 8m2UlAZWl49NzV0b-hJ79DkRW2ai-B4e7t1EPYcJI9k
Environments: ✅ Production ✅ Preview ✅ Development
```

```
NEXT_PUBLIC_WHOP_APP_ID
Value: app_QsNqPoaQ3i1PBH
Environments: ✅ Production ✅ Preview ✅ Development
```

```
NEXT_PUBLIC_WHOP_AGENT_USER_ID
Value: user_jixSk8v0rzS3M
Environments: ✅ Production ✅ Preview ✅ Development
```

```
NEXT_PUBLIC_WHOP_COMPANY_ID
Value: biz_dMR0pdzvbfxmoG
Environments: ✅ Production ✅ Preview ✅ Development
```

```
NODE_ENV
Value: production
Environments: ✅ Production ✅ Preview ✅ Development
```

**PENTING:** Set semua untuk **Production, Preview, dan Development**!

### 5. Deploy! (2 menit)

1. Klik **"Deploy"**
2. Tunggu build selesai (sekitar 2-3 menit)
3. **Copy Production URL** (misalnya: `https://roi-tracker.vercel.app`)

### 6. Setup Database (Setelah Deploy)

**Opsi Termudah: Vercel Postgres**

1. Di Vercel Dashboard → **Storage** → **Create Database** → **Postgres**
2. Copy **DATABASE_URL** yang diberikan
3. Update di Vercel → **Settings** → **Environment Variables** → Edit **DATABASE_URL**
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

### 7. Update Whop Dashboard (1 menit)

1. Login: **https://whop.com**
2. **Developer** → **Apps** → **app_QsNqPoaQ3i1PBH**
3. **Production URL**: Paste URL dari Vercel
4. **Webhook URL** (opsional): `https://your-app.vercel.app/api/webhooks/whop`
5. **Save**

## 📋 Checklist

- [ ] Vercel account dibuat
- [ ] Repository di-import
- [ ] Environment variables di-set
- [ ] Deploy pertama berhasil
- [ ] Production URL di-copy
- [ ] Database di-setup (Vercel Postgres)
- [ ] DATABASE_URL di-update
- [ ] Schema di-update ke postgresql
- [ ] Migration di-run
- [ ] Production URL di-set di Whop
- [ ] Aplikasi di-test

## 🎉 Selesai!

Aplikasi akan live di:
**https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/**

## 🔗 Links

- **GitHub Repo**: https://github.com/Chavelainer/roi-tracker
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Whop App**: https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/

