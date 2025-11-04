# 🚀 Quick Start: Deploy ke Whop dalam 5 Menit

## Step 1: Push ke GitHub (2 menit)

```bash
cd roi-tracker
git init
git add .
git commit -m "Ready for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Deploy ke Vercel (2 menit)

1. Buka [vercel.com](https://vercel.com) dan login dengan GitHub
2. Klik **"Add New Project"**
3. Import repository yang baru saja di-push
4. **Important Settings:**
   - Framework: Next.js (auto-detected)
   - Root Directory: `roi-tracker` (jika repo di root, kosongkan)
   - Build Command: `npm run build` (auto)
   - Install Command: `npm install` (auto)

## Step 3: Setup Database - Turso (1 menit)

### Install Turso CLI
```powershell
# Windows PowerShell
irm https://get.tur.so/install.sh | iex
```

### Buat Database
```bash
turso auth login
turso db create roi-tracker
turso db show roi-tracker  # Copy URL
turso db tokens create roi-tracker  # Copy token
```

### Update Schema Prisma
Edit `prisma/schema.prisma`, ubah:
```prisma
datasource db {
  provider = "libsql"  // Ubah dari "sqlite"
  url      = env("DATABASE_URL")
}
```

### Install Dependencies
```bash
npm install @libsql/client
```

### Set Environment Variable di Vercel
1. Di Vercel project → **Settings** → **Environment Variables**
2. Tambahkan:
   - Name: `DATABASE_URL`
   - Value: `libsql://<url-dari-turso>?authToken=<token-dari-turso>`
   - Environment: Production, Preview, Development (pilih semua)

3. Redeploy project

## Step 4: Setup di Whop Dashboard (1 menit)

1. Login ke [Whop Dashboard](https://whop.com)
2. Navigate ke **Developer** → **Apps** → **Create App**
3. Beri nama: "ROI Tracker"
4. Copy Production URL dari Vercel (contoh: `https://roi-tracker.vercel.app`)
5. Paste ke **Production URL** di Whop
6. Save

## Step 5: Test! ✅

1. Buka aplikasi di Whop
2. Test semua halaman:
   - Dashboard
   - UTM Builder
   - Campaigns
   - Costs

## 🎉 Selesai!

Aplikasi Anda sekarang live di Whop!

### Troubleshooting Cepat

**Build Error?**
- Pastikan `DATABASE_URL` sudah di-set di Vercel
- Check logs di Vercel Dashboard → Deployments

**Database Error?**
- Pastikan format `DATABASE_URL` benar: `libsql://...`
- Pastikan schema.prisma sudah diubah ke `libsql`

**Webhook tidak bekerja?**
- Pastikan Production URL sudah di-set di Whop
- Check endpoint `/api/webhooks/whop` di Vercel logs

## 📚 Butuh Bantuan?

- [Whop Docs](https://docs.whop.com)
- [Vercel Docs](https://vercel.com/docs)
- [Turso Docs](https://docs.turso.tech)

