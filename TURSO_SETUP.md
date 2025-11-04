# Setup Turso Database untuk Production

## Catatan Penting
Prisma menggunakan provider `sqlite` untuk Turso, tapi dengan URL format `libsql://`. 

## Langkah Setup

### 1. Install Turso CLI (Windows)

Download manual dari: https://github.com/tursodatabase/turso-cli/releases

Atau gunakan Scoop:
```powershell
scoop install turso
```

Atau download executable:
```powershell
# Download latest release
Invoke-WebRequest -Uri "https://github.com/tursodatabase/turso-cli/releases/latest/download/turso-windows-x64.exe" -OutFile "turso.exe"
# Move ke PATH atau gunakan langsung
```

### 2. Login dan Buat Database

```bash
turso auth login
turso db create roi-tracker
```

### 3. Dapatkan URL dan Token

```bash
# Get database URL
turso db show roi-tracker

# Create auth token
turso db tokens create roi-tracker
```

### 4. Update Schema Prisma

**TIDAK PERLU** ubah provider! Tetap pakai `sqlite`:

```prisma
datasource db {
  provider = "sqlite"  // Tetap pakai sqlite
  url      = env("DATABASE_URL")
}
```

### 5. Set DATABASE_URL

Format untuk Turso:
```
libsql://roi-tracker-username.turso.io?authToken=your-token-here
```

**Di Vercel Environment Variables:**
- Name: `DATABASE_URL`
- Value: `libsql://...?authToken=...`
- Environment: Production, Preview, Development

### 6. Install Dependencies

```bash
npm install @libsql/client
```

### 7. Push Schema ke Database

```bash
npx prisma db push
```

## Alternatif: Vercel Postgres

Jika Turso terlalu kompleks, gunakan Vercel Postgres:

1. Di Vercel Dashboard → Storage → Create Database → Postgres
2. Update schema:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Install: `npm install @prisma/adapter-postgresql`
4. Run: `npx prisma migrate deploy`

