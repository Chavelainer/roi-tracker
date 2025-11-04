# 🔧 Fix Server Error - Database Configuration

## Masalah
Error: "Application error: a server-side exception has occurred"

## Penyebab
DATABASE_URL kemungkinan belum di-set dengan benar atau database belum di-initialize.

## Solusi Cepat

### Opsi 1: Gunakan Turso (Jika sudah setup)

**1. Pastikan DATABASE_URL menggunakan format Turso:**

Format yang benar:
```
libsql://[database-name]-[username].turso.io?authToken=[token]
```

**2. Update DATABASE_URL di Vercel:**

Jika Anda punya TURSO_DATABASE_URL dan TURSO_AUTH_TOKEN, gabungkan jadi:
```
libsql://[TURSO_DATABASE_URL]?authToken=[TURSO_AUTH_TOKEN]
```

**3. Push Schema ke Database:**

```bash
# Set DATABASE_URL di local
$env:DATABASE_URL="libsql://[url]?authToken=[token]"

# Push schema
npx prisma db push
```

### Opsi 2: Setup Turso Database Baru (Jika belum ada)

**1. Install Turso CLI:**
```powershell
# Download manual dari: https://github.com/tursodatabase/turso-cli/releases
# Atau gunakan Scoop:
scoop install turso
```

**2. Login dan Buat Database:**
```bash
turso auth login
turso db create roi-tracker
turso db show roi-tracker  # Copy URL
turso db tokens create roi-tracker  # Copy token
```

**3. Set DATABASE_URL di Vercel:**
```
Format: libsql://[url]?authToken=[token]
```

**4. Push Schema:**
```bash
npx prisma db push
```

### Opsi 3: Gunakan Vercel Postgres (Lebih Mudah)

**1. Buat Database di Vercel:**
- Buka: https://vercel.com/chavelainers-projects/roi-tracker
- Tab **Storage** → **Create Database** → **Postgres**
- Copy DATABASE_URL

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
git commit -m "Switch to postgresql for production"
git push
```

**4. Set DATABASE_URL di Vercel:**
- Settings → Environment Variables
- Update DATABASE_URL dengan URL dari Postgres
- Set untuk Production, Preview, Development

**5. Run Migration:**
```bash
# Di local dengan DATABASE_URL dari Vercel
$env:DATABASE_URL="postgresql://..."
npx prisma migrate deploy
```

## Verifikasi

Setelah fix, test aplikasi:
1. Buka: https://roi-tracker-kappa.vercel.app/dashboard
2. Harusnya tidak ada error lagi
3. Cek Vercel logs jika masih error:
   ```bash
   npx vercel logs https://roi-tracker-kappa.vercel.app
   ```

## Status Saat Ini

✅ Environment variables sudah di-set di Vercel
✅ Code sudah di-deploy
❌ Database mungkin belum di-initialize atau DATABASE_URL salah format

## Next Steps

1. Pilih salah satu opsi di atas (recommend: Vercel Postgres untuk kemudahan)
2. Pastikan DATABASE_URL format benar
3. Push schema/migrate database
4. Redeploy atau tunggu auto-redeploy

