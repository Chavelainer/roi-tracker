# 📤 Push ke GitHub - Langkah Cepat

## Opsi 1: Repository Sudah Ada

Jika repository sudah dibuat di GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/roi-tracker.git
git branch -M main
git push -u origin main
```

## Opsi 2: Buat Repository Baru

### Langkah 1: Buat Repository di GitHub

1. Buka: https://github.com/new
2. Repository name: `roi-tracker` (atau nama lain)
3. **JANGAN** centang "Initialize with README"
4. Klik **Create repository**

### Langkah 2: Connect dan Push

```bash
# Ganti YOUR_USERNAME dengan username GitHub Anda
git remote add origin https://github.com/YOUR_USERNAME/roi-tracker.git
git branch -M main
git push -u origin main
```

## Setelah Push Berhasil

✅ Code sudah di GitHub!

**Langkah selanjutnya:**
1. Deploy ke Vercel (lihat NEXT_STEPS.md)
2. Setup Database
3. Update Whop Dashboard

## Troubleshooting

**Error: remote already exists?**
```bash
git remote remove origin
# Lalu jalankan lagi command di atas
```

**Error: authentication failed?**
- Pastikan sudah login di GitHub
- Atau gunakan Personal Access Token

**Error: repository not found?**
- Pastikan repository sudah dibuat di GitHub
- Pastikan username/repo-name benar
- Pastikan Anda punya akses ke repository

