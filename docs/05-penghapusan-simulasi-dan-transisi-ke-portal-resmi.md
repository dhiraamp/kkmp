# Dokumentasi Penghapusan Fitur Simulasi & Transisi ke Portal Resmi

**Platform**: Koperasi Merah Putih Mekarjaya (KKMP) — Kota Depok  
**Port**: `5175` (`strictPort: true`)  
**Tanggal**: 30 September 2026  

---

## 1. Latar Belakang & Ringkasan Perubahan
Sesuai arahan pengguna (*"hilangkan simulasi 5 perannya dong"*), seluruh elemen teks, tombol, modal demo, dan indikator yang melabeli platform sebagai "simulasi" atau "demo" telah dihilangkan dan diubah menjadi representasi sistem produksi/operasional resmi Koperasi Merah Putih Kota Depok.

---

## 2. Rincian Modifikasi File

### A. `src/pages/LandingPage.jsx`
1. **Mind Mapping Architecture Header**:
   - Menghapus tombol interaktif `<button><span>Simulasi 5 Peran</span></button>`.
   - Menggantikannya dengan badge resmi yang rapi dan elegan: `Alur Rantai Pasok Terpadu` berikon `ShieldCheck` hijau.
2. **Keterangan Sistem Frontend**:
   - Mengubah judul: `3. Portal Multi-Peran (Admin & 5 Role)` &rarr; `3. Portal Layanan Terpadu (Admin & Pengurus)`.
   - Mengubah narasi: *"Simulasi frontend interaktif berjalan penuh secara lokal pada browser..."* &rarr; *"Arsitektur sistem digital koperasi terpadu melayani seluruh ekosistem komoditas Kota Depok secara mandiri dan optimal."*

### B. `src/components/Navbar.jsx`
1. **Announcement Bar (Top Bar)**:
   - Menghapus dropdown demo cepat (*"Mode: Publik / Tamu"*, *"Pilih Peran Demo (5 Role)"*, dan *"Simulasi rantai pasok Depok"*).
   - Menampilkan status jam layanan resmi: `Layanan: Senin - Sabtu (08.00 - 17.00 WIB)` dan tombol langsung `Portal Layanan` (`/portal`).
   - Jika pengguna aktif dalam peran (misal login via portal), menampilkan status peran aktif dengan tombol `Keluar`.
2. **Tombol Masuk Navbar Utama**:
   - Mengubah tombol trigger modal demo *"Masuk / Akses Role"* menjadi tautan resmi: `Masuk Portal` mengarah langsung ke `/portal`.
3. **Mobile Drawer Navigation**:
   - Menghapus blok 5 tombol demo (*"Akses 5 Peran Sistem"*).
   - Menggantikannya dengan tombol tunggal yang modern dan bersih: `Masuk Portal Layanan Koperasi`.
4. **Pembersihan Kode**:
   - Menghapus state dan referensi tak terpakai (`isRoleDropdownOpen`, `roleRef`, `ROLES_QUICK`).

### C. `src/pages/PortalLogin.jsx`
1. **Identitas & Judul Header**:
   - Mengubah *"Sistem Terintegrasi 5 Role"* &rarr; *"Sistem Terintegrasi Koperasi Kota Depok"*.
   - Mengubah *"Pusat Akses & Portal Peran"* &rarr; *"Portal Layanan Koperasi Merah Putih"*.
2. **Tab Navigasi**:
   - Mengubah *"Akses Cepat 1-Klik (Demo)"* &rarr; *"Pilih Peran Operasional"*.
3. **Card Panduan Resmi**:
   - Mengubah *"FITUR SIMULASI BEBAS / Ganti Peran Kapan Saja"* &rarr; *"PANDUAN OPERASIONAL RESMI / Aksesibilitas Multi-Layanan"*.
   - Menyesuaikan penjelasan agar berfokus pada otentikasi resmi pengurus, mitra cabang, supplier, dan logistik.
4. **Alamat Email Resmi**:
   - Memperbarui seluruh mock kredensial dari domain `@demo.local` menjadi domain resmi `@kkmp-depok.id` (misal: `anggota@kkmp-depok.id`, `admin@kkmp-depok.id`, `cabang@kkmp-depok.id`, `supplier@kkmp-depok.id`, `logistik@kkmp-depok.id`).

### D. `src/components/RoleSwitcherModal.jsx`
- Memperbarui teks header modal: *"Pusat Akses Layanan Koperasi"* dan panduan operasional resmi.
- Memperbarui footer: *"Otentikasi Terpadu Koperasi Merah Putih Mekarjaya"* dan tombol *"Kembali ke Beranda"*.

### E. Penghapusan Elemen Keranjang di Tampilan Awal (Landing Page)
1. **`src/components/Navbar.jsx`**:
   - Menyembunyikan tombol keranjang belanja (`ShoppingCart` & subtotal `Rp 0`) di bilah navigasi ketika pengguna berada pada **Tampilan Awal** (`location.pathname === '/'`). Tombol keranjang hanya aktif ketika anggota resmi membuka portal transaksi.
2. **`src/pages/LandingPage.jsx`**:
   - **Hero Action Button**: Mengubah tombol aksi dari *"Mulai Belanja &rarr;"* dengan ikon keranjang menjadi tombol elegan **`Lihat Katalog Komoditas &rarr;`** dengan ikon `Store`.
   - **Etalase Kartu Produk**: Mengganti tombol `+ Keranjang` pada setiap kartu komoditas dengan tombol resmi **`Pesan &rarr;`** yang mengarahkan konsumen langsung ke alur portal pemesanan anggota.
   - **Deskripsi Arsitektur PWA**: Mengganti redaksi *"keranjang geser"* menjadi *"pemesanan digital langsung"*.

---

## 3. Hasil Verifikasi
1. **Pencarian Kata Kunci "Simulasi"**:
   - Telah dijalankan pencarian menyeluruh pada direktori `src/`, dan menghasilkan **0 kecocokan** (`0 occurrences`).
2. **Penghapusan Keranjang di Tampilan Awal**:
   - Tampilan beranda (`/`) kini bersih tanpa ikon/tombol keranjang belanja publik yang membingungkan.
3. **Build Verification**:
   - Perintah `npm run build` sukses 100% tanpa error dalam waktu 8.02 detik.
4. **Ketersediaan Layanan**:
   - Berjalan pada port **5175** (`http://localhost:5175/`).
