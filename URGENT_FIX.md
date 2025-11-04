# 🚨 URGENT FIX - Server Error

## Error
```
Application error: a server-side exception has occurred
```

## Penyebab
Database belum di-initialize atau DATABASE_URL format salah.

## ✅ Solusi Cepat (Pilih Salah Satu)

### Opsi A: Vercel Postgres (RECOMMENDED - Paling Mudah) ⭐

**1. Buat Database:**
- Buka: https://vercel.com/chavelainers-projects/roi-tracker/storage
- Klik: **Create Database** → **Postgres**
- Pilih: Free tier
- **Copy DATABASE_URL** yang muncul

**2. Update Schema:**
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Ubah dari "sqlite"
  url      = env("DATABASE_URL")
}
```

**3. Commit dan Push:**
```bash
git add prisma/schema.prisma
git commit -m "Switch to postgresql"
git push
```

**4. Set DATABASE_URL di Vercel:**
- Settings → Environment Variables
- Update `DATABASE_URL` dengan URL dari Postgres
- Set untuk **Production, Preview, Development**
- Save

**5. Run Migration:**
```bash
# Set DATABASE_URL di local
$env:DATABASE_URL="postgresql://[url-dari-vercel]"

# Deploy schema
npx prisma migrate deploy
```

**6. Redeploy:**
Vercel akan auto-redeploy setelah push. Atau manual:
```bash
npx vercel --prod
```

---

### Opsi B: Turso (Jika Sudah Punya Credentials)

**1. Format DATABASE_URL:**
Jika punya TURSO_DATABASE_URL dan TURSO_AUTH_TOKEN:
```
libsql://[TURSO_DATABASE_URL]?authToken=[TURSO_AUTH_TOKEN]
```

**2. Update di Vercel:**
```bash
npx vercel env rm DATABASE_URL production
npx vercel env add DATABASE_URL production
# Paste: libsql://[url]?authToken=[token]
```

**3. Push Schema:**
```bash
$env:DATABASE_URL="libsql://[url]?authToken=[token]"
npx prisma db push
```

**4. Redeploy:**
```bash
npx vercel --prod
```

---

## 🔍 Verifikasi

Setelah fix, test:
1. Buka: https://roi-tracker-kappa.vercel.app/dashboard
2. Harusnya tidak error lagi
3. Jika masih error, cek logs:
   ```bash
   npx vercel logs https://roi-tracker-kappa.vercel.app
   ```

## 📝 Status

✅ Code sudah di-deploy
✅ Environment variables sudah di-set
❌ **Database belum di-initialize** ← INI MASALAH UTAMANYA

## ⚡ Quick Action

**RECOMMENDED: Gunakan Vercel Postgres (5 menit setup)**

1. Buat database di Vercel Dashboard
2. Update schema ke postgresql
3. Set DATABASE_URL
4. Deploy schema
5. Done!

