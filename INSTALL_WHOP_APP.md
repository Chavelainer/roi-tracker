# 📱 Install App di Whop - Langkah Final

## ⚠️ PENTING: Update Production URL Dulu!

Sebelum install app, **WAJIB** update Production URL di Whop Dashboard terlebih dahulu!

## Langkah 1: Update Production URL di Whop Dashboard (1 menit)

### 1. Login ke Whop Dashboard
- Buka: **https://whop.com**
- Login dengan akun Anda

### 2. Navigate ke App Settings
1. Klik **Developer** (di sidebar kiri)
2. Klik **Apps**
3. Klik pada app: **app_QsNqPoaQ3i1PBH**

### 3. Set Production URL
1. Scroll ke bagian **Settings** atau **Configuration**
2. Cari field **Production URL** atau **App URL**
3. Paste URL berikut:
   ```
   https://roi-tracker-4p3ba2nrl-chavelainers-projects.vercel.app
   ```
4. **Save** atau **Update**

### 4. Set Webhook (Opsional)
Jika ingin menggunakan webhook untuk tracking events:
- **Webhook URL**: 
  ```
  https://roi-tracker-4p3ba2nrl-chavelainers-projects.vercel.app/api/webhooks/whop
  ```

## Langkah 2: Install App (Setelah Production URL di-set)

### Install ke Your Whop

1. Buka installation link:
   **https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/**

2. Klik **"Install"** atau **"Add to Whop"**

3. Pilih Whop/Company yang ingin di-install app ini

4. Klik **"Install"**

## ✅ Setelah Install

App akan muncul di Whop Anda dan bisa digunakan!

### Test Fitur
1. **Dashboard** - Lihat metrik ROI, Cost, CPA, ROAS
2. **UTM Builder** - Buat dan simpan UTM links
3. **Campaigns** - Lihat semua campaigns
4. **Costs** - Tambah biaya campaign

## 🔗 Links

- **Production URL**: https://roi-tracker-4p3ba2nrl-chavelainers-projects.vercel.app
- **Installation Link**: https://whop.com/apps/app_QsNqPoaQ3i1PBH/install/
- **Whop Dashboard**: https://whop.com
- **Vercel Dashboard**: https://vercel.com/chavelainers-projects/roi-tracker

## ⚠️ Troubleshooting

**App tidak muncul setelah install?**
- Pastikan Production URL sudah di-set di Whop Dashboard
- Check Vercel deployment status - pastikan masih active
- Refresh page di Whop

**Error saat akses app?**
- Pastikan DATABASE_URL sudah di-set di Vercel
- Check Vercel logs untuk error details
- Schema database akan otomatis diinisialisasi saat pertama kali diakses

## 🎉 Selesai!

Setelah Production URL di-set dan app di-install, aplikasi akan **fully functional**!

