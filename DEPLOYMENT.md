# Panduan Deploy ke Whop

## Prasyarat
- Akun Whop Developer
- Akun Vercel (gratis)
- Repository GitHub/GitLab (opsional, tapi direkomendasikan)

## Langkah 1: Setup di Whop Dashboard

1. **Buat Aplikasi di Whop**
   - Login ke [Whop Dashboard](https://whop.com)
   - Navigate ke **Developer** → **Apps**
   - Klik **Create App**
   - Beri nama aplikasi (misalnya: "ROI Tracker")
   - Copy **Environment Variables** yang diberikan:
     - `WHOP_API_KEY`
     - `WHOP_API_SECRET`
     - `WHOP_WEBHOOK_SECRET` (jika ada)

2. **Setup Webhook (Opsional)**
   - Di halaman app settings, temukan bagian **Webhooks**
   - Set webhook URL (akan diisi setelah deploy): `https://your-domain.vercel.app/api/webhooks/whop`
   - Pilih events yang ingin di-track

## Langkah 2: Deploy ke Vercel

### Opsi A: Deploy via Vercel Dashboard (Recommended)

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import ke Vercel**
   - Login ke [Vercel](https://vercel.com)
   - Klik **Add New Project**
   - Import repository dari GitHub
   - Konfigurasi:
     - **Framework Preset**: Next.js
     - **Root Directory**: `roi-tracker` (jika repo ada di subfolder)
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`
     - **Install Command**: `npm install`

3. **Environment Variables**
   - Di Vercel project settings → **Environment Variables**, tambahkan:
     ```
     DATABASE_URL=file:./prisma/prod.db
     WHOP_API_KEY=<your-whop-api-key>
     WHOP_API_SECRET=<your-whop-api-secret>
     NODE_ENV=production
     ```
   - **PENTING**: Untuk production, pertimbangkan menggunakan database yang lebih robust (PostgreSQL/SQLite di cloud)

4. **Deploy**
   - Klik **Deploy**
   - Tunggu proses build selesai
   - Copy **Production URL** (misalnya: `https://roi-tracker.vercel.app`)

### Opsi B: Deploy via CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login dan Deploy**
   ```bash
   cd roi-tracker
   vercel login
   vercel
   ```

3. **Setup Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add WHOP_API_KEY
   vercel env add WHOP_API_SECRET
   ```

4. **Deploy Production**
   ```bash
   vercel --prod
   ```

## Langkah 3: Update Whop App Settings

1. **Set Production URL**
   - Kembali ke Whop Dashboard → Your App → Settings
   - Paste **Production URL** dari Vercel ke field **Production URL**
   - Contoh: `https://roi-tracker.vercel.app`

2. **Test Webhook** (jika menggunakan)
   - Whop akan mengirim test webhook ke endpoint Anda
   - Pastikan `/api/webhooks/whop` berfungsi dengan benar

## Langkah 4: Database untuk Production

⚠️ **PENTING**: SQLite file-based tidak cocok untuk serverless (Vercel). 

### Opsi 1: Turso (SQLite Cloud) - Recommended ⭐

Turso adalah SQLite cloud yang kompatibel dengan Prisma dan cocok untuk serverless.

1. **Install Turso CLI**
   ```bash
   # Windows (PowerShell)
   iwr https://get.tur.so/install.sh | iex
   
   # Mac/Linux
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

2. **Login dan Buat Database**
   ```bash
   turso auth login
   turso db create roi-tracker-db
   ```

3. **Dapatkan URL dan Token**
   ```bash
   # Get database URL
   turso db show roi-tracker-db
   
   # Create auth token
   turso db tokens create roi-tracker-db
   ```

4. **Update Prisma Schema**
   ```prisma
   datasource db {
     provider = "libsql"  // Ubah dari "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

5. **Install Dependencies**
   ```bash
   npm install @libsql/client
   ```

6. **Set DATABASE_URL di Vercel**
   - Format: `libsql://<your-db-url>?authToken=<your-token>`
   - Contoh: `libsql://roi-tracker-db-username.turso.io?authToken=your-token-here`

7. **Run Migration**
   ```bash
   npx prisma migrate deploy
   # atau
   npx prisma db push
   ```

### Opsi 2: PostgreSQL (via Vercel Postgres)
1. Di Vercel Dashboard → **Storage** → **Create Database**
2. Pilih **Postgres**
3. Update `schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run migration:
   ```bash
   npx prisma migrate deploy
   ```

### Opsi 3: Tetap SQLite (Hanya untuk Testing)
- File database akan disimpan di `/tmp` di Vercel
- Data akan hilang setiap kali function cold start
- **Tidak direkomendasikan untuk production**

## Langkah 5: Verifikasi Deploy

1. **Test Endpoints**
   - Dashboard: `https://your-domain.vercel.app/dashboard`
   - UTM Builder: `https://your-domain.vercel.app/utm`
   - Campaigns: `https://your-domain.vercel.app/campaigns`

2. **Test Webhook** (jika ada)
   - Gunakan tool seperti Postman atau curl:
   ```bash
   curl -X POST https://your-domain.vercel.app/api/webhooks/whop \
     -H "Content-Type: application/json" \
     -d '{"type":"purchase","campaign":"test","fullUrl":"https://example.com?utm_source=test"}'
   ```

## Troubleshooting

### Build Error
- Pastikan `prisma generate` berjalan di build command
- Check environment variables sudah di-set dengan benar

### Database Error
- Pastikan DATABASE_URL menggunakan format yang benar
- Untuk Turso: `libsql://...`
- Untuk Postgres: `postgresql://...`

### Webhook tidak bekerja
- Pastikan Production URL sudah di-set di Whop
- Check logs di Vercel Dashboard
- Verify webhook secret (jika digunakan)

## Production Checklist

- [ ] Environment variables di-set di Vercel
- [ ] Production URL di-set di Whop Dashboard
- [ ] Database production sudah setup
- [ ] Webhook endpoint sudah di-test
- [ ] Build berhasil tanpa error
- [ ] Semua halaman bisa diakses
- [ ] SSL certificate aktif (otomatis di Vercel)

## Support

- [Whop Documentation](https://docs.whop.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

