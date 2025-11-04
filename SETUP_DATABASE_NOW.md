# 🗄️ Setup Database - Langkah Cepat

## ✅ Production URL Sudah Siap!

**Production**: https://roi-tracker-3ucxyldl4-chavelainers-projects.vercel.app

## Setup Database via Vercel Dashboard (5 menit)

### Langkah 1: Buat Database

1. Buka: **https://vercel.com/chavelainers-projects/roi-tracker**
2. Klik tab **Storage** (di sidebar kiri)
3. Klik **Create Database**
4. Pilih **Postgres**
5. Pilih plan (Free tier cukup untuk testing)
6. Klik **Create**
7. **Copy DATABASE_URL** yang muncul

### Langkah 2: Set Environment Variable

1. Di Vercel Dashboard → Tab **Settings**
2. Klik **Environment Variables**
3. Klik **Add New**
4. Name: `DATABASE_URL`
5. Value: (paste dari step 7 di atas)
6. Environments: ✅ Production ✅ Preview ✅ Development
7. Klik **Save**

### Langkah 3: Update Schema

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Ubah dari "sqlite"
  url      = env("DATABASE_URL")
}
```

### Langkah 4: Push ke GitHub

```bash
git add prisma/schema.prisma
git commit -m "Update schema to postgresql for production"
git push
```

Vercel akan **auto-redeploy** setelah push.

### Langkah 5: Run Migration

1. Di Vercel Dashboard → **Deployments** → Latest deployment
2. Klik deployment → Tab **Functions**
3. Atau via Vercel CLI:
   ```bash
   npx vercel env pull .env.production
   npx prisma migrate deploy
   ```

**Atau lebih mudah:**
- Di Vercel Dashboard → **Storage** → Your Database → **Console**
- Copy DATABASE_URL
- Run migration di local dengan DATABASE_URL tersebut:
  ```bash
  DATABASE_URL="postgresql://..." npx prisma migrate deploy
  ```

## Update Whop Dashboard

1. Login: **https://whop.com**
2. **Developer** → **Apps** → **app_QsNqPoaQ3i1PBH**
3. **Production URL**: 
   ```
   https://roi-tracker-3ucxyldl4-chavelainers-projects.vercel.app
   ```
4. **Save**

## ✅ Test!

Buka: **https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/**

Aplikasi sekarang fully functional! 🎉

